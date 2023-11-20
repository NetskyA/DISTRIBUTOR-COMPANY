'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_brand', {
      id_brand: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      nama_brand:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      tanggal_masuk_brand:{
        type:Sequelize.TEXT,
        allowNull:false,
      },
      status_brand:{
        type:Sequelize.INTEGER(1),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_brand');
  }
};