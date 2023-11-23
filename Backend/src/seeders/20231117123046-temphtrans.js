'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('header_transaksi', [{
      id_transaksi:1,
      id_toko:1,
      id_user:13,
      tanggal_transaksi:"12-10-2020",
      subtotal:275364,
      jenis_transaksi:0,
      status_transaksi:1
    },{
      id_transaksi:2,
      id_toko:4,
      id_user:14,
      tanggal_transaksi:"12-11-2020",
      subtotal:70000,
      jenis_transaksi:0,
      status_transaksi:1
    },{
      id_transaksi:3,
      id_toko:2,
      id_user:15,
      tanggal_transaksi:"12-10-2021",
      subtotal:26745,
      jenis_transaksi:1,
      status_transaksi:1
    },{
      id_transaksi:4,
      id_toko:5,
      id_user:15,
      tanggal_transaksi:"12-10-2022",
      subtotal:216000,
      jenis_transaksi:1,
      status_transaksi:1
    },{
      id_transaksi:5,
      id_toko:2,
      id_user:15,
      tanggal_transaksi:"12-10-2023",
      subtotal:15000,
      jenis_transaksi:1,
      status_transaksi:1
    }]);
  },

   
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('header_transaksi', null, {});
    
  }
};
