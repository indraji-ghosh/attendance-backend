const express = require('express');
const Subject = require('../models/Subjects');

const router = express.Router();

router.get('/all', async (req, res) => {
	try {
		const subjects = await Subject.find();
		res.json(subjects);
	} catch (err) {
		console.error("Error fetching subjects:", err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
