'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_target.init({
    id_target: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    id_user: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    id_wilayah: {
      type:DataTypes.STRING(8),
      allowNull:false,
    },
    target:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    tanggal_target:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'MasterTarget',
    tableName: 'master_target',
    timestamps:null
  });
  return master_target;
};