'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mahasiswas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      kurikulum_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      jenjang: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      angkatan: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      shift: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sts_kul: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      kelamin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nohp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telp_ot: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sts_bayar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('mahasiswas');
  },
};
