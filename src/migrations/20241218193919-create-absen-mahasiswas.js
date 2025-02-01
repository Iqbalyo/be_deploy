"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absen_mahasiswas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      absen_id: {
        type: Sequelize.INTEGER,
      },
      absen_pertemuan_id: {
        type: Sequelize.INTEGER,
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER,
      },
      dosen_id: {
        type: Sequelize.INTEGER,
      },
      matakuliah_id: {
        type: Sequelize.INTEGER,
      },
      data_beacon: {
        type: Sequelize.STRING,
      },
      device_id: {
        type: Sequelize.STRING,
      },
      device_info: {
        type: Sequelize.STRING,
      },
      network_info: {
        type: Sequelize.STRING,
      },
      matakuliah_nama: {
        type: Sequelize.STRING,
      },
      matakuliah_kode: {
        type: Sequelize.STRING,
      },
      kelas: {
        type: Sequelize.STRING,
      },
      pertemuan_ke: {
        type: Sequelize.INTEGER,
      },
      nim: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      absen_by: {
        type: Sequelize.STRING,
      },
      absen_at: {
        type: Sequelize.DATE,
      },
      absen_metode: {
        type: Sequelize.STRING,
      },
      absen_from: {
        type: Sequelize.STRING,
      },
      ip_address: {
        type: Sequelize.STRING,
      },
      validasi_izin_at: {
        type: Sequelize.DATE,
      },
      pengajuan_izin_at: {
        type: Sequelize.DATE,
      },
      status_izin: {
        type: Sequelize.STRING,
      },
      keterangan_izin_ditolak: {
        type: Sequelize.STRING,
      },
      file_izin: {
        type: Sequelize.STRING,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      foto: {
        type: Sequelize.STRING,
      },
      user_agent: {
        type: Sequelize.STRING,
      },
      keterangan: {
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
    await queryInterface.dropTable("absen_mahasiswas");
  },
};
