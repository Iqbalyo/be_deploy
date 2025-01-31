'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class absensDosen extends Model {
    static associate(models) {
      absensDosen.hasMany(models.absen_mahasiswas, {
        foreignKey: 'dosen_id',
        as: 'absensi_mahasiswa'  // ✅ Ubah alias agar sesuai dengan yang digunakan di controller
      });
    }
  }
  

  absensDosen.init({
    job_status_id: DataTypes.INTEGER,
    locked_at: DataTypes.DATE,
    jurusan_id: DataTypes.INTEGER,
    jenjang: DataTypes.STRING,
    matakuliah_id: DataTypes.INTEGER,
    dosen_id: DataTypes.INTEGER,
    jenis: DataTypes.STRING,
    kelas: DataTypes.STRING,
    matakuliah_kode: DataTypes.STRING,
    matakuliah: DataTypes.STRING,
    sks: DataTypes.INTEGER,
    dosen: DataTypes.STRING, // ❗ Kolom ini ada, jadi jangan pakai alias 'dosen'
    jurusan: DataTypes.STRING,
    ruang: DataTypes.STRING,
    waktu: DataTypes.STRING,
    semester: DataTypes.STRING,
    periode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'absensDosen',
    tableName: 'Absens'
  });

  return absensDosen;
};
