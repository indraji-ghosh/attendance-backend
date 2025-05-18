const mongoose = require("mongoose");


//teacher schema
const teacherSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  },

},{timestamps:true})


//teaher model is created

const Teacher = mongoose.model('Teacher', teacherSchema)




// teacher model is exported
module.exports = Teacher;