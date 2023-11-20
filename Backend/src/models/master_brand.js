'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_brand.init({
    id_brand: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    nama_brand:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    tanggal_masuk_brand:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    status_brand:{
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterBrand',
    tableName: 'master_brand',
    timestamps:null
  });
  return master_brand;
};