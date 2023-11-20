'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_kota', {
      id_kota: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(8),
      },
      nama_kota: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      status_kota:{
        type:Sequelize.INTEGER(1),
        allowNull:false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_kota');
  }
};