'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_keuangan', [{
      id_keuangan:1,
      jumlah_uang:1001000000,
      uang_masuk: 1000000,
      uang_keluar:0,
      tanggal_perpindahan:"11-11-2021"
    },{
      id_keuangan:2,
      jumlah_uang:999000000,
      uang_masuk: 0,
      uang_keluar:2000000,
      tanggal_perpindahan:"12-11-2021"
    },{
      id_keuangan:3,
      jumlah_uang:1000000000,
      uang_masuk: 1000000,
      uang_keluar:0,
      tanggal_perpindahan:"15-11-2021"
    },{
      id_keuangan:4,
      jumlah_uang:990000000,
      uang_masuk: 0,
      uang_keluar:10000000,
      tanggal_perpindahan:"17-11-2021"
    },{
      id_keuangan:5,
      jumlah_uang:999000000,
      uang_masuk: 9000000,
      uang_keluar:0,
      tanggal_perpindahan:"24-11-2021"
    },{
      id_keuangan:6,
      jumlah_uang:1000000000,
      uang_masuk: 1000000,
      uang_keluar:0,
      tanggal_perpindahan:"30-11-2021"
    }]);
  },

   
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_keuangan', null, {});
    
  }
};
