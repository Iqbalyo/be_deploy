'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('absen_pertemuans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_info: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      network_info: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      absen_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosen_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locked_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      locked_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kelas: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ip_address: {
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
      presensi_terbuka: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      status_perkuliahan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status_updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      keterangan: {
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
        type: Sequelize.DATE,
        allowNull: true,
      },
      tanggal_kuliah: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lama_kuliah: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pekan_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pertemuan_ke: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bahasan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lokasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_agent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      waktu_tunggu: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      waktu_presensi: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      buka_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      buka_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      buka_from: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tutup_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      libur: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      batas_lokasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kirim_notifikasi: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foto: {
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
      created_by: {
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
    await queryInterface.dropTable('absen_pertemuans');
  },
};
