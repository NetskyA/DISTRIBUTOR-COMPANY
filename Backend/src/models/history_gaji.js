'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history_gaji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  history_gaji.init({
    id_history_gaji: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    id_gaji:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tanggal_gaji:{
      type:DataTypes.TEXT,
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
    modelName: 'HistoryGaji',
    tableName: 'history_gaji',
    timestamps:null
  });
  return history_gaji;
};