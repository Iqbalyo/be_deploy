"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absen_waktus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      absen_id: {
        type: Sequelize.INTEGER,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
      },
      hari: {
        type: Sequelize.STRING,
      },
      jam: {
        type: Sequelize.STRING,
      },
      ruang: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absen_waktus");
  },
};
