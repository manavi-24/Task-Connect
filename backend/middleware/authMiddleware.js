const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    console.log('Auth middleware - checking authorization');
    console.log('Authorization header:', req.headers.authorization);
    
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Extracted token:', token ? 'Found' : 'Missing');

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    
    // Fetch the actual user object and attach to req
    const user = await User.findById(decoded.id).select('-password');
    console.log('User found:', user ? user.name : 'Not found');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user; // Now req.user contains the full user object
    console.log('Auth middleware - success, proceeding to next');
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};