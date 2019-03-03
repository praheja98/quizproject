const mongoose = require("mongoose");

const quizQuestionSchema = mongoose.Schema({
  moduleId: {
    type: String,
    require: true
  },
  question: {
    type: String,
    require: true
  },
  options: {
    type: Array,
    require: true
  }
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
module.exports = QuizQuestion;
