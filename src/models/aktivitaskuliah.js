'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AktivitasKuliah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AktivitasKuliah.init({
    aktivitas_periode_id: DataTypes.INTEGER,
    jurusan_id: DataTypes.INTEGER,
    mahasiswa_id: DataTypes.INTEGER,
    nim: DataTypes.STRING,
    periode_akademik: DataTypes.STRING,
    semester: DataTypes.STRING,
    periode: DataTypes.STRING,
    ips: DataTypes.FLOAT,
    ipk: DataTypes.FLOAT,
    sks_lulus: DataTypes.INTEGER,
    sks_dikontrak: DataTypes.INTEGER,
    sts_kul: DataTypes.STRING,
    semester_ke: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AktivitasKuliah',
    tableName: 'aktivitas_kuliahs'
  });
  return AktivitasKuliah;
};