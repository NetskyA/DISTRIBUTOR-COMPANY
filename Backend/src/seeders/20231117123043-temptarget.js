'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_target', [{
      id_target:1,
      id_user:17,
      id_wilayah:"KLR00001",
      target:4000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:2,
      id_user:16,
      id_wilayah:"KLR00002",
      target:6000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:3,
      id_user:15,
      id_wilayah:"KLR00003",
      target:6000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:4,
      id_user:14,
      id_wilayah:"KLR00004",
      target:4000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:5,
      id_user:13,
      id_wilayah:"KLR00005",
      target:7000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:6,
      id_user:12,
      id_wilayah:"KLR00006",
      target:4000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:7,
      id_user:11,
      id_wilayah:"KLR00007",
      target:6000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:8,
      id_user:10,
      id_wilayah:"KLR00008",
      target:5000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:9,
      id_user:9,
      id_wilayah:"KTA00001",
      target:14000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:10,
      id_user:8,
      id_wilayah:"KTA00001",
      target:19000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:11,
      id_user:7,
      id_wilayah:"KTA00001",
      target:15000000,
      tanggal_target:"12-12-2023"
    },{
      id_target:12,
      id_user:6,
      id_wilayah:"KTA00001",
      target:12000000,
      tanggal_target:"12-12-2023"
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_target', null, {});
    
  }
};
