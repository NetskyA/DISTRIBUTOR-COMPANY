'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_keuangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_keuangan.init({
    id_keuangan: {
      type:DataTypes.INTEGER(8),
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    jumlah_uang: {
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    uang_masuk: {
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    uang_keluar:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    tanggal_perpindahan:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'MasterKeuangan',
    tableName: 'master_keuangan',
    timestamps:null
  });
  return master_keuangan;
};