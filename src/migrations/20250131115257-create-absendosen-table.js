'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Absens', {
      job_status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      locked_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jenjang: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matakuliah_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jenis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kelas: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matakuliah_kode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matakuliah: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dosen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jurusan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ruang: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      waktu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      periode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Absens');
  },
};
