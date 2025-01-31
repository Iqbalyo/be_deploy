'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aktivitas_kuliahs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      aktivitas_periode_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      periode_akademik: {
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
      ips: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ipk: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      sks_lulus: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sks_dikontrak: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sts_kul: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      semester_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('aktivitas_kuliahs');
  },
};
