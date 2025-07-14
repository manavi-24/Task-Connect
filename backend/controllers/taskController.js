const Task = require('../models/Task');

exports.postTask = async (req, res) => {
  try {
    const { title, description, category, price, duration, location } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title,
      description,
      category,
      price,
      duration,
      location,
      postedBy: req.user._id
    });

    await task.save();

    res.status(201).json({ message: 'Task created successfully!', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('postedBy', 'name email hostel room')
      .populate('acceptedBy', 'name email hostel room');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status === 'accepted') {
      return res.status(400).json({ message: 'Task already accepted' });
    }

    if (task.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot accept your own task' });
    }

    task.status = 'accepted';
    task.acceptedBy = req.user._id;
    await task.save();

    res.json({ message: 'Task accepted', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};