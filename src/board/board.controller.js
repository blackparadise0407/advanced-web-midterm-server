const pusher = require("../services/pusher");
const utils = require("../utils");
const Board = require("./board.model");

const listAll = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 0;
  const skip = parseInt(req.query.skip) || 0;
  const page = parseInt(req.query.page) || 1;

  try {
    const boards = await Board.find()
      .skip((page - 1) * limit + skip)
      .limit(limit)
      .exec();
    return res.status(200).json({
      message: "List boards success",
      data: boards,
      total: await Board.countDocuments(),
    });
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  const id = req.params.id;
  try {
    const board = await Board.findById(id);
    if (!board) throw res.status(404).json({ message: "Board not found" });
    return res.status(200).json({ message: "Get board success", data: board });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { body, user } = req;
  const { name } = body;
  try {
    const newBoard = new Board({
      name,
      createdBy: user._id,
    });
    const board = await newBoard.save();
    return res
      .status(200)
      .json({ message: "Create board success", data: board });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const board = await Board.findById(id);
    if (!board) throw res.status(404).json({ message: "Board not found" });
    board.set(utils.filterParams(body, ["_id", "createdBy"]));
    await board.save();
    pusher.trigger(`${board._id}`, 'update', {
      message: "Pusher triggered",
      data: board
    })
    return res
      .status(200)
      .json({ message: "Update board success", data: board });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    await Board.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete board success" });
  } catch (error) {
    next(error);
  }
};

const addActions = async (req, res, next) => {
  const { body, params, user } = req;
  const { id } = params;
  const { field, name } = body;
  try {
    const newAction = {
      name,
      createdBy: user._id,
    };
    const actions = [newAction];
    console.log(actions);
    const board = await Board.findByIdAndUpdate(
      { _id: id },
      {
        $push: { [field]: newAction },
      },
      { upsert: true, new: true }
    );
    if (!board) {
      throw res.status(404).json({ message: "Board not found" });
    }
    pusher.trigger(`${board._id}`, 'update', {
      message: "Pusher triggered",
      data: board
    })
    return res
      .status(200)
      .json({ message: "Add action success", data: board });
  } catch (error) {
    next(error);
  }
};

const getByCurrentUser = async (req, res, next) => {
  const { user } = req;
  try {
    const boards = await Board.find({ createdBy: user._id });
    return res.status(200).json({ message: "Get board success", data: boards });
  } catch (error) {
    next(error);
  }
};

const removeActions = async (req, res, next) => {
  const {
    user,
    params: { id },
    body,
  } = req;
  const { field, actionId } = body;
  try {
    const board = await Board.findByIdAndUpdate(
      id,
      { $pull: { [field]: { _id: actionId } } },
      { new: true }
    );
    if (!board) throw res.status(404).json({ message: "Board not found" });
    pusher.trigger(`${board._id}`, 'update', {
      message: "Pusher triggered",
      data: board
    })
    return res.status(200).json({
      message: "Delete action success",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

const editAction = async (req, res, next) => {
  const {
    user,
    params: { id },
    body: { _id, name, field },
  } = req;
  try {
    const board = await Board.findById(id);
    if (!board)
      throw res.status(404).json({ message: "Board does not exists" });
    switch (field) {
      case "wentWell":
        await Board.updateOne(
          { _id: id, "wentWell._id": _id },
          { $set: { "wentWell.$.name": name } }
        );
        break;
      case "toImprove":
        await Board.updateOne(
          { _id: id, "toImprove._id": _id },
          { $set: { "toImprove.$.name": name } }
        );
        break;
      case "actionsItem":
        await Board.updateOne(
          { _id: id, "actionsItem._id": _id },
          { $set: { "actionsItem.$.name": name } }
        );
        break;
      default:
        break;
    }
    const updateBoard = await Board.findById(id)
    pusher.trigger(`${updateBoard._id}`, 'update', {
      message: "Pusher triggered",
      data: updateBoard
    })
    return res
      .status(200)
      .json({
        message: "Update action success",
        data: updateBoard,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAll,
  getByID,
  add,
  update,
  remove,
  addActions,
  getByCurrentUser,
  removeActions,
  editAction,
};
