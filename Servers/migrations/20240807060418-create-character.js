'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      gameName: {
        type: Sequelize.STRING
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      description: {
        type: Sequelize.TEXT
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      skill: {
        type: Sequelize.STRING
      },
      weapon: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key:"id"
        },
        onDelete: "Cascade",
        onUpdate: "Cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};