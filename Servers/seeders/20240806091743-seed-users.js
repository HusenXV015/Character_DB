'use strict';
const { hash } = require(`../helpers/bcrypt`)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data/users.json')
    users.forEach(el => {
      el.password = hash(el.password)
      el.updatedAt = el.createdAt = new Date()
    })

    await queryInterface.bulkInsert('Users', users, {})
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
