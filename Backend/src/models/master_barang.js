'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_barang.init({
    id_barang: {
      type:DataTypes.STRING(8),
      allowNull:false,
      primaryKey:true,
    },
    id_brand:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    nama_barang:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    harga_pcs:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    harga_karton:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    status_barang:{
      type:DataTypes.INTEGER(1),
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'MasterBarang',
    tableName: 'master_barang',
  });
  return master_barang;
};