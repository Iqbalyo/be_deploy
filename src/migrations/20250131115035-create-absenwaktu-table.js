'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('absen_waktus', {
      absen_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hari: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jam: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ruang: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('absen_waktus');
  },
};
