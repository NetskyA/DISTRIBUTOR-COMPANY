'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_kelurahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_kelurahan.init({
    id_kelurahan: {
      type:DataTypes.STRING(8),
      allowNull:false,
      primaryKey:true,
    },
    id_kota: {
      type:DataTypes.STRING(8),
      allowNull:false,
    },
    nama_kelurahan: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    status_kelurahan: {
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterKelurahan',
    tableName: 'master_kelurahan',
    timestamps:null
  });
  return master_kelurahan;
};