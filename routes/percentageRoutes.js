const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

// Route 1: Overall attendance percentage
router.get('/', async (req, res) => {
  const { studentId } = req.query;

  try {
    const result = await Attendance.aggregate([
      { $unwind: "$attendance" },
      { $match: { "attendance.studentId": studentId } },
      {
        $group: {
          _id: null,
          totalClasses: { $sum: 1 },
          totalPresent: {
            $sum: {
              $cond: ["$attendance.present", 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          percentage: {
            $multiply: [{ $divide: ["$totalPresent", "$totalClasses"] }, 100]
          },
          totalClasses: 1,
          totalPresent: 1
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No attendance data found for this student" });
    }

    res.json(result[0]); // return the first object instead of array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route 2: Subject-wise attendance summary
router.get('/subject-wise', async (req, res) => {
  const { studentId } = req.query;

  try {
    const summary = await Attendance.aggregate([
      { $unwind: '$attendance' },
      { $match: { 'attendance.studentId': studentId } },
      {
        $group: {
          _id: '$subject',
          totalClass: { $addToSet: '$date' }, // unique classes per subject
          attended: {
            $sum: {
              $cond: ['$attendance.present', 1, 0]
            }
          }
        }
      },
      {
        $project: {
          subject: '$_id',
          _id: 0,
          totalClass: { $size: '$totalClass' },
          attended: 1
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Error fetching subject-wise attendance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
