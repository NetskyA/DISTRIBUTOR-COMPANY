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
  let temp2 = JSON.parse(localStorage.loggedData);
  let data = await client.get("/api/barang");
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  return {data:data.data,targetSekarang:dataUser.data.target,
    currtarget:target.data.target};
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
  let dataUser = await client.post("/api/getOneUser",{
      id:temp2.id_user
  })
  let target = await client.post("/api/getTargetSekarang",{
    id:temp2.id_user
  })
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    atasan: atasan.data,
    foto: temp2.foto,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
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
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    atasan: atasan.data,
    foto: temp2.foto,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
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
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  let dataSales = {
    id_user: temp2.id_user,
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    foto: temp2.foto,
  };
  return { sales: dataSales, barang: barang, targetSekarang:dataUser.data.target,
    currtarget:target.data.target};
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
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  let dataSales = {
    nama: temp2.username,
    email: temp2.email,
    no_handphone: temp2.no_handphone,
    alamat: temp2.alamat,
    foto: temp2.foto,
  };
  return { sales: dataSales, post: getPost.data ,targetSekarang:dataUser.data.target,
    currtarget:target.data.target};
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
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  return { history: getHistory.data, sales: temp2,targetSekarang:dataUser.data.target,
    currtarget:target.data.target };
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
  let hasil;
  try {
    hasil = await client.post("/api/getDetail", {
      id: params.id,
      idSales: temp2.id_user,
    });
  } catch (error) {
    throw new Response("", { status: 403 });
  }
  let hasilQuery = hasil.data;
  console.log(hasilQuery);
  let dataDetail = mergeDetail(hasilQuery);
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  // let dataRetur = dataDetail.filter(e=>e.status!==0);
  // let dataDetailTransaksi = dataDetail.filter(e=>e.status===0);
  return {
    dataRetur: dataDetail,
    detailTransaksi: dataDetail,
    sales: temp2,
    transaksi: hasilQuery,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
  };
};

const mergeDetail = (hasilQuery) => {
  let dataDetail = [];
  for (let i = 0; i < hasilQuery.detail.length; i++) {
    let duplikat = false;

    let id_barang =
      hasilQuery.detailBarang[
        hasilQuery.detailBarang.findIndex(
          (e) => e.id_detail_barang === hasilQuery.detail[i].id_detail_barang
        )
      ].id_barang;

    let dataBarang =
      hasilQuery.barang[
        hasilQuery.barang.findIndex((e) => e.id_barang === id_barang)
      ];

    for (let j = 0; j < dataDetail.length; j++) {
      let idbarang1 =
        hasilQuery.detailBarang[hasilQuery.detail[i].id_detail_barang - 1];
      // console.log(idbarang1);
      let idbarang2 =
        hasilQuery.detailBarang[dataDetail[j].id_detail_barang - 1];
      // console.log(idbarang2);
      if (idbarang1.id_barang === idbarang2.id_barang) {
        duplikat = true;
        dataDetail[j].jumlah_barang_pcs +=
          hasilQuery.detail[i].jumlah_barang_pcs;
        dataDetail[j].jumlah_barang_karton +=
          hasilQuery.detail[i].jumlah_barang_karton;
        dataDetail[j].subtotal_barang += hasilQuery.detail[i].subtotal_barang;
        dataDetail[j].jumlah_retur_pcs += hasilQuery.detail[i].retur_pcs;
        dataDetail[j].jumlah_retur_karton += hasilQuery.detail[i].retur_karton;
        dataDetail[j].status =
          hasilQuery.detail[i].jenis_retur !== 0
            ? hasilQuery.detail[i].jenis_retur
            : 0;
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
        harga_pcs: dataBarang.harga_pcs,
        harga_karton: dataBarang.harga_karton,
        jumlah_retur_pcs: hasilQuery.detail[i].retur_pcs,
        jumlah_retur_karton: hasilQuery.detail[i].retur_karton,
        status: hasilQuery.detail[i].jenis_retur,
        tanggal_retur: hasilQuery.detail[i].tanggal_retur,
      });
    }
  }
  return dataDetail;
};

