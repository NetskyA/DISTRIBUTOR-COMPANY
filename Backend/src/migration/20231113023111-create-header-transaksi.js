'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('header_transaksi', {
      id_transaksi: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
      id_toko:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      id_user:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      tanggal_transaksi:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      subtotal:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      jenis_transaksi:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      status_transaksi:{
        type:Sequelize.INTEGER,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('header_transaksi');
  }
};