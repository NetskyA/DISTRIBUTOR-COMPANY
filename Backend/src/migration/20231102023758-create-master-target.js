'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_target', {
      id_target: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      id_user: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      id_wilayah: {
        type:Sequelize.STRING(8),
        allowNull:false,
      },
      target:{
        type:Sequelize.BIGINT,
        allowNull:false
      },
      tanggal_target:{
        type:Sequelize.TEXT,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_target');
  }
};