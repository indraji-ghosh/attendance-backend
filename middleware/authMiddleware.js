const jwt = require('jsonwebtoken');
const Teacher = require("../models/Teacher")

const protect = async(req,res,next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(400).json({message: "invalid/no token"})
	}
  const token = authHeader.split(' ')[1];
	try{
		const decoded = jwt.verify(token,process.env.JWT_SECRET);
		console.log("Decoded Token:", decoded);  
    	req.teacher = await Teacher.findById(decoded.teacherId).select("-password");

  		next()
	}
	catch (error) {
                console.error("token verification failed",error)
                res.status(401).json({message: "not authorized"})
            }
}


module.exports = {protect};