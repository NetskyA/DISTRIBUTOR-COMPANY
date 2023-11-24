'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_transaksi.init({
    id_transaksi: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    id_detail_barang:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    jumlah_barang_pcs:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    jumlah_barang_karton:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    subtotal_barang:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    retur_pcs:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    retur_karton:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tanggal_retur:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    jenis_retur:{
      type:DataTypes.INTEGER, // 0 gk retur, 1 barang, 2 uang
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'DetailTransaksi',
    tableName: 'detail_transaksi',
    timestamps:false
  });
  detail_transaksi.removeAttribute('id');
  return detail_transaksi;
};