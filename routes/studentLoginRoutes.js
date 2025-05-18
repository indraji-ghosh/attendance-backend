const express = require('express');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/login', async(req, res)=>{
	const {studentId} = req.body;
	try{
		const student = await Student.findOne({studentId});
		if (!student) return res.status(400).json({message:'No student found'})
		const token = jwt.sign({studentId},  process.env.JWT_SECRET,  { expiresIn: "30d" });
		res.json({token, name:student.name, studentId:student.studentId});
	}
	catch(err){
		console.error(err)
		res.status(500).json({message:"server error"})
	}
})

module.exports = router;