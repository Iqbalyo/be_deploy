'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mahasiswa.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    kurikulum_id: DataTypes.INTEGER,
    jurusan_id: DataTypes.INTEGER,
    dosen_id: DataTypes.INTEGER,
    jenjang: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    angkatan: DataTypes.INTEGER,
    shift: DataTypes.STRING,
    sts_kul: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    kelamin: DataTypes.STRING,
    nohp: DataTypes.STRING,
    telp_ot: DataTypes.STRING,
    sts_bayar: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    

  }, {
    sequelize,
    modelName: 'mahasiswa',
    tableName: 'mahasiswas', 
  });
  return mahasiswa;
};