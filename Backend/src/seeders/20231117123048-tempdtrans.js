'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('detail_transaksi', [{
      id_transaksi: 1,
      id_detail_barang:1,
      jumlah_barang_pcs:100,
      jumlah_barang_karton:0,
      subtotal_barang:792000,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    },{
      id_transaksi: 1,
      id_detail_barang:5,
      jumlah_barang_pcs:12,
      jumlah_barang_karton:0,
      subtotal_barang:196800,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    },{
      id_transaksi: 2,
      id_detail_barang:8,
      jumlah_barang_pcs:0,
      jumlah_barang_karton:5,
      subtotal_barang:2520000,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    },{
      id_transaksi: 3,
      id_detail_barang:6,
      jumlah_barang_pcs:12,
      jumlah_barang_karton:0,
      subtotal_barang:106980,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    },{
      id_transaksi: 4,
      id_detail_barang:10,
      jumlah_barang_pcs:0,
      jumlah_barang_karton:1,
      subtotal_barang:216000,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    },{
      id_transaksi: 5,
      id_detail_barang:11,
      jumlah_barang_pcs:5,
      jumlah_barang_karton:0,
      subtotal_barang:15000,
      retur_pcs:0,
      retur_karton:0,
      tanggal_retur:"-",
      jenis_retur:0
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('detail_transaksi', null, {});
    
  }
};
