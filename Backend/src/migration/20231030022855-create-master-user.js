'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_user', {
      id_user: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      id_jabatan:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      id_atasan:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      email:{
        type:Sequelize.TEXT,
        allowNull:false,
        unique:true
      },
      username:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      password:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      no_handphone:{
        type:Sequelize.STRING(15),
        allowNull:false,
      },
      alamat:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      tanggal_masuk:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      foto:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      target_sekarang:{
        type:Sequelize.BIGINT,
        allowNull:false,
      },
      absen_user:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      no_rekening:{
        type:Sequelize.STRING(10),
        allowNull:false,
      },
      status_user:{
        type:Sequelize.INTEGER(1),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_user');
  }
};