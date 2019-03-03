const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  qId: {
    type: Number,
    require: true
  },
  outOf: {
    type: Number,
    require: true
  },
  moduleName: {
    type: String,
    require: true
  },
  moduleCode: {
    type: String,
    require: true
  },
  question: {
    type: String,
    require: true
  },
  correctId: {
    type: Number,
    require: true
  },
  options: {
    type: Array,
    require: true
  }
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
