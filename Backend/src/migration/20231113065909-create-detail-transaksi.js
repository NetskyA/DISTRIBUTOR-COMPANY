'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_transaksi', {
      id_transaksi: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      id_detail_barang:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      jumlah_barang_pcs:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      jumlah_barang_karton:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      subtotal_barang:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      retur:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_transaksi');
  }
};