var seed = function(Question) {
  Question.find(function(err, questions) {
    if (questions.length) return;

    var question = new Question({
      qId: 1,
      outOf: 1,
      moduleName: "Understanding and Avoiding ACADEMIC MISCONDUCT",
      moduleCode: "introduction",
      question:
        "Suppose you are a mathematics professor who wants to determine whether or not your teaching of a unit on probability has had a significant effect on your students. You decide to analyze their scores from a test they took before the instruction and their scores from another exam taken after the instruction. Which of the following t-tests is appropriate to use in this situation?",
      correctId: 1,
      options: [
        { cId: 1, description: "This is correct." },
        { cId: 2, description: "Heterogenous samples." },
        { cId: 3, description: "Dependent samples." },
        { cId: 4, description: "Independent samples." }
      ]
    }).save();
  });
};
//
module.exports.seed = seed;

// const md5 = require('md5');

// var seed = function(User) {
//   User.find(function(err, users) {
//     if (users.length) return;

//     var admin = new User({
//       userName: "admin",
//       password: "admin",
//       role: "admin",
//       read: true,
//       write: true
//     }).save();
//   });
// };

// module.exports.seed = seed;
