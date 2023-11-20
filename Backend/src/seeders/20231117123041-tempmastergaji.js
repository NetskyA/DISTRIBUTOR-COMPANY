'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_gaji', [{
      id_gaji:1,
      id_user:4,
      gaji_pokok:9000000,
      gaji_komisi:0
    },{
      id_gaji:2,
      id_user:5,
      gaji_pokok:9000000,
      gaji_komisi:0
    },{
      id_gaji:3,
      id_user:6,
      gaji_pokok:6000000,
      gaji_komisi:2000000
    },{
      id_gaji:4,
      id_user:7,
      gaji_pokok:6000000,
      gaji_komisi:1500000
    },{
      id_gaji:5,
      id_user:8,
      gaji_pokok:6000000,
      gaji_komisi:2050000
    },{
      id_gaji:6,
      id_user:9,
      gaji_pokok:6000000,
      gaji_komisi:1000000
    },{
      id_gaji:7,
      id_user:10,
      gaji_pokok:3000000,
      gaji_komisi:2000000
    },{
      id_gaji:8,
      id_user:11,
      gaji_pokok:3000000,
      gaji_komisi:2000000
    },{
      id_gaji:9,
      id_user:12,
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_gaji:10,
      id_user:13,
      gaji_pokok:3000000,
      gaji_komisi:500000
    },{
      id_gaji:11,
      id_user:14,
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_gaji:12,
      id_user:15,
      gaji_pokok:3000000,
      gaji_komisi:800000
    },{
      id_gaji:13,
      id_user:16,
      gaji_pokok:3000000,
      gaji_komisi:1000000
    },{
      id_gaji:14,
      id_user:17,
      gaji_pokok:3000000,
      gaji_komisi:1200000
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_gaji', null, {});
    
  }
};
