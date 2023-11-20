'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_jabatan.init({
    id_jabatan: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    nama_jabatan: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    status_jabatan: {
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterJabatan',
    tableName: 'master_jabatan',
    timestamps:null
  });
  return master_jabatan;
};