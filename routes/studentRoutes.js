const express = require("express");
const Student = require("../models/Student")
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();



// get all the student data
router.get('/all',protect, async(req, res)=>{
	try{
		const students = await Student.find();
		res.json(students);
	}
	catch(error){
		 console.error("token verification failed",error)
		 res.status(500).json({ message: "Server error" });
	}
})


// create new student

router.post('/add',protect, async(req, res)=>{
	const {name, studentId, roll, phone} = req.body
	try{
		let student = await Student.findOne({studentId});
		if (student) res.status(400).json({message:"student ID already exist"});
		student = new Student({name, studentId, roll, phone});
		await student.save();
		res.status(200).json({
            message:"student created",
            name:student.name,
            studentId:student.studentId,
            roll:student.roll,
            phone:student.phone,

        });

	}
	catch(error){
		 console.error(error)
		 res.status(500).json({ message: "Server error" });
	}
})

module.exports =  router;