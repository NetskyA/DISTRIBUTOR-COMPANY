'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_user', [{
      id_user:1,
      id_jabatan:6,
      id_atasan:0,
      email:"abdulahmad@gmail.com",
      username:"Abdul Ahmad",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0963151056",
      alamat:"No. 1, Jalan Kalisari Utara I",
      tanggal_masuk:"11-11-2011",
      foto:"1.png",
      target_sekarang:0,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:2,
      id_jabatan:5,
      id_atasan:0,
      email:"agungbuana@gmail.com",
      username:"Agung Buana",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0711551094",
      alamat:"Melodia Music Square, 12 - 14, Jalan Ngagel Jaya",
      tanggal_masuk:"10-12-2011",
      foto:"1.png",
      target_sekarang:0,
      absen_user:0,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:3,
      id_jabatan:4,
      id_atasan:0,
      email:"darmaanwar@gmail.com",
      username:"Darma Anwar",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0875034598 ",
      alamat:"Jalan Jenderal Achmad Yani Frontage Timur no 49",
      tanggal_masuk:"12-12-2012",
      foto:"1.png",
      target_sekarang:0,
      absen_user:3,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:4,
      id_jabatan:3,
      id_atasan:0,
      email:"mansurtirta@gmail.com",
      username:"Mansur Tirta",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0376061388 ",
      alamat:"No.435A, Jalan Perak Barat",
      tanggal_masuk:"01-01-2015",
      foto:"1.png",
      target_sekarang:0,
      absen_user:1,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:5,
      id_jabatan:3,
      id_atasan:0,
      email:"melatiarif@gmail.com",
      username:"Melati Arif",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"08380899313",
      alamat:"59, Jalan Golf Famili Barat II",
      tanggal_masuk:"21-11-2017",
      foto:"1.png",
      target_sekarang:0,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:6,
      id_jabatan:2,
      id_atasan:4,
      email:"ibrahimhasan@gmail.com",
      username:"Ibrahim Hasan",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"08906861506",
      alamat:"Jalan Ketintang no 156",
      tanggal_masuk:"11-04-2018",
      foto:"1.png",
      target_sekarang:18000000,
      absen_user:1,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:7,
      id_jabatan:2,
      id_atasan:4,
      email:"adityabudi@gmail.com",
      username:"Aditya Budi",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0881595201121",
      alamat:"Jalan Boulevard Famili Selatan no 183",
      tanggal_masuk:"01-06-2018",
      foto:"1.png",
      target_sekarang:25000000,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:8,
      id_jabatan:2,
      id_atasan:5,
      email:"jusufarif@gmail.com",
      username:"Jusuf Arif",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0837637329",
      alamat:"Jalan Bintang Graha Famili V no 39",
      tanggal_masuk:"21-09-2018",
      foto:"1.png",
      target_sekarang:40000000,
      absen_user:4,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:9,
      id_jabatan:2,
      id_atasan:5,
      email:"cahyataufik@gmail.com",
      username:"Cahya Taufik",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"07283307615",
      alamat:"Jalan Bali no 27",
      tanggal_masuk:"11-03-2019",
      foto:"1.png",
      target_sekarang:30000000,
      absen_user:1,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:10,
      id_jabatan:1,
      id_atasan:6,
      email:"firdauszakaria@gmail.com",
      username:"Firdaus Zakaria",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0891783001",
      alamat:"Nomor 139, Jalan Mayor Jenderal Sungkono",
      tanggal_masuk:"10-09-2019",
      foto:"1.png",
      target_sekarang:5000000,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:11,
      id_jabatan:1,
      id_atasan:6,
      email:"halimahfaisal@gmail.com",
      username:"Halimah Faisal",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0966177487",
      alamat:"No.29D, Jalan Raya Menur",
      tanggal_masuk:"11-12-2019",
      foto:"1.png",
      target_sekarang:5500000,
      absen_user:0,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:12,
      id_jabatan:1,
      id_atasan:7,
      email:"bimaahmad@gmail.com",
      username:"Bima Ahmad",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"09205328648",
      alamat:"Jalan Manyar Sabrangan IX no 39",
      tanggal_masuk:"18-04-2020",
      foto:"1.png",
      target_sekarang:4000000,
      absen_user:0,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:13,
      id_jabatan:1,
      id_atasan:7,
      email:"ediadi@gmail.com",
      username:"Edi Adi",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0734099970",
      alamat:"Jalan Berlian Lidah Kulon no 34",
      tanggal_masuk:"21-04-2021",
      foto:"1.png",
      target_sekarang:7000000,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:14,
      id_jabatan:1,
      id_atasan:8,
      email:"yudaimam@gmail.com",
      username:"Yuda Imam",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"08506448345",
      alamat:"Jalan Bintang Graha Famili I A no 1",
      tanggal_masuk:"01-05-2021",
      foto:"1.png",
      target_sekarang:4000000,
      absen_user:1,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:15,
      id_jabatan:1,
      id_atasan:8,
      email:"alialya@gmail.com",
      username:"Ali Alya",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0878695810759",
      alamat:"Jalan Raya Lontar no 403",
      tanggal_masuk:"11-05-2022",
      foto:"1.png",
      target_sekarang:6400000,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:16,
      id_jabatan:1,
      id_atasan:9,
      email:"rahmaumar@gmail.com",
      username:"Rahma Umar",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"041763186114",
      alamat:"Jalan Dharmawangsa VIII no 36",
      tanggal_masuk:"16-05-2023",
      foto:"1.png",
      target_sekarang:5600000,
      absen_user:2,
      no_rekening:"0123456789",
      status_user:1
    },{
      id_user:17,
      id_jabatan:1,
      id_atasan:9,
      email:"anwarputra@gmail.com",
      username:"Anwar Putra",
      password:bcrypt.hashSync("12345", 12),
      no_handphone:"0753634076",
      alamat:"Jalan Setail no 1",
      tanggal_masuk:"30-07-2023",
      foto:"1.png",
      target_sekarang:3400000,
      absen_user:0,
      no_rekening:"0123456789",
      status_user:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_user', null, {});
  }
};
