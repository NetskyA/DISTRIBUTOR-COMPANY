'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_toko', {
      id_toko: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      }, 
      id_kelurahan: {
        type:Sequelize.STRING(8),
        allowNull:false,
      },
      id_kota: {
        type:Sequelize.STRING(8),
        allowNull:false,
      },
      nama_toko: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      nama_konsumen: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      alamat_toko: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      no_handphone1: {
        type:Sequelize.STRING(15),
        allowNull:false,
      },
      no_handphone2: {
        type:Sequelize.STRING(15),
        allowNull:false,
      },
      tanggal_masuk: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      status_toko: {
        type:Sequelize.INTEGER(1),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_toko');
  }
};