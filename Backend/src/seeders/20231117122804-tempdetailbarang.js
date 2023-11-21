'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('detail_barang', [{
      id_detail_barang: 1,
      id_barang: "BAR00001",
      jumlah_pcs: 288,
      jumlah_karton: 12,
      tanggal_masuk: "01-01-2023",
      tanggal_expired: "01-01-2024"
    }, {
      id_detail_barang: 2,
      id_barang: "BAR00001",
      jumlah_pcs: 240,
      jumlah_karton: 10,
      tanggal_masuk: "12-05-2023",
      tanggal_expired: "12-05-2024"
    }, {
      id_detail_barang: 3,
      id_barang: "BAR00002",
      jumlah_pcs: 264,
      jumlah_karton: 11,
      tanggal_masuk: "11-03-2023",
      tanggal_expired: "11-03-2024"
    }, {
      id_detail_barang: 4,
      id_barang: "BAR00003",
      jumlah_pcs: 360,
      jumlah_karton: 5,
      tanggal_masuk: "10-02-2023",
      tanggal_expired: "10-02-2024"
    }, {
      id_detail_barang: 5,
      id_barang: "BAR00004",
      jumlah_pcs: 60,
      jumlah_karton: 20,
      tanggal_masuk: "02-01-2023",
      tanggal_expired: "02-01-2024"
    }, {
      id_detail_barang: 6,
      id_barang: "BAR00005",
      jumlah_pcs: 72,
      jumlah_karton: 6,
      tanggal_masuk: "09-03-2023",
      tanggal_expired: "09-03-2024"
    }, {
      id_detail_barang: 7,
      id_barang: "BAR00006",
      jumlah_pcs: 36,
      jumlah_karton: 3,
      tanggal_masuk: "19-06-2023",
      tanggal_expired: "19-06-2024"
    }, {
      id_detail_barang: 8,
      id_barang: "BAR00007",
      jumlah_pcs: 216,
      jumlah_karton: 3,
      tanggal_masuk: "23-01-2023",
      tanggal_expired: "23-01-2024"
    }, {
      id_detail_barang: 9,
      id_barang: "BAR00008",
      jumlah_pcs: 120,
      jumlah_karton: 10,
      tanggal_masuk: "01-07-2023",
      tanggal_expired: "01-07-2024"
    }, {
      id_detail_barang: 10,
      id_barang: "BAR00009",
      jumlah_pcs: 720,
      jumlah_karton: 10,
      tanggal_masuk: "12-08-2023",
      tanggal_expired: "12-08-2024"
    }, {
      id_detail_barang: 11,
      id_barang: "BAR00010",
      jumlah_pcs: 1080,
      jumlah_karton: 15,
      tanggal_masuk: "24-09-2023",
      tanggal_expired: "24-09-2024"
    }, {
      id_detail_barang: 12,
      id_barang: "BAR00011",
      jumlah_pcs: 540,
      jumlah_karton: 15,
      tanggal_masuk: "24-09-2023",
      tanggal_expired: "24-09-2024"
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('detail_barang', null, {});

  }
};
