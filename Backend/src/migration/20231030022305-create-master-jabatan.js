'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_jabatan', {
      id_jabatan: {
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      nama_jabatan: {
        type:Sequelize.TEXT,
        allowNull:false,
      },
      status_jabatan: {
        type:Sequelize.INTEGER(1),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_jabatan');
  }
};