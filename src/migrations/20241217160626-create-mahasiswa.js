"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("mahasiswas", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      kurikulum_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      jurusan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dosen_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      jenjang: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      nim: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "",
      },
      nama: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      angkatan: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      shift: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      sts_kul: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      tgl_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      kelamin: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
      nohp: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      telp_ot: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      sts_bayar: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("mahasiswas");
  },
};