const getRetur = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Salesman") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let temp2 = JSON.parse(localStorage.loggedData);
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  return {user:temp2,targetSekarang:dataUser.data.target,
    currtarget:target.data.target};

};

const getJabatan = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData).jabatan;
  if (temp !== "Admin Gaji") {
    return redirect(`/${temp.replace(/\s/g, "")}`);
  }
  let dataJabatan = (await client.get("/api/listJabatan")).data;
  return dataJabatan;
};

const getLaporanHistoryGaji = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Gaji") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getHistoryGaji = await client.get(`/api/getHistoryGaji`);

  return {
    historyGaji: getHistoryGaji.data,
  };
};

const getDataKoor = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Koordinator Supervisor") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
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
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getSupervisor = await client.get(`/api/rawsupervisor/${temp.id_user}`);
  let getSalesman = await client.get(`/api/rawsalesman/${temp.id_user}`);
  let getTarget = await client.get(`/api/target`);

  return {
    supervisor: getSupervisor.data,
    salesman: getSalesman.data,
    target: getTarget.data,
  };
};

const getDataSupervisor = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  // return temp;

  if (temp.jabatan !== "Supervisor") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getSalesman = await client.get(
    `/api/getBawahanSupervisor?id_atasan=${temp.id_user}`
  );

  let getKelurahan = await client.get("/api/kelurahan");
  let getTarget = await client.get(`/api/target`);

  let dataUser = await client.post("/api/getOneUser",{
    id:temp.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp.id_user
})

  return {
    salesman: getSalesman.data,
    kelurahan: getKelurahan.data,
    target: getTarget.data,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
  };
};

const getSales = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Supervisor") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getSalesman = await client.get(
    `/api/getBawahanSupervisor?id_atasan=${temp.id_user}`
  );
  let getTarget = await client.get(`/api/target`);
  let getKelurahan = await client.get("/api/kelurahan");

  let tempTarget = [];
  for (let i = 0; i < getTarget.data.length; i++) {
    const t = getTarget.data[i];
    for (let j = 0; j < getSalesman.data.length; j++) {
      const s = getSalesman.data[j];
      if (t.id_user == s.id_user) {
        tempTarget.push({
          id_target: t.id_target,
          id_user: t.id_user,
          username: s.username,
          kelurahan:
            getKelurahan.data[
              getKelurahan.data.findIndex(
                (e) => e.id_kelurahan === t.id_wilayah
              )
            ].nama_kelurahan,
          target: t.target,
          tanggal_target: t.tanggal_target,
        });
      }
    }
  }
  let dataUser = await client.post("/api/getOneUser",{
    id:temp.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp.id_user
})
  return {
    salesman: getSalesman.data,
    target: tempTarget,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
  };
};

const getDataBarang = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getDetailBarang = await client.get(`/api/DetailBarang`);

  return {
    detailBarang: getDetailBarang.data,
  };
};

const getHeaderTransaksi = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getHeaderTransaksi = await client.get(`/api/getHeaderTransaksi`);

  return {
    headerTransaksi: getHeaderTransaksi.data,
  };
};

const getHistoryGaji = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getHistoryGaji = await client.get(`/api/getHistoryGaji`);

  return {
    historyGaji: getHistoryGaji.data,
  };
};

const getDataToko = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Salesman") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getKatalogToko = await client.get(`/api/getKatalogToko`);
  let temp2 = JSON.parse(localStorage.loggedData);
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
  return {
    katalogToko: getKatalogToko.data,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target
  };
};

const loadAtasan = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let supervisor = await client.get(`/api/listSupervisor`);

  let ksupervisor = await client.get(`/api/listKsupervisor`);

  return {
    supervisor: supervisor.data,
    ksupervisor: ksupervisor.data,
  };
};

