'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('detail_transaksi', [{
      id_transaksi: 1,
      id_barang:"BAR00001",
      jumlah_barang:100,
      subtotal_barang:79168,
      retur:0,
    },{
      id_transaksi: 1,
      id_barang:"BAR00004",
      jumlah_barang:12,
      subtotal_barang:196000,
      retur:0,
    },{
      id_transaksi: 2,
      id_barang:"BAR00007",
      jumlah_barang:10,
      subtotal_barang:70000,
      retur:0,
    },{
      id_transaksi: 3,
      id_barang:"BAR00005",
      jumlah_barang:3,
      subtotal_barang:26745,
      retur:0,
    },{
      id_transaksi: 4,
      id_barang:"BAR00009",
      jumlah_barang:72,
      subtotal_barang:216000,
      retur:0,
    },{
      id_transaksi: 5,
      id_barang:"BAR00010",
      jumlah_barang:5,
      subtotal_barang:15000,
      retur:0,
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('detail_transaksi', null, {});
    
  }
};
