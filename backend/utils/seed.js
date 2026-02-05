require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@linktree.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = await User.create({
      email: 'admin@linktree.com',
      password: 'admin123',
      username: 'admin',
      displayName: 'Administrator',
      isAdmin: true,
      bio: 'System Administrator'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@linktree.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();