const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
	date:{
		type:Date,
		required:true,
	},
	subject:{
		type:String,
		required:true,
	},
	attendance: [
      {
      studentId: {
        type: String,
        required: true,
        ref: 'Student'
      },
        present: {
          type: Boolean,
          required: true,
        },
      },
    ],
     takenBy: {
      type: String,
      required: true,
    },
}, { timestamps: true, })

const Attendance = new mongoose.model("Attendance",attendanceSchema)

module.exports = Attendance;