'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_keuangan', {
      id_keuangan: {
        type:Sequelize.INTEGER(8),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      jumlah_uang: {
        type:Sequelize.BIGINT,
        allowNull:false,
      },
      uang_masuk: {
        type:Sequelize.BIGINT,
        allowNull:false,
      },
      uang_keluar:{
        type:Sequelize.BIGINT,
        allowNull:false,
      },
      tanggal_perpindahan:{
        type:Sequelize.TEXT,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_keuangan');
  }
};