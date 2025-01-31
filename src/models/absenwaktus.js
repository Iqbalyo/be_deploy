'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AbsenWaktus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // AbsenWaktus.hasMany(models.absen_mahasiswas, {
      //   foreignKey: 'absen_id',
      //   as: 'mahasiswa'
      // });
      AbsenWaktus.hasMany(models.absen_mahasiswas, {
        foreignKey: 'absen_id',
        as: 'mahasiswa'
      });
      


      //AbsenWaktus.belongsTo(models.absen_mahasiswas, { foreignKey: 'absen_id', as: 'mahasiswa' });
    }
    
  }
  console.log('Debugging Relasi:', AbsenWaktus.associations);

  AbsenWaktus.init({
    absen_id: DataTypes.INTEGER,
    dosen_id: DataTypes.INTEGER,
    hari: DataTypes.STRING,
    jam: DataTypes.STRING,
    ruang: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AbsenWaktus',
    tableName: 'absen_waktus',
    timestamps: false
  });
  console.log('Relasi AbsenWaktus:', AbsenWaktus.associations);
  return AbsenWaktus;

};