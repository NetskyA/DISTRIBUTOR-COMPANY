const express = require("express");
const app = express();
const { Sequelize, Op } = require("sequelize");
const { getDB } = require("./sequelize");
const conn = getDB();
const port = 3000;
const db = require("./src/models");
var cors = require("cors");
app.use(cors());
const initApp = async () => {
  console.log("Testing database connection");
  try {
    await conn.authenticate();
    console.log("Successfully connected!");
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  } catch (error) {
    console.error("Failure database connection : ", error.original);
  }
};
initApp();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(email);
  let data = await db.MasterUser.findOne({
    where: {
      email: email,
    },
  });
  if (!data) {
    return res.status(404).send("Email tidak terdaftar");
  }
  if (data.dataValues.password !== password) {
    return res.status(401).send("Password Salah");
  }
  let jabatan = await db.MasterJabatan.findOne({
    where: {
      id_jabatan: data.dataValues.id_jabatan,
    },
  });
  delete data.dataValues.id_jabatan;
  let datauser = {
    ...data.dataValues,
    jabatan: jabatan.dataValues.nama_jabatan,
  };
  return res.status(200).send({
    user: datauser,
    jabatan: jabatan.dataValues.nama_jabatan,
  });
});

app.get("/api/barang", async (req, res) => {
  let barang = await db.MasterBarang.findAll({
    attributes: ["id_barang", "nama_barang", "harga_pcs", "harga_karton"],
    where: {
      status_barang: 1,
    },
  });
  let dataReturn = [];

  for (let i = 0; i < barang.length; i++) {
    let jml = await db.DetailBarang.findAll({
      where: {
        id_barang: barang[i].dataValues.id_barang,
      },
    });
    let jmlPcs = 0;
    let jmlKarton = 0;
    for (let j = 0; j < jml.length; j++) {
      jmlPcs += jml[j].dataValues.jumlah_pcs;
      jmlKarton += jml[j].dataValues.jumlah_karton;
    }
    dataReturn.push({
      id_barang: barang[i].dataValues.id_barang,
      nama_barang: barang[i].dataValues.nama_barang,
      stok_karton: jmlKarton,
      stok_pcs: jmlPcs,
      harga_karton: barang[i].dataValues.harga_karton,
      harga_pcs: barang[i].dataValues.harga_pcs,
    });
  }
  return res.status(201).send(dataReturn);
});

app.post("/api/atasan", async (req, res) => {
  let { id_user } = req.body;
  let user = await db.MasterUser.findByPk(id_user);
  return res.status(200).send(user.dataValues.username);
});

app.post("/api/gettoko", async (req, res) => {
  let { nama } = req.body;
  let toko = await db.MasterToko.findOne({
    where: {
      nama_toko: nama,
    },
  });
  if (!toko) {
    return res.status(404).send("Halo");
  } else {
    return res.status(200).send(toko);
  }
});

app.post("/api/post", async (req, res) => {
  let { sales } = req.body;
  let tempHeader = await db.HeaderTransaksi.findAll({
    where: {
      [Op.and]: [{ id_user: sales }, { status_transaksi: 0 }],
    },
  });
  let header = [];
  let detail = [];
  for (let i = 0; i < tempHeader.length; i++) {
    let toko = await db.MasterToko.findOne({
      where: {
        id_toko: tempHeader[i].dataValues.id_toko,
      },
    });
    let kota = await db.MasterKota.findOne({
      where: {
        id_kota: toko.dataValues.id_kota,
      },
    });
    let kelurahan = await db.MasterKelurahan.findOne({
      where: {
        id_kelurahan: toko.dataValues.id_kelurahan,
      },
    });
    delete tempHeader[i].dataValues.id_toko;
    header.push({
      ...tempHeader[i].dataValues,
      nama_toko: toko.dataValues.nama_toko,
      kota: kota.dataValues.nama_kota,
      kelurahan: kelurahan.dataValues.nama_kelurahan,
    });
    let tempDetail = await db.DetailTransaksi.findAll({
      where: {
        id_transaksi: tempHeader[i].dataValues.id_transaksi,
      },
    });
    for (let j = 0; j < tempDetail.length; j++) {
      let tempdetailbarang = await db.DetailBarang.findOne({
        where: {
          id_detail_barang: tempDetail[j].dataValues.id_detail_barang,
        },
      });
      console.log(tempDetail[j].dataValues.id_barang);
      let barang = await db.MasterBarang.findOne({
        where: {
          id_barang: tempdetailbarang.dataValues.id_barang,
        },
      });
      delete tempDetail[j].dataValues.id_barang;
      detail.push({
        ...tempDetail[j].dataValues,
        nama_barang: barang.nama_barang,
      });
    }
  }
  let detailbarang = await db.DetailBarang.findAll({
    attributes: ["id_detail_barang", "id_barang"],
  });
  return res.status(200).send({
    headerTransaksi: header,
    detailTransaksi: detail,
    listbarang: detailbarang,
  });
});

