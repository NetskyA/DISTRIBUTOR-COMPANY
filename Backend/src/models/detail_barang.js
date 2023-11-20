'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_barang.init({
    id_detail_barang: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    id_barang: {
      type:DataTypes.STRING(8),
      allowNull:false,
    },
    jumlah_pcs:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    jumlah_karton:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tanggal_masuk:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    tanggal_expired:{
      type:DataTypes.TEXT,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'DetailBarang',
    modelName: 'detail_barang',
    timestamps:null
  });
  return detail_barang;
};