const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/login', async(req, res) => {
  try{
      const {username, password} = req.body;

      const teacher = await Teacher.findOne({username});
      if (!teacher) return res.status(400).json({message:"username doesn't exist"})
      if(teacher.password !== password) return res.status(400).json({message:"Invalid credentials"})

      const token = jwt.sign(
         { teacherId: teacher._id, username: teacher.username },
        process.env.JWT_SECRET,
         { expiresIn: "1d" }
        )
      res.json({token, teacher:{username:teacher.username}})
  }
  catch(err){
      res.status(500).json({ message: "Server error" });
  }
  })
module.exports = router;
