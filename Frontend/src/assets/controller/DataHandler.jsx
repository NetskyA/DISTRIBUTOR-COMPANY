import { redirect } from "react-router-dom";
import client from "./client";
const getDataCatalog = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let data = await client.get("/api/barang");
  return data.data;
};

const getDataProfileSalesman = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let atasan = await client.post("/api/atasan", {
    id_user: temp2.id_atasan,
  });
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    atasan: atasan.data,
    foto: temp2.foto,
  };
  return dataSales;
};

const getDataProfileSupervisor = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Supervisor") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let atasan = await client.post("/api/atasan", {
    id_user: temp2.id_atasan,
  });
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    atasan: atasan.data,
    foto: temp2.foto,
  };
  return dataSales;
};

const getDataProfileKoordinatorSupervisor = () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Koordinator Supervisor") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    foto: temp2.foto,
  };
  return dataSales;
};

const cekLogin = () => {
  if (localStorage.loggedData) {
    let temp = JSON.parse(localStorage.loggedData).jabatan;
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  return "null";
};

const cekOrder = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let data = await client.get("/api/barang");
  let barang = [];
  for (let i = 0; i < data.data.length; i++) {
    barang.push({
      id_barang: data.data[i].id_barang,
      nama_barang: data.data[i].nama_barang,
      stok_karton: data.data[i].stok_karton,
      stok_pcs: data.data[i].stok_pcs,
      harga_karton: data.data[i].harga_karton,
      harga_pcs: data.data[i].harga_pcs,
      qty_karton: 0,
      qty_pcs: 0,
    });
  }
  let dataSales = {
    id_user: temp2.id_user,
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    foto: temp2.foto,
  };
  return { sales: dataSales, barang: barang };
};

const cekPost = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let getPost = await client.post("/api/post", {
    sales: temp2.id_user,
  });
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    foto: temp2.foto,
  };
  return { sales: dataSales, post: getPost.data };
};

const cekHistory = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let getHistory = await client.post("/api/historySalesman", {
    sales: temp2.id_user,
  });
  console.log(getHistory.data);
  return { history: getHistory.data, sales: temp2 };
};

const cekDetailHistory = async (data) => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let { params } = data;
  let hasil = await client.post("/api/getDetail", {
    id: params.id,
  });
  let hasilQuery = hasil.data;
  console.log(hasilQuery)
  let dataDetail = [];
  for (let i = 0; i < hasilQuery.detail.length; i++) {
    let duplikat = false;

    let id_barang = (hasilQuery.detailBarang[hasilQuery.detailBarang.findIndex(e=>e.id_detail_barang===hasilQuery.detail[i].id_detail_barang)]).id_barang

    let dataBarang = hasilQuery.barang[hasilQuery.barang.findIndex(e=>e.id_barang===id_barang)]

    for (let j = 0; j < dataDetail.length; j++) {
      let idbarang1 =
       hasilQuery.detailBarang[hasilQuery.detail[i].id_detail_barang - 1];
      // console.log(idbarang1);
      let idbarang2 =
      hasilQuery.detailBarang[dataDetail[j].id_detail_barang - 1];
      // console.log(idbarang2);
      if (idbarang1.id_barang === idbarang2.id_barang) {
        duplikat = true;
        dataDetail[j].jumlah_barang_pcs += hasilQuery.detail[i].jumlah_barang_pcs;
        dataDetail[j].jumlah_barang_karton +=
        hasilQuery.detail[i].jumlah_barang_karton;
        dataDetail[j].subtotal_barang += hasilQuery.detail[i].subtotal_barang;
        dataDetail[j].jumlah_retur_pcs += hasilQuery.detail[i].retur_pcs;
        dataDetail[j].jumlah_retur_karton += hasilQuery.detail[i].retur_karton;
        dataDetail[j].status = (hasilQuery.detail[i].jenis_retur!==0)?hasilQuery.detail[i].jenis_retur:0
      }
    }
    if (!duplikat) {
      dataDetail.push({
        id_transaksi: hasilQuery.detail[i].id_transaksi,
        id_detail_barang: hasilQuery.detail[i].id_detail_barang,
        jumlah_barang_pcs: hasilQuery.detail[i].jumlah_barang_pcs,
        jumlah_barang_karton: hasilQuery.detail[i].jumlah_barang_karton,
        subtotal_barang: hasilQuery.detail[i].subtotal_barang,
        nama_barang: dataBarang.nama_barang,
        harga_pcs:dataBarang.harga_pcs,
        harga_karton:dataBarang.harga_karton,
        jumlah_retur_pcs:hasilQuery.detail[i].retur_pcs,
        jumlah_retur_karton:hasilQuery.detail[i].retur_karton,
        status:hasilQuery.detail[i].jenis_retur,
        tanggal_retur:hasilQuery.detail[i].tanggal_retur
      });
    }
  }
  // console.log(dataDetail)
  // let dataRetur = dataDetail.filter(e=>e.status!==0);
  // let dataDetailTransaksi = dataDetail.filter(e=>e.status===0);
  return { dataRetur:dataDetail,detailTransaksi:dataDetail , sales: temp2 ,transaksi:hasilQuery};
};

const getDataKoor = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Koordinator Supervisor") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }

  let getSupervisor = await client.get(
    `/api/supervisor?id_koor=${temp.id_user}`
  );

  let getKota = await client.get("/api/kota");

  return { supervisor: getSupervisor.data, kota: getKota.data };
};

const getSuperSales = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Koordinator Supervisor") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }

  let getSupervisor = await client.get(`/api/rawsupervisor`);
  let getSalesman = await client.get(`/api/rawsalesman`);
  let getTarget = await client.get(`/api/target`);

  return {
    supervisor: getSupervisor.data,
    salesman: getSalesman.data,
    target: getTarget.data,
  };
};

export default {
  getDataCatalog,
  getDataProfileSalesman,
  getDataProfileSupervisor,
  getDataProfileKoordinatorSupervisor,
  cekLogin,
  cekOrder,
  cekPost,
  cekHistory,
  cekDetailHistory,
  getDataKoor,
  getSuperSales,
};
