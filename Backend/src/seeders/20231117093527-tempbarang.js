'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_barang', [{
      id_barang:"BAR00001",
      id_brand:1,
      nama_barang:"YOCOOL  STRAWBERY 150ML/24",
      harga_pcs:792,
      harga_karton:19000,
      status_barang:1
    },{
      id_barang:"BAR00002",
      id_brand:1,
      nama_barang:"YO COOL ORANGE 150ML/24",
      harga_pcs:792,
      harga_karton:19000,
      status_barang:1
    },{
      id_barang:"BAR00003",
      id_brand:2,
      nama_barang:"DONALD JELLY ES TUNG-TUNG/18",
      harga_pcs:420,
      harga_karton:30240,
      status_barang:1
    },{
      id_barang:"BAR00004",
      id_brand:2,
      nama_barang:"DONALD BIG STIK TOPLES/3",
      harga_pcs:16400,
      harga_karton:49200,
      status_barang:1
    },{
      id_barang:"BAR00005",
      id_brand:3,
      nama_barang:"MARIE RTG SUSU 12GR 2RTGX10/12",
      harga_pcs:8915,
      harga_karton:106964,
      status_barang:1
    },{
      id_barang:"BAR00006",
      id_brand:3,
      nama_barang:"MARIE SPESIAL 350GR/12",
      harga_pcs:11800,
      harga_karton:141600,
      status_barang:1
    },{
      id_barang:"BAR00007",
      id_brand:4,
      nama_barang:"58 KECAP INGGRIS 135ML/12X6",
      harga_pcs:7000,
      harga_karton:504000,
      status_barang:1
    },{
      id_barang:"BAR00008",
      id_brand:4,
      nama_barang:"58 KECAP INGGRIS 600ML/12",
      harga_pcs:24500,
      harga_karton:294000,
      status_barang:1
    },{
      id_barang:"BAR00009",
      id_brand:5,
      nama_barang:"MARIMAS JERUK 7GR/6X12RTG",
      harga_pcs:3000,
      harga_karton:216000,
      status_barang:1
    },{
      id_barang:"BAR00010",
      id_brand:5,
      nama_barang:"MARIMAS CENDOL DAWET 7GR/6X12RTG",
      harga_pcs:3000,
      harga_karton:216000,
      status_barang:1
    },{
      id_barang:"BAR00011",
      id_brand:5,
      nama_barang:"MARIMAS CENDOL DAWET JUMBO 14GR/6X12RTG",
      harga_pcs:5880,
      harga_karton:211000,
      status_barang:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_barang', null, {});
    
  }
};
