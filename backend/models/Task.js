const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['open', 'accepted', 'completed'],
    default: 'open'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Posted by user is required']
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Task', taskSchema);