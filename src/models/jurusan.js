'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jurusan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jurusan.init({
    kode_kelas: DataTypes.STRING,
    jur: DataTypes.STRING,
    akreditasi: DataTypes.STRING,
    nama_jur: DataTypes.STRING,
    nama_jur_e: DataTypes.STRING,
    ban: DataTypes.STRING,
    nama_jur_singk: DataTypes.STRING,
    fakultas_id: DataTypes.INTEGER,
    fak: DataTypes.STRING,
    jenjang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jurusan',
    tableName: 'jurusan',
    timestamps: false, // Nonaktifkan createdAt dan updatedAt
  });
  return jurusan;
};