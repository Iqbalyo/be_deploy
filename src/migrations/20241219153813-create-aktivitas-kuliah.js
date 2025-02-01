"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aktivitas_kuliahs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      aktivitas_periode_id: {
        type: Sequelize.INTEGER,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER,
      },
      nim: {
        type: Sequelize.STRING,
      },
      periode_akademik: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
      },
      periode: {
        type: Sequelize.STRING,
      },
      ips: {
        type: Sequelize.FLOAT,
      },
      ipk: {
        type: Sequelize.FLOAT,
      },
      sks_lulus: {
        type: Sequelize.INTEGER,
      },
      sks_dikontrak: {
        type: Sequelize.INTEGER,
      },
      sts_kul: {
        type: Sequelize.STRING,
      },
      semester_ke: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("aktivitas_kuliahs");
  },
};
