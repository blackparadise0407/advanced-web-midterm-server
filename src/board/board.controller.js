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
    board.set(
      utils.filterParams(body, [
        "_id",
        "createdBy",
        "toImprove",
        "wentWell",
        "actionsItem",
      ])
    );
    await board.save();
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
      { upsert: true }
    );
    if (!board) {
      throw res.status(404).json({ message: "Board not found" });
    }
    return res
      .status(200)
      .json({ message: "Add action success", data: await Board.findById(id) });
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
    const board = await Board.updateOne(
      { _id: id },
      { $pull: { [field]: { _id: actionId } } }
    );
    if (!board) throw res.status(404).json({ message: "Board not found" });
    return res.status(200).json({
      message: "Delete action success",
      data: await Board.findById(id),
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
};
