'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_barang', {
      id_barang: {
        type:Sequelize.STRING(8),
        allowNull:false,
        primaryKey:true,
      },
      id_brand:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      nama_barang:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      harga_pcs:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      harga_karton:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      status_barang:{
        type:Sequelize.INTEGER(1),
        allowNull:true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_barang');
  }
};