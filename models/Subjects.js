const mongoose = require("mongoose")


const subjectSchema = new mongoose.Schema({
	subjectId:{
		type:String,
		unique:true,
		required:true
	},
	subjectName:{
		type:String,
		required:true
	}
})

const Subject = new mongoose.model('Subject', subjectSchema)


module.exports = Subject;