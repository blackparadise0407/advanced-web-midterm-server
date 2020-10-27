const { Schema, Model } = require('mongoose');
const AutoPopulate = require('mongoose-autopopulate');

const actionSchema = new Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    autopopulate: {
      select: ' '
    }
  }
})

actionSchema.plugin(AutoPopulate);

const boardSchema = new Schema({
  name: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: {
      select: ' '
    }
  },
  wentWell: [actionSchema],
  toImprove: [actionSchema],
  actionsItem: [actionSchema]
}, {
  timestamps: true,
  versionKey: false
})

boardSchema.plugin(AutoPopulate);

module.exports = Model('User', boardSchema)