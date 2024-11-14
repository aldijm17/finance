const bcrypt = require('bcryptjs');
const db = require('../models');

const { users: User } = db;

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('admin#123', 8);
    await User.upsert({
      username: 'admin',
      password: hashedPassword,
    });
    console.log('Admin user seeded successfully');
  },

  async down(queryInterface, Sequelize) {
    // Untuk menghapus data admin jika seeder dibatalkan
    await User.destroy({ where: { username: 'admin' } });
    console.log('Admin user deleted successfully');
  },
};
