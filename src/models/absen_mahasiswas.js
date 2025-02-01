'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class absen_mahasiswas extends Model {
    static associate(models) {
      absen_mahasiswas.belongsTo(models.absen_pertemuans, {
        foreignKey: 'absen_pertemuan_id',
        as: 'pertemuan',  // Konsisten dengan alias yang digunakan
      });
    }
  }

  absen_mahasiswas.init({
    absen_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    absen_pertemuan_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    dosen_id: DataTypes.INTEGER,
    matakuliah_id: DataTypes.INTEGER,
    data_beacon: DataTypes.STRING,
    device_id: DataTypes.STRING,
    device_info: DataTypes.STRING,
    network_info: DataTypes.STRING,
    matakuliah_nama: DataTypes.STRING,
    matakuliah_kode: DataTypes.STRING,
    kelas: DataTypes.STRING,
    pertemuan_ke: DataTypes.INTEGER,
    nim: DataTypes.BIGINT,
    nama: DataTypes.STRING,
    status: DataTypes.STRING,
    absen_by: DataTypes.STRING,
    absen_at: DataTypes.DATE,
    absen_metode: DataTypes.STRING,
    absen_from: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    validasi_izin_at: DataTypes.DATE,
    pengajuan_izin_at: DataTypes.DATE,
    status_izin: DataTypes.STRING,
    keterangan_izin_ditolak: DataTypes.STRING,
    file_izin: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    foto: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    semester: DataTypes.STRING,
    periode: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    sequelize,
    modelName: 'absen_mahasiswas',
    tableName: 'absen_mahasiswas',
    timestamps: true,
  });

  return absen_mahasiswas;
};
