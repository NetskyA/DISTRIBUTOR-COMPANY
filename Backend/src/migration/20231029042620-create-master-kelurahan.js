'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_kelurahan', {
      id_kelurahan: {
        type:Sequelize.STRING(8),
        allowNull:false,
        primaryKey:true,
      },
      id_kota: {
        type:Sequelize.STRING(8),
        allowNull:false,
      },
      nama_kelurahan: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      status_kelurahan: {
        type:Sequelize.INTEGER(1),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_kelurahan');
  }
};