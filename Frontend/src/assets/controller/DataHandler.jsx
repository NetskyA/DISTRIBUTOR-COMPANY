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
  getDataKoor,
  getSuperSales,
};
