'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_user.init({
    id_user: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    id_jabatan:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    id_atasan:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    email:{
      type:DataTypes.TEXT,
      allowNull:false,
      unique:true
    },
    username:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    password:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    no_handphone:{
      type:DataTypes.STRING(15),
      allowNull:false,
    },
    alamat:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    tanggal_masuk:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    foto:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    target_sekarang:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    absen_user:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    status_user:{
      type:DataTypes.INTEGER(1),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'MasterUser',
    tableName: 'master_user',
    timestamps:null
  });
  return master_user;
};