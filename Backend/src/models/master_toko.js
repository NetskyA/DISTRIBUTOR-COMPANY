'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_toko extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_toko.init({
    id_toko: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    }, 
    id_kelurahan: {
      type:DataTypes.STRING(8),
      allowNull:false,
    },
    id_kota: {
      type:DataTypes.STRING(8),
      allowNull:false,
    },
    nama_toko: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    nama_konsumen: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    alamat_toko: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    no_handphone1: {
      type:DataTypes.STRING(15),
      allowNull:false,
    },
    no_handphone2: {
      type:DataTypes.STRING(15),
      allowNull:false,
    },
    tanggal_masuk: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    status_toko: {
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterToko',
    tableName: 'master_toko',
    timestamps:null
  });
  return master_toko;
};