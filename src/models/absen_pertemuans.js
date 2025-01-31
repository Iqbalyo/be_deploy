'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class absen_pertemuans extends Model {
   static associate(models) {
  // // Asosiasi dengan absen_mahasiswas
  // absen_pertemuans.hasMany(models.absen_mahasiswas, {
  //   foreignKey: 'absen_id',
  //   as: 'jadwal' // Pastikan alias di sini sesuai dengan yang digunakan di absen_mahasiswas
  // });

  absen_pertemuans.hasMany(models.absen_mahasiswas, {
    foreignKey: 'absen_pertemuan_id',
    as: 'mahasiswa',
  }); 

}

  }
  absen_pertemuans.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Menandakan bahwa ini adalah primary key
      autoIncrement: true // Untuk auto increment jika diperlukan
    },
    device_info: DataTypes.STRING,
    network_info: DataTypes.STRING,
    absen_id: DataTypes.STRING,
    dosen_id: DataTypes.STRING,
    locked_at: DataTypes.STRING,
    locked_by: DataTypes.STRING,
    kelas: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    matakuliah_kode: DataTypes.STRING,
    matakuliah: DataTypes.STRING,
    presensi_terbuka: DataTypes.STRING,
    status_perkuliahan: DataTypes.STRING,
    status_updated_at: DataTypes.STRING,
    status_updated_by: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    sks: DataTypes.STRING,
    dosen: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    ruang: DataTypes.STRING,
    waktu: DataTypes.STRING,
    tanggal_kuliah: DataTypes.STRING,
    lama_kuliah: DataTypes.INTEGER,
    pekan_ke: DataTypes.INTEGER,
    pertemuan_ke: DataTypes.INTEGER,
    bahasan: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    device_id: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    waktu_tunggu: DataTypes.INTEGER,
    waktu_presensi: DataTypes.INTEGER,
    buka_at: DataTypes.STRING,
    buka_by: DataTypes.STRING,
    buka_from: DataTypes.STRING,
    tutup_at: DataTypes.STRING,
    libur: DataTypes.BOOLEAN,
    batas_lokasi: DataTypes.STRING,
    kirim_notifikasi: DataTypes.BOOLEAN,
    kode: DataTypes.STRING,
    status: DataTypes.STRING,
    foto: DataTypes.STRING,
    semester: DataTypes.STRING,
    periode: DataTypes.STRING,
    created_by: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'absen_pertemuans',
    tableName: 'absen_pertemuans',
  });
  return absen_pertemuans;
};
