const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  roll: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
}, { 
  timestamps: true, 
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
