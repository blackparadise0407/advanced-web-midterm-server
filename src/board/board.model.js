const { Schema, model } = require("mongoose");
const AutoPopulate = require("mongoose-autopopulate");

actionSchema = new Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: {
      select: "id username email",
    },
  },
});

actionSchema.plugin(AutoPopulate);

const boardSchema = new Schema(
  {
    name: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
      autopopulate: {
        select: "id username email",
      },
    },
    wentWell: [actionSchema],
    toImprove: [actionSchema],
    actionsItem: [actionSchema],
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: {
          select: "id username email",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

boardSchema.plugin(AutoPopulate);

const Board = model("Board", boardSchema);

module.exports = Board;
