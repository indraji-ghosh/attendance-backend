const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, (req, res) => {
  console.log("Protected route is accessed");
  console.log("Authenticated Teacher:", req.teacher);

  res.json({ message: "Welcome to the protected admin route", user: req.teacher });
});

module.exports = router;
