const express = require('express');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, async (req, res) => {
  const { date, subject, attendance, takenBy } = req.body;

  try {
    const newAttendance = new Attendance({ date, subject, attendance, takenBy });
    const saved = await newAttendance.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to save attendance", error: err.message });
  }
});


router.get('/all-attendance', protect, async (req, res) => {

  try {
   
    const allAttendance = await  Attendance.find();

    res.status(201).json(allAttendance);
  } catch (err) {
    res.status(400).json({ message: "Failed to save attendance", error: err.message });
  }
});

module.exports = router;
