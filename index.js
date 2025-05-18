const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));



const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const percentageRoutes = require('./routes/percentageRoutes')
const studentLoginRoutes = require('./routes/studentLoginRoutes');


connectDB()

app.get('/',(req,res)=>{
	res.send("hello world");
})


// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/attendance/percentage', percentageRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/studentLogin', studentLoginRoutes);






app.listen(3000,()=>{
	console.log("app is running");
})
