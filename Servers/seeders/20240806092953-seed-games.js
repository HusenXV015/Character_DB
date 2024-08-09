'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const games = require(`../data/games.json`)
   games.forEach(el => {
    el.updatedAt = el.createdAt = new Date()
   })
   await queryInterface.bulkInsert(`Games`, games, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(`Games`,null, {})
  }
};
