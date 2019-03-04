iiiiiiionst express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  mongoose = require("mongoose");
  var User=require("./models/user");
const seedDB = require("./models/seed"),
  Question = require("./models/question"),
  question=require("./models/questionuser"),
  credentials = require("./credentials"),
  db = require("./config/keys").mongoURI;
// Routes
const mainRoutes = require("./routes");
const studentRoutes = require("./routes/students");
const adminRoutes = require("./routes/admin");
const edit = require("./routes/edit");
const app = express();
var cookieSession=require('cookie-session');
seedDB.seed(Question);

//app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
  cookieSession({
      secret:'keyboard cat',
      name:'session',
      resave:false,
      saveUninitialized:false,
      keys:['key1','key2'],
      cookie:{secure:true}

  }))
app.use(cookieParser(credentials.cookieSecret));
app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => console.log(err));
  var length;
  question.find({},function(err,que){
      length = que.length;
  })
  app.get('/testing2',function(req,res) {
    var user = new User({
      uid:"testing",
      password:"raheja",
      username:"praheja98",
      type:"Student",
      answer:[
          {
              qid:1,
              description:"test",
              data:Date.now()
          }
      ]
  }).save();
     
    res.send("Completed");
  })




  app.get('/checkinguser',function(req,res) {
    q2= new question({
      qid:1,
      moduleCode:1,
      description:"this is the answer",
      correctid:3,
      choice:[
          {
              cid:1,
              description:"this is some sample answer"
          },
          {
              cid:2,
              description:"this is another information"
          },
          {
              cid:3,
              description:"this is random"
          }
      ]
  }).save();
  res.send("Completed");

  })

app.get('/createquestion',function(req,res){

questionIns = new question({
    qid:req.body.qid,
    moduleCode:req.body.moduleCode,
    description:req.body.description,
    correctid:req.body.correctid,
    choices:req.body.choices


}).save();
res.json(questionIns);


})





app.get('/testingsess',function(req,res) {
  req.session = null;
  res.send("Completed");


})

app.get('/checkjs',function(req,res) {
  res.json({"check":true});
})

  app.post('/nextques',function(req,res) {
    var update = false;
    console.log("parul check here");
    console.log(req.body);
    console.log(req.session);
    console.log("parul check here 1 ");
    function mix(source, target) {
        for(var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }

    }
    if(req.session.data == undefined)
    {
        req.session.data = 1;
        console.log("checking")
        var da = req.session.data;
        var check = {};
       check[da] = req.body.answer;
       var date = Date.now();
       console.log("debugger 1");
       console.log(req.session.username);
       console.log("debugger 2");
       if(req.session.username) {
           console.log("are you reaching this stage");
           user.findOneAndUpdate({username:req.session.username},
               {$push:{answer:{qid:da,description:req.body.answer,
                       date:date}}},function(err,upd){
               console.log("update was succesfull");
               }
               )

       }
        mix(check,req.session.testing2);
        console.log("check here");
        req.session.data = req.session.data + 1;
        question.find({qid:req.session.data},function(err,ques) {
          console.log("checking this stage");
          console.log(ques);
           res.json(ques);

        })
    }
    else {
        /*
    }
        user.find({'answer':{$elemMatch:{qid:req.body.question}},'username':req.session.username},function(err,re){

        }).then(function(re) {
        */
            console.log("debug1");
            console.log(req.session.testing2);
            console.log("debug 2");
            if(req.session.testing2 == undefined || req.session.testing2["a"] == undefined) {
               // req.session.data = req.session.data + 1;
                var da = req.body.question;
                console.log("debugger 1");
                console.log(req.body.question);
                console.log(req.body.answer);
                console.log("debugger 2");
                var check = {};
                check[da] = req.body.answer;
                var date = Date.now();
                console.log("important check");
                console.log(req.session.data);
                console.log("important check 1");
                if (req.session.username) {
                    console.log("are you reaching this stage");
                    mix(check, req.session.testing2);
                    user.findOneAndUpdate({username: req.session.username},
                        {
                            $push: {
                                answer: {
                                    qid: da, description: req.body.answer,
                                    date: date
                                }
                            }
                        }, function (err, upd) {
                            console.log("update was succesfull");
                        }
                    )

                }

                else {

                    mix(check, req.session.testing2);
                    console.log("Done");

                }

            }
            else {
                console.log("checking here yeet");
                update=true;
                var da = req.body.question;
                console.log("important check please");
                console.log(da);
                console.log("important check ends");
                var check = {};
                check[da] = req.body.answer;
                var date = Date.now();
                if (req.session.username) {
                    console.log("are you reaching this stage");

                    /**
                     * Fix this for all users
                     */

                    user.update({'answer.qid':req.body.question,'username':req.session.username},{
                        $set:{
                            "answer.$.description":req.body.answer
                        }
                    },function(err,re) {
                        console.log("update completed 2");
                    })


                }
                mix(check, req.session.testing2);
                console.log("if reaching here");


            }

        if(da == length)
        {
            res.redirect(303,'/quiz2check');

        }
        else {
                if(!update) {
                    req.session.data = req.session.data + 1;
                    console.log("checking here ");
                }
            question.find({qid: req.session.data}, function (err, ques) {
               // res.render('custom', {question: ques});
               res.json(ques);
            })
        }
        /*
    })
    */
    }



})


