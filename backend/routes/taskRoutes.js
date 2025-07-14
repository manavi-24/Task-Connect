const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  postTask,
  getAllTasks,
  acceptTask
} = require('../controllers/taskController');

router.post('/post', auth, postTask); // <-- must use auth
router.get('/', getAllTasks);
router.patch('/accept/:id', auth, acceptTask); // <-- must use auth

module.exports = router;