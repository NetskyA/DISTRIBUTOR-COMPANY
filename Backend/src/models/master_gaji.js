'use strict';
const {
  Model, BIGINT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_gaji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_gaji.init({
    id_gaji: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    id_user:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    gaji_pokok:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    gaji_komisi:{
      type:DataTypes.BIGINT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'MasterGaji',
    tableName: 'master_gaji',
    timestamps:null,
  });
  return master_gaji;
};