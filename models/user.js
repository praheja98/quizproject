var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
    uid:String,
    password:String,
    username:String,
    type:String,
    answer:[
        {
            qid:Number,
            description:String,
            date:Date

        }
    ]

});
var User=mongoose.model('User',userSchema);
module.exports=User;