app.get('/quiz2check' , function(req,res) {
  var correct_answers = 0;
  var answer_description=[];
  var len = req.session.data;
  for(var i=1;i<len+1;i++){
      var j = i.toString();
      answer_description.push(req.session.testing2[j]);
  }
  question.find({},function(err,ques) {
      var counter_index = 0;
      var result = ques;
      console.log("length is " + ques.length);

      result.forEach(function(re,i) {
          console.log("checking i " + i);
          var correctid = re.correctid;
          re.choice.forEach(function(d) {
              if (d.cid === correctid) {
                  console.log(d);
                  description = d.description
                  testCompleted(description);
              }
          })
          if(i == ques.length-1) {
            console.log("Reaching here success");
              anotherFunction();
          }
      })
      function testCompleted(desc) {
          if(answer_description[counter_index] === desc)
              correct_answers++;
          req.session.correctanswers = correct_answers;
          counter_index++;
          console.log(correct_answers);

      }
  })
  function anotherFunction() {
    console.log("the correct answers are " + correct_answers);
      res.json(
        {
          "completed":true,
          "correctAnswers":correct_answers

        }
      )
  }

})




  app.post('/testchecking',function(req,res) {
    console.log(req.body);
    var d = [{
        qid:3,
        modulecode:"first",
        description:"this is sample description",
        correctid:3,
        choice:[
            {
                cid:1,
                description:"correct answer"
            },
            {
                cid:2,
                description:"right answer"
            },
            {
                cid:3,
                description:"wrong answer"
            }
        ]

    }]
    res.json(d);
  })

  app.get('/clear/sess' ,function(req,res) {
    req.session = null;
    res.send("completed");
  })

  app.get('/sessioninfo',function(req,res) {
    res.send(req.session);
  })


  app.get('/quiz3' , function(req,res) {
    if(req.session.testing2 == undefined) {
        req.session.testing2 = {};
    }
    if(req.session.data == undefined)
        question.find({qid:1},function(err,que) {
            res.json(que);
        })
    else {

        console.log("checking session 1");
        console.log("check data " + req.session.data);
        if(req.session.data < length)
        question.find({qid: req.session.data}, function (err, que) {
            res.json(que);
        })
        else
            res.redirect(303,'/quiz2check');

    }

})


  function checkLogin(req,res,uname,password) {
    
        user.findOne({username: uname}, function (err, userdata) {
    
            if (!userdata) {
                res.json('');
            }
    
            else if (userdata.password == md5(password)) {
                req.session.username = userdata.username;
                res.redirect(303,'/quiz3');
    
            }
            else {
    
                res.render('401');
    
            }
    
        })
    
    }
  
  app.post('/processRegister',function(req,res) {
    if (req.body.pword.trim() == req.body.pword2.trim()) {
      
              var newUser = user({
                  username: req.body.uname,
                  password: md5(req.body.pword),
                  type:"student"
      
              })
      
              newUser.save();
              res.redirect(303,'/Login11');
      
          }
      
          else {
              res.render('401');
          }
      
      
    

  })
  app.get('/checking' , function(req,res) {
    var d = [{
      "fname":"Parul",
      "lname":"Raheja"
    }]
    res.json(d);
  })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.use(mainRoutes); //using index.js as an entry point for all types of users (guest, student and admin)
app.use("/student", studentRoutes); //using student.js to handle all pages that a student can access
app.use("/admin", adminRoutes); //Same idea as student.js
app.use("/admin/edit", edit);

app.use(function(req, res) {
  res.status(404);
  res.end("404");
});


app.use(function(err, req, res, next) {
  res.status(500);
  console.error(err);
  res.send(err);
});

app.listen(app.get("port"), () => {
  console.log(`App listening on port: ${app.get("port")}`);
});