const loadSemuaData = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let barang = await client.get(`/api/getListBarang`);

  let brand = await client.get(`/api/getListBrand`);

  let brands = await client.get(`/api/getListBrands`);

  let jabatan = await client.get(`/api/getListJabatan`);

  let kota = await client.get(`/api/getListKota`);

  let kelurahan = await client.get(`/api/getListKelurahan`);

  let toko = await client.get(`/api/toko`);

  let user = await client.get(`/api/user`);

  let dbarang = await client.get(`/api/getListDbarang`);

  let supervisor = await client.get(`/api/listSupervisor`);

  let ksupervisor = await client.get(`/api/listKsupervisor`);

  let tempDbarang = [];

  dbarang.data.map((d) => {
    const tempDate = d.tanggal_expired.split("-");
    let expired = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
    tempDbarang.push({
      id_detail_barang: d.id_detail_barang,
      id_barang: d.id_barang,
      jumlah_pcs: d.jumlah_pcs,
      jumlah_karton: d.jumlah_karton,
      tanggal_expired: expired,
    });
  });

  return {
    barang: barang.data,
    brand: brand.data,
    brands: brands.data,
    jabatan: jabatan.data,
    kota: kota.data,
    kelurahan: kelurahan.data,
    toko: toko.data,
    user: user.data,
    dbarang: tempDbarang,
    supervisor: supervisor.data,
    ksupervisor: ksupervisor.data,
  };
};

const loadDataVerifikasi = async () => {
  let kelurahan = await client.get(`/api/getListKelurahan`);
  let headerTransaksi = await client.get(`/api/headertransaksi`);
  let toko = await client.get(`/api/toko`);
  let user = await client.get(`/api/user`);

  return {
    kelurahan: kelurahan.data,
    headerTransaksi: headerTransaksi.data,
    toko: toko.data,
    user: user.data,
  };
};

const loadDataNota = async () => {
  let kelurahan = await client.get(`/api/getListKelurahan`);
  let headerTransaksi = await client.get(`/api/headertransaksi`);
  let toko = await client.get(`/api/toko`);

  return {
    kelurahan: kelurahan.data,
    headerTransaksi: headerTransaksi.data,
    toko: toko.data,
  };
};

const loadDataLaporan = async () => {
  let kelurahan = await client.get(`/api/getListKelurahan`);
  let headerTransaksi = await client.get(`/api/headertransaksi`);
  let toko = await client.get(`/api/toko`);
  let user = await client.get(`/api/user`);
  let target = await client.get(`/api/target`);
  return {
    kelurahan: kelurahan.data,
    headerTransaksi: headerTransaksi.data,
    toko: toko.data,
    user: user.data,
    target: target.data,
  };
};

const getKinerja = async () => {
  const kinerja = await client.get(`/api/kinerja`);
  return {
    kinerja: kinerja.data,
  };
};

const getLaporanTarget = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Admin Website") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getSupervisor = await client.get(`/api/listSupervisor`);
  let getSalesman = await client.get(`/api/listSalesman`);
  let getTarget = await client.get(`/api/target`);

  return {
    supervisor: getSupervisor.data,
    salesman: getSalesman.data,
    target: getTarget.data,
  };
};

const getDataTokoSupervisor = async () => {
  if (!localStorage.loggedData) {
    return redirect("/");
  }
  let temp = JSON.parse(localStorage.loggedData);
  if (temp.jabatan !== "Supervisor") {
    return redirect(`/${temp.jabatan.replace(/\s/g, "")}`);
  }

  let getKatalogToko = await client.get(`/api/getKatalogToko`);
  let temp2 = JSON.parse(localStorage.loggedData);
  let dataUser = await client.post("/api/getOneUser",{
    id:temp2.id_user
})
let target = await client.post("/api/getTargetSekarang",{
  id:temp2.id_user
})
let kelurahan = await client.get(`/api/getListKelurahan`);
  return {
    katalogToko: getKatalogToko.data,
    targetSekarang:dataUser.data.target,
    currtarget:target.data.target,
    kelurahan: kelurahan.data
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
  getRetur,
  mergeDetail,
  getJabatan,
  getLaporanHistoryGaji,
  getDataKoor,
  getSuperSales,
  getDataSupervisor,
  getSales,
  getDataBarang,
  getHeaderTransaksi,
  getHistoryGaji,
  getDataToko,
  loadAtasan,
  loadSemuaData,
  loadDataVerifikasi,
  getKinerja,
  loadDataNota,
  loadDataLaporan,
  getLaporanTarget,
  getDataTokoSupervisor
};
