"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("absen_pertemuans", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      device_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      network_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      absen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dosen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      locked_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      locked_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kelas: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      matakuliah_kode: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      matakuliah: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      presensi_terbuka: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status_perkuliahan: {
        type: DataTypes.ENUM("tatap-muka", "online", "cancel"),
        defaultValue: "tatap-muka",
      },
      status_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      keterangan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sks: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dosen: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      jurusan: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ruang: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      waktu: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tanggal_kuliah: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lama_kuliah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      pekan_ke: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pertemuan_ke: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bahasan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lokasi: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      device_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      waktu_tunggu: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      waktu_presensi: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      buka_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      buka_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      buka_from: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tutup_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      libur: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      batas_lokasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      kirim_notifikasi: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      kode: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      semester: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      periode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "dosen",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("absen_pertemuans");
  },
};
