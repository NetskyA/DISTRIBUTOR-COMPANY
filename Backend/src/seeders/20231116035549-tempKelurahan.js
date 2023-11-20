'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_kelurahan', [{
      id_kelurahan:"KLR00001",
      id_kota:"KTA00001",
      nama_kelurahan:"Ngagel",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00002",
      id_kota:"KTA00001",
      nama_kelurahan:"Kutisari",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00003",
      id_kota:"KTA00001",
      nama_kelurahan:"Darmo",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00004",
      id_kota:"KTA00001",
      nama_kelurahan:"Kertajaya",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00005",
      id_kota:"KTA00001",
      nama_kelurahan:"Ketintang",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00006",
      id_kota:"KTA00001",
      nama_kelurahan:"Sier",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00007",
      id_kota:"KTA00001",
      nama_kelurahan:"G.Sari",
      status_kelurahan:1
    },{
      id_kelurahan:"KLR00008",
      id_kota:"KTA00001",
      nama_kelurahan:"MERR",
      status_kelurahan:1
    }]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_kelurahan', null, {});
  }
};
