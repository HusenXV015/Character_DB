'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const characters = require(`../data/character.json`)
    characters.forEach(el => {
      el.updatedAt = el.createdAt = new Date()
    })
    await queryInterface.bulkInsert(`Characters`, characters, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(`Characters`, null, {})
  }
};
