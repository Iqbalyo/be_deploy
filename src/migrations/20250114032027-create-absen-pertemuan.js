'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AbsenPertemuans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      device_info: {
        type: Sequelize.STRING
      },
      network_info: {
        type: Sequelize.STRING
      },
      absen_id: {
        type: Sequelize.STRING
      },
      dosen_id: {
        type: Sequelize.STRING
      },
      locked_at: {
        type: Sequelize.DATE
      },
      locked_by: {
        type: Sequelize.STRING
      },
      kelas: {
        type: Sequelize.STRING
      },
      ip_address: {
        type: Sequelize.STRING
      },
      matakuliah_kode: {
        type: Sequelize.STRING
      },
      matakuliah: {
        type: Sequelize.STRING
      },
      presensi_terbuka: {
        type: Sequelize.BOOLEAN
      },
      status_perkuliahan: {
        type: Sequelize.STRING
      },
      status_updated_at: {
        type: Sequelize.DATE
      },
      status_updated_by: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      sks: {
        type: Sequelize.INTEGER
      },
      dosen: {
        type: Sequelize.STRING
      },
      jurusan: {
        type: Sequelize.STRING
      },
      ruang: {
        type: Sequelize.STRING
      },
      waktu: {
        type: Sequelize.DATE
      },
      tanggal_kuliah: {
        type: Sequelize.DATE
      },
      lama_kuliah: {
        type: Sequelize.INTEGER
      },
      pekan_ke: {
        type: Sequelize.INTEGER
      },
      pertemuan_ke: {
        type: Sequelize.INTEGER
      },
      bahasan: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      device_id: {
        type: Sequelize.STRING
      },
      user_agent: {
        type: Sequelize.STRING
      },
      waktu_tunggu: {
        type: Sequelize.INTEGER
      },
      waktu_presensi: {
        type: Sequelize.INTEGER
      },
      buka_at: {
        type: Sequelize.DATE
      },
      buka_by: {
        type: Sequelize.STRING
      },
      buka_from: {
        type: Sequelize.STRING
      },
      tutup_at: {
        type: Sequelize.DATE
      },
      libur: {
        type: Sequelize.BOOLEAN
      },
      batas_lokasi: {
        type: Sequelize.STRING
      },
      kirim_notifikasi: {
        type: Sequelize.BOOLEAN
      },
      kode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING
      },
      periode: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AbsenPertemuans');
  }
};