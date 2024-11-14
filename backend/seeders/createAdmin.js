// seeders/createAdmin.js
const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.users;

async function seedAdmin() {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin2#123', saltRounds);

    // Create admin user
    const admin = await User.create({
      username: 'admin2',
      password: hashedPassword
    });

    console.log('Admin user created successfully:', admin.username);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
}

// Run the seeder
seedAdmin();