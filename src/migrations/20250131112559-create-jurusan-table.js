'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jurusan', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      kode_kelas: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jur: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      akreditasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_jur: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_jur_e: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ban: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_jur_singk: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fakultas_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fak: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jenjang: {
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
    await queryInterface.dropTable('jurusan');
  },
};
