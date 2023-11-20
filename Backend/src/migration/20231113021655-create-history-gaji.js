'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history_gaji', {
      id_history_gaji: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      id_gaji:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      tanggal_gaji:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      gaji_pokok:{
        type:Sequelize.BIGINT,
        allowNull:false,
      },
      gaji_komisi:{
        type:Sequelize.BIGINT,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('history_gaji');
  }
};