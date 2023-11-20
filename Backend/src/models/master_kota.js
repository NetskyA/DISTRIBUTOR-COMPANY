'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_kota.init({
    id_kota: {
      type:DataTypes.STRING(8),
      allowNull:false,
      primaryKey:true,
    },
    nama_kota: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    status_kota: {
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterKota',
    tableName: 'master_kota',
    timestamps:null
  });
  return master_kota;
};