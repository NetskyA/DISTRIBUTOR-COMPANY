'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_kota', [{
      id_kota:"KTA00001",
      nama_kota:"Surabaya",
      status_kota:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_kota', null, {});
  }
};
