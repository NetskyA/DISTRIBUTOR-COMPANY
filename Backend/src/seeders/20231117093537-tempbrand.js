'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_brand', [{
      id_brand:1,
      nama_brand:"MY COOL",
      tanggal_masuk_brand:"10-01-2023",
      status_brand:1
    },{
      id_brand:2,
      nama_brand:"DONALD",
      tanggal_masuk_brand:"15-02-2023",
      status_brand:1
    },{
      id_brand:3,
      nama_brand:"MARIE",
      tanggal_masuk_brand:"12-01-2023",
      status_brand:1
    },{
      id_brand:4,
      nama_brand:"KECAP INGGRIS",
      tanggal_masuk_brand:"06-04-2022",
      status_brand:1
    },{
      id_brand:5,
      nama_brand:"MARIMAS",
      tanggal_masuk_brand:"30-12-2022",
      status_brand:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_brand', null, {});
    
  }
};
