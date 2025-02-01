'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jurusans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_kelas: {
        type: Sequelize.STRING
      },
      jur: {
        type: Sequelize.STRING
      },
      akreditasi: {
        type: Sequelize.STRING
      },
      nama_jur: {
        type: Sequelize.STRING
      },
      nama_jur_e: {
        type: Sequelize.STRING
      },
      ban: {
        type: Sequelize.STRING
      },
      nama_jur_singk: {
        type: Sequelize.STRING
      },
      fakultas_id: {
        type: Sequelize.INTEGER
      },
      fak: {
        type: Sequelize.STRING
      },
      jenjang: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jurusans');
  }
};