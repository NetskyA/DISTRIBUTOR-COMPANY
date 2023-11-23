'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class header_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  header_transaksi.init({
    id_transaksi: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    id_toko:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    id_user:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tanggal_transaksi:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    subtotal:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    jenis_transaksi:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status_transaksi:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'HeaderTransaksi',
    tableName: 'header_transaksi',
    timestamps:null
  });
  return header_transaksi;
};