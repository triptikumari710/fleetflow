require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if fleet_manager already exists
    const existingAdmin = await User.findOne({ 
      email: 'admin@fleetflow.com' 
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default fleet_manager
    const admin = await User.create({
      name: 'Fleet Manager Admin',
      email: 'admin@fleetflow.com',
      password: 'admin123',
      role: 'fleet_manager',
      isActive: true
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@fleetflow.com');
    console.log('Password: admin123');
    console.log('Role: fleet_manager');
    console.log('\n⚠️  IMPORTANT: Change this password in production!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
