const mongoose = require('mongoose');
const Attendance = require('./models/Attendance');

const students = [
  { name: 'Student 1', studentId: 'S1001', roll: 1, phone: '9000000001' },
  { name: 'Student 2', studentId: 'S1002', roll: 2, phone: '9000000002' },
  { name: 'Student 3', studentId: 'S1003', roll: 3, phone: '9000000003' },
  { name: 'Student 4', studentId: 'S1004', roll: 4, phone: '9000000004' },
  { name: 'Student 5', studentId: 'S1005', roll: 5, phone: '9000000005' },
  { name: 'Student 6', studentId: 'S1006', roll: 6, phone: '9000000006' },
  { name: 'Student 7', studentId: 'S1007', roll: 7, phone: '9000000007' },
  { name: 'Student 8', studentId: 'S1008', roll: 8, phone: '9000000008' },
  { name: 'Student 9', studentId: 'S1009', roll: 9, phone: '9000000009' },
  { name: 'Student 10', studentId: 'S1010', roll: 10, phone: '9000000010' },
  { name: 'Student 11', studentId: 'S1011', roll: 11, phone: '9000000011' },
  { name: 'Student 12', studentId: 'S1012', roll: 12, phone: '9000000012' },
  { name: 'Student 13', studentId: 'S1013', roll: 13, phone: '9000000013' },
  { name: 'Student 14', studentId: 'S1014', roll: 14, phone: '9000000014' },
  { name: 'Student 15', studentId: 'S1015', roll: 15, phone: '9000000015' },
];

async function seedAttendance() {
  try {
    await mongoose.connect('mongodb+srv://indraxdev:Indrajit%402005@cluster0.curnrqu.mongodb.net/attendance?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');

    const subjects = ['Python', 'JavaScript', 'Operating System'];

    const attendanceData = [];

    for (let i = 0; i < 10; i++) {
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
      
      const attendanceRecord = {
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // last 10 days
        subject: randomSubject,
        attendance: students.map(student => ({
          studentId: student.studentId,
          present: Math.random() < 0.8, // 80% chance present
        })),
        takenBy: 'Teacher1',
      };

      attendanceData.push(attendanceRecord);
    }

    await Attendance.deleteMany(); // Clear old attendance
    await Attendance.insertMany(attendanceData);

    console.log('10 Attendance records seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error while seeding attendance:', error);
    process.exit(1);
  }
}

seedAttendance();
