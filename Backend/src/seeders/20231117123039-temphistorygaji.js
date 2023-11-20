'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('history_gaji', [{
      id_history_gaji:1,
      id_gaji:1,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:9000000,
      gaji_komisi:0
    },{
      id_history_gaji:2,
      id_gaji:2,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:9000000,
      gaji_komisi:0
    },{
      id_history_gaji:3,
      id_gaji:3,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:6000000,
      gaji_komisi:2000000
    },{
      id_history_gaji:4,
      id_gaji:4,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:6000000,
      gaji_komisi:1500000
    },{
      id_history_gaji:5,
      id_gaji:5,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:6000000,
      gaji_komisi:2050000
    },{
      id_history_gaji:6,
      id_gaji:6,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:6000000,
      gaji_komisi:1000000
    },{
      id_history_gaji:7,
      id_gaji:7,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:2000000
    },{
      id_history_gaji:8,
      id_gaji:8,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:2000000
    },{
      id_history_gaji:9,
      id_gaji:9,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_history_gaji:10,
      id_gaji:10,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:500000
    },{
      id_history_gaji:11,
      id_gaji:11,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_history_gaji:12,
      id_gaji:12,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:800000
    },{
      id_history_gaji:13,
      id_gaji:13,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_history_gaji:14,
      id_gaji:14,
      tanggal_gaji:"30-11-2023",
      gaji_pokok:3000000,
      gaji_komisi:1200000
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('history_gaji', null, {});
    
  }
};

