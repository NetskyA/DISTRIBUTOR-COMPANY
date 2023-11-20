'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_barang', {
      id_detail_barang: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      id_barang: {
        type:Sequelize.STRING(8),
        allowNull:false,
      },
      jumlah_pcs:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      jumlah_karton:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      tanggal_masuk:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      tanggal_expired:{
        type:Sequelize.TEXT,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_barang');
  }
};