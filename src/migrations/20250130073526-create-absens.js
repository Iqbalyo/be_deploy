"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      job_status_id: {
        type: Sequelize.INTEGER,
      },
      locked_at: {
        type: Sequelize.DATE,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
      },
      jenjang: {
        type: Sequelize.STRING,
      },
      matakuliah_id: {
        type: Sequelize.INTEGER,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
      },
      jenis: {
        type: Sequelize.STRING,
      },
      kelas: {
        type: Sequelize.STRING,
      },
      matakuliah_kode: {
        type: Sequelize.STRING,
      },
      matakuliah: {
        type: Sequelize.STRING,
      },
      sks: {
        type: Sequelize.INTEGER,
      },
      dosen: {
        type: Sequelize.STRING,
      },
      jurusan: {
        type: Sequelize.STRING,
      },
      ruang: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
      },
      periode: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absens");
  },
};
