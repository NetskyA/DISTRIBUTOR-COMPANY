'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('master_toko', [{
      id_toko:1,
      id_kelurahan:"KLR00001",
      id_kota:"KTA00001",
      nama_toko:"TANI SUBUR",
      nama_konsumen:"NINGSIH",
      alamat_toko:"JL.MH.TAMRIN-AJUNG",
      no_handphone1:"043899384888",
      no_handphone2:"0920699527",
      tanggal_masuk:"10-01-2000",
      status_toko:1
    },{
      id_toko:2,
      id_kelurahan:"KLR00001",
      id_kota:"KTA00001",
      nama_toko:"AYUB JAYA",
      nama_konsumen:"AYUB",
      alamat_toko:"JL.ARGOPURO DS.KLOMPANGAN-AJUNG",
      no_handphone1:"0310847748",
      no_handphone2:"0226365680",
      tanggal_masuk:"12-11-2000",
      status_toko:1
    },{
      id_toko:3,
      id_kelurahan:"KLR00002",
      id_kota:"KTA00001",
      nama_toko:"SEMBAKO MURAH",
      nama_konsumen:"NININ",
      alamat_toko:"JL. BASUKI RAHMAD PS. PAKEM BAG. DALAM",
      no_handphone1:"02107512925",
      no_handphone2:"025485765807",
      tanggal_masuk:"09-12-2000",
      status_toko:1
    },{
      id_toko:4,
      id_kelurahan:"KLR00002",
      id_kota:"KTA00001",
      nama_toko:"SUMBER SEWU",
      nama_konsumen:"HADI",
      alamat_toko:"JL. BASUKI RAHMAT (DPN PS. PAKEM)",
      no_handphone1:"035800980242 ",
      no_handphone2:"0285601297",
      tanggal_masuk:"10-01-2001",
      status_toko:1
    },{
      id_toko:5,
      id_kelurahan:"KLR00003",
      id_kota:"KTA00001",
      nama_toko:"PAKEM JAYA",
      nama_konsumen:"BPK.MING",
      alamat_toko:"JL. BASUKI RAHMAD 320 GLADAK PAKEM",
      no_handphone1:"0873807989669",
      no_handphone2:"0822597851514",
      tanggal_masuk:"23-04-2001",
      status_toko:1
    },{
      id_toko:6,
      id_kelurahan:"KLR00003",
      id_kota:"KTA00001",
      nama_toko:"SINAR USAHA",
      nama_konsumen:"NISA",
      alamat_toko:"JL. ARGOPURO NO.5",
      no_handphone1:"04262916595",
      no_handphone2:"0895122285",
      tanggal_masuk:"13-09-2001",
      status_toko:1
    },{
      id_toko:7,
      id_kelurahan:"KLR00004",
      id_kota:"KTA00001",
      nama_toko:"BASAR JAYA",
      nama_konsumen:"IBU ASAR",
      alamat_toko:"JL.H.MU'THI SUMURAN KLOMPANGAN AJUNG",
      no_handphone1:"077195766184",
      no_handphone2:"0901632936",
      tanggal_masuk:"12-12-2002",
      status_toko:1
    },{
      id_toko:8,
      id_kelurahan:"KLR00004",
      id_kota:"KTA00001",
      nama_toko:"PODOMORO SNACK",
      nama_konsumen:"AKBAR AJUNG",
      alamat_toko:"JL.BASUKI RAHMAD NO.256 PAKEM(DEKAT LAMPU MERAH)",
      no_handphone1:"0650418312",
      no_handphone2:"04574072287",
      tanggal_masuk:"10-04-2003",
      status_toko:1
    },{
      id_toko:9,
      id_kelurahan:"KLR00005",
      id_kota:"KTA00001",
      nama_toko:"SUMBER KARUNIA",
      nama_konsumen:"RATNA",
      alamat_toko:"JL.SUMURAN-AJUNG(SEBELAH GUDANG TK.BARU)",
      no_handphone1:"054877799677",
      no_handphone2:"0856098256633",
      tanggal_masuk:"04-11-2003",
      status_toko:1
    },{
      id_toko:10,
      id_kelurahan:"KLR00005",
      id_kota:"KTA00001",
      nama_toko:"MBAH JOKO WR.KOPI",
      nama_konsumen:"JOKO",
      alamat_toko:"JL.MR WAHID NO.116",
      no_handphone1:"0869029528",
      no_handphone2:"06427465663",
      tanggal_masuk:"19-02-2004",
      status_toko:1
    },{
      id_toko:11,
      id_kelurahan:"KLR00006",
      id_kota:"KTA00001",
      nama_toko:"DWI SNACK",
      nama_konsumen:"DWI",
      alamat_toko:"JL.RENES,WIROWONGSO",
      no_handphone1:"05283359169",
      no_handphone2:"0886923280",
      tanggal_masuk:"10-12-2004",
      status_toko:1
    },{
      id_toko:12,
      id_kelurahan:"KLR00006",
      id_kota:"KTA00001",
      nama_toko:"SUSANTI SNACK",
      nama_konsumen:"SUSANTI",
      alamat_toko:"JL.CENDRAWASIH 21",
      no_handphone1:"08307419987",
      no_handphone2:"06133639413",
      tanggal_masuk:"29-07-2005",
      status_toko:1
    },{
      id_toko:13,
      id_kelurahan:"KLR00007",
      id_kota:"KTA00001",
      nama_toko:"BERKAH JAYA",
      nama_konsumen:"FERIS",
      alamat_toko:"JL.SEMERU,CURAH KATES,KLOMPANGAN",
      no_handphone1:"03632163302",
      no_handphone2:"053199471356",
      tanggal_masuk:"04-12-2005",
      status_toko:1
    },{
      id_toko:14,
      id_kelurahan:"KLR00007",
      id_kota:"KTA00001",
      nama_toko:"DENMART",
      nama_konsumen:"MUHAMAD SETYO BUDI",
      alamat_toko:"JL.KH MOCH IKSAN NO.16",
      no_handphone1:"07853906742",
      no_handphone2:"04283883172",
      tanggal_masuk:"19-02-2006",
      status_toko:1
    },{
      id_toko:15,
      id_kelurahan:"KLR00008",
      id_kota:"KTA00001",
      nama_toko:"LARISSO SWALAYAN & GROSIR",
      nama_konsumen:"JULAIHAH",
      alamat_toko:"JL. WATU ULO NO.21",
      no_handphone1:"04091038080",
      no_handphone2:"08204200514",
      tanggal_masuk:"14-04-2007",
      status_toko:1
    },{
      id_toko:16,
      id_kelurahan:"KLR00008",
      id_kota:"KTA00001",
      nama_toko:"SUMBER REJEKI",
      nama_konsumen:"ANISA",
      alamat_toko:"JL. KOTTA BLATER NO.52",
      no_handphone1:"043899384888",
      no_handphone2:"0920699527",
      tanggal_masuk:"12-07-2009",
      status_toko:1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('master_toko', null, {});
    
  }
};