app.post("/api/order", async (req, res) => {
  let { toko, user, barang, tanggal, status, total } = req.body;
  await db.HeaderTransaksi.create({
    id_toko: toko.id_toko,
    id_user: user.id_user,
    tanggal_transaksi: tanggal,
    subtotal: total,
    jenis_transaksi: status,
    status_transaksi: 0,
  });
  let data = await db.HeaderTransaksi.findAll({
    limit: 1,
    order: [["id_transaksi", "DESC"]],
  });
  for (let i = 0; i < barang.length; i++) {
    let jml = await db.DetailBarang.findAll({
      where: {
        id_barang: barang[i].id_barang,
      },
    });
    let stop1 = false;
    let stop2 = false;
    console.log(barang[i].qty_pcs);
    console.log(jml.length);
    for (let j = 0; j < jml.length; j++) {
      console.log(barang[i].qty_pcs);
      if (
        !stop1 &&
        parseInt(barang[i].qty_pcs) !== 0 &&
        jml[j].dataValues.jumlah_pcs >= parseInt(barang[i].qty_pcs)
      ) {
        stop1 = true;
        console.log("masuk1");
        let jmlpcs = jml[j].dataValues.jumlah_pcs - parseInt(barang[i].qty_pcs);
        let totalharga = barang[i].qty_pcs * barang[i].harga_pcs;
        await db.DetailBarang.update(
          {
            jumlah_pcs: jmlpcs,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        await db.DetailTransaksi.create({
          id_transaksi: data[0].id_transaksi,
          id_detail_barang: jml[j].dataValues.id_detail_barang,
          jumlah_barang_pcs: barang[i].qty_pcs,
          jumlah_barang_karton: 0,
          subtotal_barang: totalharga,
          retur: 0,
        });
      }
      if (
        !stop1 &&
        parseInt(barang[i].qty_pcs) !== 0 &&
        jml[j].dataValues.jumlah_pcs !== 0 &&
        jml[j].dataValues.jumlah_pcs <= parseInt(barang[i].qty_pcs)
      ) {
        console.log("masuk2");
        await db.DetailBarang.update(
          {
            jumlah_pcs: 0,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        console.log(parseInt(barang[i].qty_pcs) - jml[j].dataValues.jumlah_pcs);
        let totalharga =
          jml[j].dataValues.jumlah_pcs * parseInt(barang[i].harga_pcs);
        await db.DetailTransaksi.create({
          id_transaksi: data[0].id_transaksi,
          id_detail_barang: jml[j].dataValues.id_detail_barang,
          jumlah_barang_pcs: jml[j].dataValues.jumlah_pcs,
          jumlah_barang_karton: 0,
          subtotal_barang: totalharga,
          retur: 0,
        });
        barang[i].qty_pcs =
          parseInt(barang[i].qty_pcs) - jml[j].dataValues.jumlah_pcs;
      }
      if (
        !stop2 &&
        parseInt(barang[i].qty_karton) !== 0 &&
        jml[j].dataValues.jumlah_karton >= parseInt(barang[i].qty_karton)
      ) {
        stop2 = true;
        let jmlkrtn =
          jml[j].dataValues.jumlah_karton - parseInt(barang[i].qty_karton);
        let totalbarang = barang[i].qty_karton * barang[i].harga_karton;
        await db.DetailBarang.update(
          {
            jumlah_karton: jmlkrtn,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        await db.DetailTransaksi.create({
          id_transaksi: data[0].id_transaksi,
          id_detail_barang: jml[j].dataValues.id_detail_barang,
          jumlah_barang_pcs: 0,
          jumlah_barang_karton: barang[i].qty_karton,
          subtotal_barang: totalbarang,
          retur: 0,
        });
      }
      if (
        !stop2 &&
        jml[j].dataValues.jumlah_karton !== 0 &&
        parseInt(barang[i].qty_karton) !== 0 &&
        jml[j].dataValues.jumlah_karton <= parseInt(barang[i].qty_karton)
      ) {
        await db.DetailBarang.update(
          {
            jumlah_karton: 0,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        let totalharga =
          jml[j].dataValues.jumlah_karton * parseInt(barang[i].harga_karton);
        await db.DetailTransaksi.create({
          id_transaksi: data[0].id_transaksi,
          id_detail_barang: jml[j].dataValues.id_detail_barang,
          jumlah_barang_pcs: 0,
          jumlah_barang_karton: jml[j].dataValues.jumlah_karton,
          subtotal_barang: totalharga,
          retur: 0,
        });
        barang[i].qty_karton =
          parseInt(barang[i].qty_karton) - jml[j].dataValues.jumlah_karton;
      }
      if (stop1 || stop2) {
        break;
      }
    }
  }
  return res.status(200).send({ id: data[0].dataValues.id_transaksi });
});

// Get Supervisors
app.get("/api/supervisor", async (req, res) => {
  let { id_koor } = req.query;

  let supervisors = [];

  if (!id_koor) {
    supervisors = await db.MasterUser.findAll({
      attributes: ["id_user", "username", "target_sekarang", "status_user"],
      where: {
        status_user: 1,
        id_jabatan: 2,
      },
    });
  } else {
    supervisors = await db.MasterUser.findAll({
      attributes: ["id_user", "username", "target_sekarang", "status_user"],
      where: {
        status_user: 1,
        id_jabatan: 2,
        id_atasan: id_koor,
      },
    });
  }

  let targets = await db.MasterTarget.findAll({
    attributes: [
      "id_target",
      "id_user",
      "id_wilayah",
      "target",
      "tanggal_target",
    ],
    order: [["id_target", "desc"]],
  });

  let result = [];

  supervisors.forEach((s) => {
    const tempTarget = targets.find((e) => e.id_user == s.id_user);
    const supervisorTarget = tempTarget.dataValues;

    const newData = {
      id_user: s.id_user,
      id_target: supervisorTarget.id_target,
      id_wilayah: supervisorTarget.id_wilayah,
      username: s.username,
      targetTerakhir: supervisorTarget.target,
      realisasiTarget: s.target_sekarang,
      tanggal_target: supervisorTarget.tanggal_target,
    };

    result.push(newData);
  });

  return res.status(200).send(result);
});

app.get("/api/rawsupervisor", async (req, res) => {
  const result = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "target_sekarang", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 2,
    },
  });

  return res.status(200).send(result);
});

// Get Wilayah Kota
app.get("/api/kota", async (req, res) => {
  let result = await db.MasterKota.findAll();
  return res.status(200).send(result);
});

// Get Target
app.get("/api/target", async (req, res) => {
  const targets = await db.MasterTarget.findAll();

  return res.status(200).send(targets);
});

// Put Target
app.post("/api/target", async (req, res) => {
  let { id_user, id_wilayah, target } = req.body;

  const targets = await db.MasterTarget.findAll({
    order: [["id_target", "desc"]],
    limit: 1,
  });
  const lastTarget = targets[0];

  const newId = lastTarget.id_target + 1;

  const now = new Date();
  const tanggal = now.getDate();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();
  const formattedDate = `${tanggal}-${bulan}-${tahun}`;

  let result = await db.MasterTarget.create({
    id_target: newId,
    id_user: id_user,
    id_wilayah: id_wilayah,
    target: target,
    tanggal_target: formattedDate,
  });

  return res.status(201).send(result);
});

// Get Salesman
app.get("/api/salesman", async (req, res) => {
  let salesmans = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "target_sekarang", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 1,
    },
  });

  let targets = await db.MasterTarget.findAll({
    attributes: [
      "id_target",
      "id_user",
      "id_wilayah",
      "target",
      "tanggal_target",
    ],
    order: [["id_target", "desc"]],
  });

  let result = [];

  salesmans.forEach((s) => {
    const tempTarget = targets.find((e) => e.id_user == s.id_user);
    const salesmanTarget = tempTarget.dataValues;

    const newData = {
      id_user: s.id_user,
      id_target: salesmanTarget.id_target,
      username: s.username,
      targetTerakhir: salesmanTarget.target,
      realisasiTarget: s.target_sekarang,
      tanggal_target: salesmanTarget.tanggal_target,
    };

    result.push(newData);
  });

  return res.status(200).send(result);
});

app.get("/api/rawsalesman", async (req, res) => {
  const result = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "target_sekarang", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 1,
    },
  });

  return res.status(200).send(result);
});
