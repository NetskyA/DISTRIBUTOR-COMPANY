'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_jabatan', [{
      id_jabatan:1,
      nama_jabatan:"Salesman",
      status_jabatan:1
    },{
      id_jabatan:2,
      nama_jabatan:"Supervisor",
      status_jabatan:1
    },{
      id_jabatan:3,
      nama_jabatan:"Koordinator supervisor",
      status_jabatan:1
    },{
      id_jabatan:4,
      nama_jabatan:"Admin penjualan",
      status_jabatan:1
    },{
      id_jabatan:5,
      nama_jabatan:"Admin Gaji",
      status_jabatan:1
    },{
      id_jabatan:6,
      nama_jabatan:"Admin Website",
      status_jabatan:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_jabatan', null, {});
  }
};
