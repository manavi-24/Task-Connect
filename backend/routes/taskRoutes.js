const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  postTask,
  getAllTasks,
  acceptTask
} = require('../controllers/taskController');

// 👇 THESE MUST MATCH EXACTLY with functions exported above
router.post('/post', auth, postTask);
router.get('/', getAllTasks);
router.patch('/accept/:id', auth, acceptTask);

module.exports = router;
