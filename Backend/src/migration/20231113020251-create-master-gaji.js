'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_gaji', {
      id_gaji: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      id_user:{
        type:Sequelize.INTEGER,
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
    await queryInterface.dropTable('master_gaji');
  }
};