const express = require("express");
const app = express();
const { Sequelize, Op } = require("sequelize");
const { getDB } = require("./sequelize");
const conn = getDB();
const port = 3000;
const db = require("./src/models");
const axios = require("axios");
var cors = require("cors");
const multer = require("multer");
const fs = require("fs");
app.use("/uploads", express.static("uploads"));
const upload = multer({ dest: "./uploads" });
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

//========================== DAFTAR ENDPOINT [CRTL F] ======================//
// POST LOGIN => LINE 97
// POST ATASAN => LINE 162
// POST KERANJANG SALESMAN => LINE 183
// POST RETUR => LINE 250
// POST ORDER => LINE 488
// POST UPDATE KERANJANG SALESMAN => LINE 625
// POST HISTORY SALESMAN => LINE 681
// POST DETAIL TRANSAKSI => LINE  705
// POST UPDATE KOMISI => LINE 741
// POST KIRIM GAJI => LINE 759
// POST TARGET => LINE 976
// POST REGISTER USER => LINE 1323
// POST TAMBAH BARANG => LINE 1449
// GET BARANG => LINE 128
// GET TOKO => LINE 168
// GET LIST JABATAN => LINE 805
// GET HISTORY GAJI => LINE 818
// GET DATA GAJI BY JABATAN => LINE 823
// GET DATA SUPERVISOR => LINE 889
// GET DATA RAW SUPERVISOR  => LINE 947
// GET WILAYAH TOKO => LINE 963
// GET ALL TARGET => LINE 969
// GET SALESMAN => LINE 1005
// GET DATA RAW SALESMAN  => LINE 1047
// GET DATA KELURAHAN => LINE 1089
// GET DATA BAWAHAN SUPERVISOR => LINE 1095
// GET DATA DETAIL BARANG => LINE 1148
// GET HISTORY GAJI => LINE 1181
// GET DATA HISTORY GAJI => LINE 1226
// GET DATA KATALOG => LINE 1264
// GET DATA LIST SUPERVISOR => LINE 1301
// GET DATA K. SUEPERVISOR => LINE 1312
// GET ALL USER => LINE 1362
// GET DATA LIST BARANG => LINE 1406
// GET DATA LIST BARANG KEYWORD => LINE 1413
// GET DATA LIST BRAND AKTIF=> LINE 1438
// GET EDIT BARANG => LINE 1485
// PUT EDIT STATUS BARANG => LINE 1469
// GET DATA LIST BRAND => LINE 1556
// POST TAMBAH BRAND  => LINE 1562
// PUT EDIT STATUS BRAND => LINE 1584
// GET DATA LIST BRAND KEYWORD => LINE 1603
// PUT EDIT BRAND => LINE 1627
// GET DATA LIST JABATAN
// POST TAMBAH JABATAN
// PUT EDIT STATUS JABATAN
// GET DATA LIST JABATAN KEYWORD
// PUT EDIT JABATAN
// GET ALL HEADER TRANSAKSI
// GET ALL TOKO
// GET LAPORAN KINERJA
// GET ALL DETAIL BARANG
// GET ALL DETAIL TRANSAKSI
// GET DATA DETAIL BARANG BY ID

//========================== KIRIM GAJI ==========================//
const sendGaji = async (subtotal, email, date, username) => {
  const result = Math.random().toString(36).substring(2, 10);
  const options = {
    method: "POST",
    url: "https://api.xendit.co/v2/payouts",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Basic eG5kX2RldmVsb3BtZW50X2J4bmhUOFVZdFFEcEVGMzczZjByamV6THc2ZnNzZTRnYkQwSlZUOGtrTmxSbTZEN1dmc0tzdEhHQVhqMUp1ZDk6",
      "Idempotency-key": `${result}`,
    },
    data: {
      reference_id: "sample-successful-create-idr-payout",
      channel_code: "ID_BCA",
      channel_properties: {
        account_holder_name: `${username}`,
        account_number: "1214780935",
      },
      amount: parseInt(subtotal),
      description: `Gaji pada tanggal ${date}`,
      currency: "IDR",
      receipt_notification: {
        email_to: [`${email}`],
        email_cc: ["alvinbwiyono@gmail.com"],
      },
    },
  };
  let temp = await axios.request(options);
};

//========================== POST LOGIN ==========================//
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
  let targets = await db.MasterTarget.findOne({
    where: {
      id_user: data.dataValues.id_user,
    },
    order: [["id_target", "desc"]],
  });
  let target = 0;
  if (targets) {
    target = targets.dataValues.target;
  } else {
    target = 0;
  }
  console.log(target);
  delete data.dataValues.id_jabatan;
  let datauser = {
    ...data.dataValues,
    jabatan: jabatan.dataValues.nama_jabatan,
    target: target,
  };
  return res.status(200).send({
    user: datauser,
    jabatan: jabatan.dataValues.nama_jabatan,
  });
});

//========================== GET BARANG ==========================//
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

//========================== POST ATASAN ==========================//
app.post("/api/atasan", async (req, res) => {
  let { id_user } = req.body;
  let user = await db.MasterUser.findByPk(id_user);
  return res.status(200).send(user.dataValues.username);
});

//========================== GET TOKO ==========================//
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

//========================== POST KERANJANG SALESMAN ==========================//
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

//========================== POST RETUR ==========================//
app.post("/api/retur", async (req, res) => {
  let { data } = req.body;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let rawDetailTrans = await db.DetailTransaksi.findAll({
      where: {
        id_transaksi: data[i].id_transaksi,
      },
    });
    let detailTrans = [];
    for (let j = 0; j < rawDetailTrans.length; j++) {
      let detailBarang = await db.DetailBarang.findAll({
        where: {
          id_barang: data[i].id_barang,
        },
      });
      for (let k = 0; k < detailBarang.length; k++) {
        if (
          rawDetailTrans[j].dataValues.id_detail_barang ===
          detailBarang[k].dataValues.id_detail_barang
        ) {
          detailTrans.push({ ...rawDetailTrans[j].dataValues });
        }
      }
    }
    if (data[i].status == 2) {
      let jmlPcs = data[i].jumlah_retur_pcs;
      let jmlKarton = data[i].jumlah_retur_karton;
      let uang = 0;
      let stop1 = false;
      let stop2 = false;
      for (let j = 0; j < detailTrans.length; j++) {
        let tempjmlpcs = 0;
        let tempjmlkarton = 0;
        if (jmlPcs !== 0 && detailTrans[j].jumlah_barang_pcs >= jmlPcs) {
          tempjmlpcs += jmlPcs;
          uang += jmlPcs * data[i].harga_pcs;
          jmlPcs = 0;
        }
        if (
          jmlPcs !== 0 &&
          detailTrans[j].jumlah_barang_pcs !== 0 &&
          detailTrans[j].jumlah_barang_pcs <= jmlPcs
        ) {
          tempjmlpcs += detailTrans[j].jumlah_barang_pcs;
          uang += detailTrans[j].jumlah_barang_pcs * data[i].harga_pcs;
          jmlPcs -= detailTrans[j].jumlah_barang_pcs;
        }
        if (
          jmlKarton !== 0 &&
          detailTrans[j].jumlah_barang_karton >= jmlKarton
        ) {
          tempjmlkarton += jmlKarton;
          uang += jmlKarton * data[i].harga_karton;
          jmlKarton = 0;
        }
        if (
          jmlKarton !== 0 &&
          detailTrans[j].jumlah_barang_karton !== 0 &&
          detailTrans[j].jumlah_barang_karton <= jmlKarton
        ) {
          tempjmlkarton += detailTrans[j].jumlah_barang_karton;
          uang += detailTrans[j].jumlah_barang_karton * data[i].harga_karton;
          jmlKarton -= detailTrans[j].jumlah_barang_karton;
        }
        if (jmlPcs == 0) {
          stop2 = true;
        }
        if (jmlKarton == 0) {
          stop1 = true;
        }
        await db.DetailTransaksi.update(
          {
            retur_pcs: tempjmlpcs,
            retur_karton: tempjmlkarton,
            tanggal_retur: data[i].tanggal_retur,
            jenis_retur: data[i].status,
          },
          {
            where: {
              [Op.and]: [
                { id_detail_barang: detailTrans[j].id_detail_barang },
                { id_transaksi: detailTrans[j].id_transaksi },
              ],
            },
          }
        );
        if (stop1 && stop2) {
          break;
        }
      }
      console.log(uang);
      let jmlUangSekarang = await db.MasterKeuangan.findOne({
        order: [["id_keuangan", "DESC"]],
      });
      let jmlUangUpdate = jmlUangSekarang.dataValues.jumlah_uang - uang;
      await db.MasterKeuangan.create({
        jumlah_uang: jmlUangUpdate,
        uang_masuk: 0,
        uang_keluar: uang,
        tanggal_perpindahan: data[i].tanggal_retur,
      });
    } else {
      let detailBarang = await db.DetailBarang.findAll({
        where: {
          id_barang: data[i].id_barang,
        },
      });
      let jmlPcs = data[i].jumlah_retur_pcs;
      let jmlKarton = data[i].jumlah_retur_karton;
      let stop1 = false;
      let stop2 = false;
      for (let j = 0; j < detailTrans.length; j++) {
        let jmlPcsDetail = 0;
        let jmlKartonDetail = 0;
        if (jmlPcs < detailTrans[j].jumlah_barang_pcs) {
          jmlPcsDetail = jmlPcs;
          jmlPcs = 0;
        } else {
          jmlPcsDetail = detailTrans[j].jumlah_barang_pcs;
          jmlPcs -= detailTrans[j].jumlah_barang_pcs;
        }
        if (jmlKarton < detailTrans[j].jumlah_barang_karton) {
          jmlKartonDetail = jmlKarton;
          jmlKarton = 0;
        } else {
          jmlKartonDetail = detailTrans[j].jumlah_barang_karton;
          jmlKarton -= detailTrans[j].jumlah_barang_karton;
        }
        console.log(jmlPcsDetail);
        let jmlUpdatePcs = 0;
        let jmlUpdateKarton = 0;
        for (let k = 0; k < detailBarang.length; k++) {
          if (
            jmlPcsDetail !== 0 &&
            detailBarang[k].dataValues.jumlah_pcs >= jmlPcsDetail
          ) {
            jmlUpdatePcs += jmlPcsDetail;
            let updatedatabase =
              detailBarang[j].dataValues.jumlah_pcs - jmlPcsDetail;
            await db.DetailBarang.update(
              {
                jumlah_pcs: updatedatabase,
              },
              {
                where: {
                  id_detail_barang: detailBarang[j].dataValues.id_detail_barang,
                },
              }
            );
            jmlPcsDetail = 0;
          }
          if (
            jmlKartonDetail !== 0 &&
            detailBarang[k].dataValues.jumlah_karton >= jmlKartonDetail
          ) {
            jmlUpdateKarton += jmlKartonDetail;
            let updatedatabase =
              detailBarang[j].dataValues.jumlah_karton - jmlKartonDetail;
            await db.DetailBarang.update(
              {
                jumlah_karton: updatedatabase,
              },
              {
                where: {
                  id_detail_barang: detailBarang[j].dataValues.id_detail_barang,
                },
              }
            );
            jmlKartonDetail = 0;
          }
          if (
            jmlPcsDetail !== 0 &&
            detailBarang[j].dataValues.jumlah_pcs !== 0 &&
            detailBarang[j].dataValues.jumlah_pcs <= jmlPcsDetail
          ) {
            await db.DetailBarang.update(
              {
                jumlah_pcs: 0,
              },
              {
                where: {
                  id_detail_barang: detailBarang[j].dataValues.id_detail_barang,
                },
              }
            );
            jmlUpdatePcs += detailBarang[j].dataValues.jumlah_pcs;
            jmlPcsDetail -= detailBarang[j].dataValues.jumlah_pcs;
          }
          if (
            jmlKartonDetail !== 0 &&
            detailBarang[j].dataValues.jumlah_karton !== 0 &&
            detailBarang[j].dataValues.jumlah_karton <= jmlKartonDetail
          ) {
            await db.DetailBarang.update(
              {
                jumlah_karton: 0,
              },
              {
                where: {
                  id_detail_barang: detailBarang[j].dataValues.id_detail_barang,
                },
              }
            );
            jmlUpdateKarton += detailBarang[j].dataValues.jumlah_karton;
            jmlKartonDetail -= detailBarang[j].dataValues.jumlah_karton;
          }
          if (jmlKartonDetail == 0 && jmlPcsDetail == 0) {
            break;
          }
        }
        console.log(jmlUpdatePcs);
        await db.DetailTransaksi.update(
          {
            retur_pcs: jmlUpdatePcs,
            retur_karton: jmlUpdateKarton,
            tanggal_retur: data[i].tanggal_retur,
            jenis_retur: data[i].status,
          },
          {
            where: {
              [Op.and]: [
                { id_detail_barang: detailTrans[j].id_detail_barang },
                { id_transaksi: detailTrans[j].id_transaksi },
              ],
            },
          }
        );
        if (jmlPcs == 0 && jmlKarton == 0) {
          break;
        }
      }
    }
  }
  return res.status(200).send("Yay");
});

//========================== POST ORDER ==========================//
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
      let jmlpcs = 0;
      let jmlkrtn = 0;
      let totalbarangkarton = 0;
      let totalbarangpcs = 0;
      if (
        parseInt(barang[i].qty_pcs) !== 0 &&
        jml[j].dataValues.jumlah_pcs >= parseInt(barang[i].qty_pcs)
      ) {
        jmlpcs += parseInt(barang[i].qty_pcs);
        let updatedatabase =
          jml[j].dataValues.jumlah_pcs - parseInt(barang[i].qty_pcs);
        totalbarangpcs += barang[i].qty_pcs * barang[i].harga_pcs;
        await db.DetailBarang.update(
          {
            jumlah_pcs: updatedatabase,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        barang[i].qty_pcs = 0;
      }
      if (
        parseInt(barang[i].qty_karton) !== 0 &&
        jml[j].dataValues.jumlah_karton >= parseInt(barang[i].qty_karton)
      ) {
        jmlkrtn += parseInt(barang[i].qty_karton);
        let updatedatabase =
          jml[j].dataValues.jumlah_karton - parseInt(barang[i].qty_karton);
        totalbarangkarton += barang[i].qty_karton * barang[i].harga_karton;
        await db.DetailBarang.update(
          {
            jumlah_karton: updatedatabase,
          },
          {
            where: {
              id_detail_barang: jml[j].dataValues.id_detail_barang,
            },
          }
        );
        barang[i].qty_karton = 0;
      }
      if (
        parseInt(barang[i].qty_pcs) !== 0 &&
        jml[j].dataValues.jumlah_pcs !== 0 &&
        jml[j].dataValues.jumlah_pcs <= parseInt(barang[i].qty_pcs)
      ) {
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
        jmlpcs += jml[j].dataValues.jumlah_pcs;
        totalbarangpcs +=
          jml[j].dataValues.jumlah_pcs * parseInt(barang[i].harga_pcs);
        barang[i].qty_pcs =
          parseInt(barang[i].qty_pcs) - jml[j].dataValues.jumlah_pcs;
      }
      if (
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
        jmlkrtn += jml[j].dataValues.jumlah_karton;
        totalbarangkarton +=
          jml[j].dataValues.jumlah_karton * parseInt(barang[i].harga_karton);
        barang[i].qty_karton =
          parseInt(barang[i].qty_karton) - jml[j].dataValues.jumlah_karton;
      }
      if (barang[i].qty_karton == 0) {
        stop2 = true;
      }
      if (barang[i].qty_pcs == 0) {
        stop1 = true;
      }
      await db.DetailTransaksi.create({
        id_transaksi: data[0].id_transaksi,
        id_detail_barang: jml[j].dataValues.id_detail_barang,
        jumlah_barang_pcs: jmlpcs,
        jumlah_barang_karton: jmlkrtn,
        subtotal_barang: totalbarangkarton + totalbarangpcs,
        retur_pcs: 0,
        retur_karton: 0,
        tanggal_retur: "-",
        jenis_retur: 0,
      });
      if (stop1 && stop2) {
        break;
      }
    }
  }
  return res.status(200).send({ id: data[0].dataValues.id_transaksi });
});

//========================== POST UPDATE KERANJANG SALESMAN ==========================//
app.post("/api/updatePost", async (req, res) => {
  let { cmd, id } = req.body;
  console.log(cmd);
  console.log(id);
  if (cmd === "Send") {
    for (let i = 0; i < id.length; i++) {
      await db.HeaderTransaksi.update(
        {
          status_transaksi: 1,
        },
        {
          where: {
            id_transaksi: id[i],
          },
        }
      );
    }
  } else {
    await db.HeaderTransaksi.update(
      {
        status_transaksi: -1,
      },
      {
        where: {
          id_transaksi: id[0],
        },
      }
    );
    let detail = await db.DetailTransaksi.findAll({
      where: {
        id_transaksi: id[0],
      },
    });
    for (let i = 0; i < detail.length; i++) {
      await db.DetailBarang.update(
        {
          jumlah_pcs: Sequelize.literal(
            `jumlah_pcs + ${detail[i].dataValues.jumlah_barang_pcs}`
          ),
          jumlah_karton: Sequelize.literal(
            `jumlah_karton + ${detail[i].dataValues.jumlah_barang_karton}`
          ),
        },
        {
          where: {
            id_detail_barang: detail[i].dataValues.id_detail_barang,
          },
        }
      );
    }
  }
  return res.status(200).send("Success");
});

//========================== POST HISTORY SALESMAN ==========================//
app.post("/api/historySalesman", async (req, res) => {
  let { sales } = req.body;
  let tempHeader = await db.HeaderTransaksi.findAll({
    where: {
      [Op.and]: [{ id_user: sales }, { status_transaksi: 2 }],
    },
  });
  let header = [];
  for (let i = 0; i < tempHeader.length; i++) {
    let toko = await db.MasterToko.findOne({
      where: {
        id_toko: tempHeader[i].dataValues.id_toko,
      },
    });
    delete tempHeader[i].dataValues.id_toko;
    header.push({
      ...tempHeader[i].dataValues,
      nama_toko: toko.dataValues.nama_toko,
      nama_konsumen: toko.dataValues.nama_konsumen,
    });
  }
  return res.status(200).send(header);
});

//========================== POST DETAIL TRANSAKSI ==========================//
app.post("/api/getDetail", async (req, res) => {
  let { id, idSales } = req.body;
  console.log(idSales);
  let headerTransaksi = await db.HeaderTransaksi.findOne({
    where: {
      id_transaksi: id,
      id_user: idSales,
    },
  });
  if (!headerTransaksi) return res.status(404).send("Tidak Ketemu");
  let toko = await db.MasterToko.findOne({
    where: {
      id_toko: headerTransaksi.dataValues.id_toko,
    },
  });
  let detailTransaksi = await db.DetailTransaksi.findAll({
    where: {
      id_transaksi: id,
    },
  });
  let barang = await db.MasterBarang.findAll({
    where: {
      status_barang: 1,
    },
  });
  let detailBarang = await db.DetailBarang.findAll();
  return res.status(200).send({
    header: headerTransaksi.dataValues,
    detail: detailTransaksi,
    toko: toko,
    barang: barang,
    detailBarang: detailBarang,
  });
});

//========================== POST UPDATE KOMISI ==========================//
app.post("/api/updateKomisi", async (req, res) => {
  let { update } = req.body;
  for (let i = 0; i < update.length; i++) {
    await db.MasterGaji.update(
      {
        gaji_komisi: parseInt(update[i].komisi_update),
      },
      {
        where: {
          id_gaji: update[i].id_gaji,
        },
      }
    );
  }
  return res.status(200).send("Success");
});

//========================== POST KIRIM GAJI ==========================//
app.post("/api/kirimGaji", async (req, res) => {
  let { listUser } = req.body;
  const now = new Date();
  const date =
    now.getDate().toString().padStart(2, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getFullYear().toString().padStart(4, "0");
  for (let i = 0; i < listUser.length; i++) {
    listUser[i].gaji_komisi += 10 - (listUser[i].gaji_komisi % 10);

    if (listUser[i].target_sekarang < listUser[i].target) {
      listUser[i].gaji_komisi -= 5;
    }
    await db.MasterUser.update(
      {
        absen_user: 0,
        target_sekarang: 0,
      },
      {
        where: {
          id_user: listUser[i].id_user,
        },
      }
    );

    await db.HistoryGaji.create({
      id_gaji: listUser[i].id_gaji,
      tanggal_gaji: date,
      gaji_pokok:
        parseInt(listUser[i].gaji_pokok) - parseInt(listUser[i].potongan),
      gaji_komisi: listUser[i].gaji_komisi,
    });

    // let idHistory = (await db.HistoryGaji.findOne({
    //   order:[["id_history_gaji", "desc"]]
    // })).dataValues.id_history_gaji;

    sendGaji(
      listUser[i].subtotal,
      listUser[i].email,
      date,
      listUser[i].username
    );
  }
  return res.status(200).send("Success");
});

//========================== GET LIST JABATAN ==========================//
app.get("/api/listJabatan", async (req, res) => {
  let listJabatan = await db.MasterJabatan.findAll({
    where: {
      [Op.and]: [
        { id_jabatan: { [Op.ne]: 4 } },
        { id_jabatan: { [Op.ne]: 5 } },
        { id_jabatan: { [Op.ne]: 6 } },
      ],
    },
  });
  return res.status(200).send(listJabatan);
});

//========================== GET HISTORY GAJI ==========================//
app.get("/api/historyGaji", async (req, res) => {
  let { tgl_awal, tgl_akhir } = req.body;
});

//========================== GET DATA GAJI BY JABATAN ==========================//
app.get("/api/dataGaji/:id_jabatan", async (req, res) => {
  let { id_jabatan } = req.params;

  // var now = new Date();
  // let month = (now.getMonth() + 1).toString().padStart(2, "0")
  // let year = now.getFullYear().toString().padStart(4, "0") ;
  // if(month-1==0){
  //   year-=1
  //   month = 12;
  // }else{
  //   month-=1;
  // }
  let user = await db.MasterUser.findAll({
    where: {
      id_jabatan: id_jabatan,
    },
  });
  let datareturn = [];
  for (let index = 0; index < user.length; index++) {
    let dataUser = user[index].dataValues;
    let dataGajiUser = (
      await db.MasterGaji.findOne({
        where: {
          id_user: dataUser.id_user,
        },
      })
    ).dataValues;
    let targets = await db.MasterTarget.findOne({
      where: {
        id_user: dataUser.id_user,
      },
      order: [["id_target", "desc"]],
    });
    let target = 0;
    if (targets) {
      target = targets.dataValues.target;
      targets = targets.dataValues;
    } else {
      targets = {
        target: 0,
      };
    }
    let potongan = dataUser.absen_user * 100000;
    let totalGaji = dataGajiUser.gaji_pokok;
    let komisi = 0;
    if (dataUser.target_sekarang >= target) {
      komisi = parseInt((dataUser.target_sekarang * 10) / 100);
      totalGaji += parseInt((dataUser.target_sekarang * 10) / 100);
    } else {
      komisi = parseInt((dataUser.target_sekarang * 5) / 100);
      totalGaji += parseInt((dataUser.target_sekarang * 5) / 100);
    }
    totalGaji -= potongan;
    datareturn.push({
      ...dataUser,
      ...dataGajiUser,
      ...targets,
      potongan: potongan,
      subtotal: totalGaji,
      komisi: komisi,
    });
  }
  return res.status(200).send(datareturn);
});

//========================== GET DATA SUPERVISOR ==========================//
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

//========================== GET DATA RAW SUPERVISOR ==========================//
app.get("/api/rawsupervisor/:id", async (req, res) => {
  let { id } = req.params;

  const result = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "target_sekarang", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 2,
      id_atasan: id,
    },
  });

  return res.status(200).send(result);
});

//========================== GET WILAYAH TOKO ==========================//
app.get("/api/kota", async (req, res) => {
  let result = await db.MasterKota.findAll();
  return res.status(200).send(result);
});

//========================== GET ALL TARGET ==========================//
app.get("/api/target", async (req, res) => {
  const targets = await db.MasterTarget.findAll();

  return res.status(200).send(targets);
});

//========================== POST TARGET ==========================//
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

//========================== GET SALESMAN ==========================//
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

//========================== GET DATA RAW SALESMAN ==========================//
app.get("/api/rawsalesman/:id", async (req, res) => {
  let { id } = req.params;

  const supervisor = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 2,
      id_atasan: id,
    },
  });

  let tempIdSupervisor = [];
  for (let i = 0; i < supervisor.length; i++) {
    const superObj = supervisor[i];
    tempIdSupervisor.push(superObj.id_user);
  }

  let result = [];

  for (let i = 0; i < tempIdSupervisor.length; i++) {
    const tempId = tempIdSupervisor[i];

    const tempResult = await db.MasterUser.findAll({
      attributes: ["id_user", "username", "target_sekarang", "status_user"],
      where: {
        status_user: 1,
        id_jabatan: 1,
        id_atasan: tempId,
      },
    });

    for (let j = 0; j < tempResult.length; j++) {
      const salesman = tempResult[j];
      result.push(salesman);
    }
  }

  return res.status(200).send(result);
});

//========================== GET DATA KELURAHAN ==========================//
app.get("/api/kelurahan", async (req, res) => {
  let result = await db.MasterKelurahan.findAll();
  return res.status(200).send(result);
});

//========================== GET DATA BAWAHAN SUPERVISOR ==========================//
app.get("/api/getBawahanSupervisor", async (req, res) => {
  let { id_atasan } = req.query;
  // console.log(id_atasan);
  // return "hello"
  let salesmans = await db.MasterUser.findAll({
    attributes: ["id_user", "username", "target_sekarang", "status_user"],
    where: {
      status_user: 1,
      id_jabatan: 1,
      id_atasan: id_atasan,
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

  let wilayah = await db.MasterKelurahan.findAll({});

  let result = [];

  salesmans.forEach((s) => {
    const tempTarget = targets.find((e) => e.id_user == s.id_user);
    const salesmanTarget = tempTarget.dataValues;

    const kel = wilayah.find(
      (e) => e.id_kelurahan == salesmanTarget.id_wilayah
    );

    const newData = {
      id_user: s.id_user,
      id_target: salesmanTarget.id_target,
      kelurahan: kel.nama_kelurahan,
      username: s.username,
      targetTerakhir: salesmanTarget.target,
      realisasiTarget: s.target_sekarang,
      tanggal_target: salesmanTarget.tanggal_target,
    };

    result.push(newData);
  });

  return res.status(200).send(result);
});

//========================== GET DATA DETAIL BARANG ==========================//
app.get("/api/detailBarang", async (req, res) => {
  let detailBarang = await db.DetailBarang.findAll();

  let temp = [];

  for (let i = 0; i < detailBarang.length; i++) {
    const d = detailBarang[i];
    let barang = await db.MasterBarang.findOne({
      where: {
        id_barang: d.id_barang,
      },
    });
    let brand = await db.MasterBrand.findOne({
      where: {
        id_brand: barang.id_brand,
      },
    });
    temp.push({
      id_barang: d.id_barang,
      nama_brand: brand.nama_brand,
      nama_barang: barang.nama_barang,
      stok_karton: d.jumlah_karton,
      stok_pcs: d.jumlah_pcs,
      harga_karton: barang.harga_karton,
      harga_pcs: barang.harga_pcs,
      tanggal_masuk: d.tanggal_masuk,
      expired: d.tanggal_expired,
    });
  }
  return res.status(200).send(temp);
});

//========================== GET HISTORY GAJI ==========================//
app.get("/api/getHeaderTransaksi", async (req, res) => {
  let headerTransaksi = await db.HeaderTransaksi.findAll({
    where: {
      [Op.or]: [{ status_transaksi: -1 }, { status_transaksi: 2 }],
    },
  });

  let temp = [];

  for (let i = 0; i < headerTransaksi.length; i++) {
    const h = headerTransaksi[i];
    let toko = await db.MasterToko.findOne({
      where: {
        id_toko: h.id_toko,
      },
    });
    let salesman = await db.MasterUser.findOne({
      where: {
        id_user: h.id_user,
      },
    });
    let pembayaran = "Tunai";
    if (h.jenis_transaksi == 1) {
      pembayaran = "Cash";
    }

    let status = "Selesai";
    if (h.status_transaksi == -1) {
      status = "Ditolak";
    }

    temp.push({
      id_transaksi: h.id_transaksi,
      tanggal_transaksi: h.tanggal_transaksi,
      salesman: salesman.username,
      toko: toko.nama_toko,
      total_penjualan: h.subtotal,
      pembayaran: pembayaran,
      status: status,
    });
  }
  return res.status(200).send(temp);
});

//========================== GET DATA HISTORY GAJI ==========================//
app.get("/api/getHistoryGaji", async (req, res) => {
  let historyGaji = await db.HistoryGaji.findAll();

  let temp = [];

  for (let i = 0; i < historyGaji.length; i++) {
    const h = historyGaji[i];
    let gaji = await db.MasterGaji.findOne({
      where: {
        id_gaji: h.id_gaji,
      },
    });
    let user = await db.MasterUser.findOne({
      where: {
        id_user: gaji.id_user,
      },
    });
    let jabatan = await db.MasterJabatan.findOne({
      where: {
        id_jabatan: user.id_jabatan,
      },
    });

    temp.push({
      id_gaji: h.id_gaji,
      nama_karyawan: user.username,
      email: user.email,
      jabatan: jabatan.nama_jabatan,
      gaji_pokok: h.gaji_pokok,
      komisi: h.gaji_komisi,
      tanggal_gaji: h.tanggal_gaji,
      total_gaji: h.gaji_pokok + h.gaji_komisi,
    });
  }
  return res.status(200).send(temp);
});

//========================== GET DATA KATALOG ==========================//
app.get("/api/getKatalogToko", async (req, res) => {
  let toko = await db.MasterToko.findAll({
    where: {
      status_toko: 1,
    },
  });

  let temp = [];

  for (let i = 0; i < toko.length; i++) {
    const t = toko[i];
    let kota = await db.MasterKota.findOne({
      where: {
        id_kota: t.id_kota,
      },
    });
    let kelurahan = await db.MasterKelurahan.findOne({
      where: {
        id_kelurahan: t.id_kelurahan,
      },
    });

    temp.push({
      id_toko: t.id_toko,
      nama_toko: t.nama_toko,
      kota: kota.nama_kota,
      kelurahan: kelurahan.nama_kelurahan,
      nama_konsumen: t.nama_konsumen,
      alamat_toko: t.alamat_toko,
      no_handphone1: t.no_handphone1,
      no_handphone2: t.no_handphone2,
    });
  }
  return res.status(200).send(temp);
});

//========================== GET DATA LIST SUPERVISOR ==========================//
app.get("/api/listSupervisor", async (req, res) => {
  let supervisor = await db.MasterUser.findAll({
    where: {
      id_jabatan: 2,
    },
  });

  return res.status(200).send(supervisor);
});

//========================== GET DATA K. SUEPERVISOR ==========================//
app.get("/api/listKsupervisor", async (req, res) => {
  let ksupervisor = await db.MasterUser.findAll({
    where: {
      id_jabatan: 3,
    },
  });

  return res.status(200).send(ksupervisor);
});

//========================== POST REGISTER USER ==========================//
app.post("/api/register", async (req, res) => {
  let {
    username,
    password,
    alamat,
    no_handphone,
    email,
    id_jabatan,
    id_atasan,
    no_rekening,
    foto,
  } = req.body;
  fs.renameSync(`./uploads/temp.png`, `./uploads/${foto}`);
  const now = new Date();
  const date =
    now.getDate().toString().padStart(2, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getFullYear().toString().padStart(4, "0");

  const result = await db.MasterUser.create({
    username: username,
    password: password,
    alamat: alamat,
    no_handphone: no_handphone,
    email: email,
    id_jabatan: Number(id_jabatan),
    id_atasan: Number(id_atasan),
    tanggal_masuk: date,
    foto: foto,
    target_sekarang: 0,
    absen_user: 0,
    no_rekening: no_rekening,
    status_user: 1,
  });
  return res.status(201).send(result);
});

//========================== GET ALL USER ==========================//
app.get("/api/user", async (req, res) => {
  let users = await db.MasterUser.findAll();
  return res.status(200).send(users);
});

//========================== GET DATA LIST BARANG ==========================//
app.get("/api/getListBarang", async (req, res) => {
  let barang = await db.MasterBarang.findAll();

  return res.status(200).send(barang);
});

//========================== GET DATA LIST BARANG KEYWORD ==========================//
app.get("/api/getListBarang/:keyword", async (req, res) => {
  const { keyword } = req.params;
  const key = `%${keyword}%`;
  console.log(key);
  let barang = await db.MasterBarang.findAll({
    where: {
      [Op.or]: [
        {
          id_barang: {
            [Op.like]: key,
          },
        },
        {
          nama_barang: {
            [Op.like]: key,
          },
        },
      ],
    },
  });
  return res.status(200).send(barang);
});

//========================== GET DATA LIST BRAND AKTIF ==========================//
app.get("/api/getListBrand", async (req, res) => {
  let brand = await db.MasterBrand.findAll({
    where: {
      status_brand: 1,
    },
  });

  return res.status(200).send(brand);
});

//========================== POST TAMBAH BARANG ==========================//
app.post("/api/barang", async (req, res) => {
  let { nama_barang, id_brand, harga_karton, harga_pcs } = req.body;

  let barang = await db.MasterBarang.findAll();

  const id_barang = "BAR" + (barang.length + 1).toString().padStart(5, "0");

  await db.MasterBarang.create({
    id_barang: id_barang,
    nama_barang: nama_barang,
    id_brand: id_brand,
    harga_karton: harga_karton,
    harga_pcs: harga_pcs,
    status_barang: 1,
  });

  return res.status(201).send("Done");
});

//========================== PUT EDIT STATUS BARANG ==========================//
app.put("/api/editStatusBarang", async (req, res) => {
  let { id_barang, status_barang } = req.body;

  await db.MasterBarang.update(
    {
      status_barang: status_barang,
    },
    {
      where: {
        id_barang: id_barang,
      },
    }
  );

  return res.status(201).send("Done");
});

//========================== PUT EDIT BARANG ==========================//
app.put("/api/editBarang", async (req, res) => {
  let { id_barang, nama_barang, harga_pcs, harga_karton, id_brand } = req.body;

  await db.MasterBarang.update(
    {
      nama_barang: nama_barang,
      harga_pcs: harga_pcs,
      harga_karton: harga_karton,
      id_brand: id_brand,
    },
    {
      where: {
        id_barang: id_barang,
      },
    }
  );

  return res.status(201).send("Done");
});

app.post("/upload", upload.single("image"), (req, res) => {
  fs.renameSync(`./uploads/${req.file.filename}`, `./uploads/temp.png`);
  // Handle the image storage here (e.g., save to disk, database, cloud storage, etc.)
  // For simplicity, this example just sends the image size in the response
  const imageSize = req.file ? req.file.size : 0;
  res.json({ imageSize });
});

app.post("/api/cekDuplicateEmail", async (req, res) => {
  let { email } = req.body;
  console.log(email);
  let duplicateEmail = await db.MasterUser.findOne({
    where: {
      email: email,
    },
  });
  if (duplicateEmail) {
    return res.send(true);
  }
  return res.send(false);
});

//========================== GET DATA LIST BRAND ==========================//
app.get("/api/getListBrands", async (req, res) => {
  let brand = await db.MasterBrand.findAll();

  return res.status(200).send(brand);
});

//========================== POST TAMBAH BRAND ==========================//
app.post("/api/brand", async (req, res) => {
  let { nama_brand } = req.body;

  const now = new Date();
  const date =
    now.getDate().toString().padStart(2, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getFullYear().toString().padStart(4, "0");

  await db.MasterBrand.create({
    nama_brand: nama_brand,
    tanggal_masuk_brand: date,
    status_brand: 1,
  });

  return res.status(201).send("Done");
});

//========================== PUT EDIT STATUS BRAND ==========================//
app.put("/api/editStatusBrand", async (req, res) => {
  let { id_brand, status_brand } = req.body;

  await db.MasterBrand.update(
    {
      status_brand: status_brand,
    },
    {
      where: {
        id_brand: id_brand,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST BRAND KEYWORD ==========================//
app.get("/api/getListBrands/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const key = `%${keyword}%`;
  let brand = await db.MasterBrand.findAll({
    where: {
      [Op.or]: [
        {
          id_brand: {
            [Op.like]: key,
          },
        },
        {
          nama_brand: {
            [Op.like]: key,
          },
        },
      ],
    },
  });
  return res.status(200).send(brand);
});

//========================== PUT EDIT BARANG ==========================//
app.put("/api/editBrand", async (req, res) => {
  let { id_brand, nama_brand } = req.body;

  await db.MasterBrand.update(
    {
      nama_brand: nama_brand,
    },
    {
      where: {
        id_brand: id_brand,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST JABATAN ==========================//
app.get("/api/getListJabatan", async (req, res) => {
  let jabatan = await db.MasterJabatan.findAll();

  return res.status(200).send(jabatan);
});

//========================== POST TAMBAH JABATAN ==========================//
app.post("/api/jabatan", async (req, res) => {
  let { nama_jabatan } = req.body;

  await db.MasterJabatan.create({
    nama_jabatan: nama_jabatan,
    status_jabatan: 1,
  });

  return res.status(201).send("Done");
});

//========================== PUT EDIT STATUS JABATAN ==========================//
app.put("/api/editStatusJabatan", async (req, res) => {
  let { id_jabatan, status_jabatan } = req.body;

  await db.MasterJabatan.update(
    {
      status_jabatan: status_jabatan,
    },
    {
      where: {
        id_jabatan: id_jabatan,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST JABATAN KEYWORD ==========================//
app.get("/api/getListJabatan/:keyword", async (req, res) => {
  const { keyword } = req.params;
  const key = `%${keyword}%`;
  let jabatan = await db.MasterJabatan.findAll({
    where: {
      [Op.or]: [
        {
          id_jabatan: {
            [Op.like]: key,
          },
        },
        {
          nama_jabatan: {
            [Op.like]: key,
          },
        },
      ],
    },
  });
  return res.status(200).send(jabatan);
});

//========================== PUT EDIT JABATAN ==========================//
app.put("/api/editJabatan", async (req, res) => {
  let { id_jabatan, nama_jabatan } = req.body;

  await db.MasterJabatan.update(
    {
      nama_jabatan: nama_jabatan,
    },
    {
      where: {
        id_jabatan: id_jabatan,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST KOTA ==========================//
app.get("/api/getListKota", async (req, res) => {
  let kota = await db.MasterKota.findAll();

  return res.status(200).send(kota);
});

//========================== POST TAMBAH KOTA ==========================//
app.post("/api/kota", async (req, res) => {
  let { nama_kota } = req.body;

  let kota = await db.MasterKota.findAll();
  const id_kota = "KTA" + (kota.length + 1).toString().padStart(5, "0");

  await db.MasterKota.create({
    id_kota: id_kota,
    nama_kota: nama_kota,
    status_kota: 1,
  });

  return res.status(201).send("Done");
});

//========================== PUT EDIT STATUS KOTA ==========================//
app.put("/api/editStatusKota", async (req, res) => {
  let { id_kota, status_kota } = req.body;

  await db.MasterKota.update(
    {
      status_kota: status_kota,
    },
    {
      where: {
        id_kota: id_kota,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST KOTA KEYWORD ==========================//
app.get("/api/getListKota/:keyword", async (req, res) => {
  const { keyword } = req.params;
  const key = `%${keyword}%`;
  let kota = await db.MasterKota.findAll({
    where: {
      [Op.or]: [
        {
          id_kota: {
            [Op.like]: key,
          },
        },
        {
          nama_kota: {
            [Op.like]: key,
          },
        },
      ],
    },
  });
  return res.status(200).send(kota);
});

//========================== PUT EDIT KOTA ==========================//
app.put("/api/editKota", async (req, res) => {
  let { id_kota, nama_kota } = req.body;

  await db.MasterKota.update(
    {
      nama_kota: nama_kota,
    },
    {
      where: {
        id_kota: id_kota,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST KELURAHAN ==========================//
app.get("/api/getListKelurahan", async (req, res) => {
  let kelurahan = await db.MasterKelurahan.findAll();

  return res.status(200).send(kelurahan);
});

//========================== POST TAMBAH KELURAHAN ==========================//
app.post("/api/kelurahan", async (req, res) => {
  let { id_kota, nama_kelurahan } = req.body;

  let kelurahan = await db.MasterKelurahan.findAll();
  const id_kelurahan =
    "KLR" + (kelurahan.length + 1).toString().padStart(5, "0");

  await db.MasterKelurahan.create({
    id_kelurahan: id_kelurahan,
    id_kota: id_kota,
    nama_kelurahan: nama_kelurahan,
    status_kelurahan: 1,
  });

  return res.status(201).send("Done");
});

//========================== PUT EDIT STATUS KELURAHAN ==========================//
app.put("/api/editStatusKelurahan", async (req, res) => {
  let { id_kelurahan, status_kelurahan } = req.body;

  await db.MasterKelurahan.update(
    {
      status_kelurahan: status_kelurahan,
    },
    {
      where: {
        id_kelurahan: id_kelurahan,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST KELURAHAN KEYWORD ==========================//
app.get("/api/getListKelurahan/:keyword", async (req, res) => {
  const { keyword } = req.params;
  const key = `%${keyword}%`;
  let kelurahan = await db.MasterKelurahan.findAll({
    where: {
      [Op.or]: [
        {
          id_kelurahan: {
            [Op.like]: key,
          },
        },
        {
          nama_kelurahan: {
            [Op.like]: key,
          },
        },
      ],
    },
  });
  return res.status(200).send(kelurahan);
});

//========================== PUT EDIT KELURAHAN ==========================//
app.put("/api/editKelurahan", async (req, res) => {
  let { id_kelurahan, id_kota, nama_kelurahan } = req.body;

  await db.MasterKelurahan.update(
    {
      id_kota: id_kota,
      nama_kelurahan: nama_kelurahan,
    },
    {
      where: {
        id_kelurahan: id_kelurahan,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET ALL HEADER TRANSAKSI ==========================//
app.get("/api/headertransaksi", async (req, res) => {
  let headerTransaksi = await db.HeaderTransaksi.findAll();
  return res.status(200).send(headerTransaksi);
});

//========================== GET ALL TOKO ==========================//
app.get("/api/toko", async (req, res) => {
  let toko = await db.MasterToko.findAll();
  return res.status(200).send(toko);
});

//========================== GET LAPORAN KINERJA ==========================//
app.get("/api/kinerja", async (req, res) => {
  let historyGaji = await db.HistoryGaji.findAll();
  let gaji = await db.MasterGaji.findAll();
  let karyawan = await db.MasterUser.findAll();
  let jabatan = await db.MasterJabatan.findAll();

  let kinerja = [];

  historyGaji.forEach((h) => {
    const tempGaji = gaji.find((e) => e.id_gaji == h.id_gaji);
    const tempKaryawan = karyawan.find((e) => e.id_user == tempGaji.id_user);
    const tempJabatan = jabatan.find(
      (e) => e.id_jabatan == tempKaryawan.id_jabatan
    );

    let absen = 0;
    let potongan = 0;

    if (tempJabatan.nama_jabatan == "Koordinator Supervisor") {
      potongan = 9000000 - h.gaji_pokok;
      absen = potongan / 300000;
    } else if (tempJabatan.nama_jabatan == "Supervisor") {
      potongan = 6000000 - h.gaji_pokok;
      absen = potongan / 200000;
    } else if (tempJabatan.nama_jabatan == "Salesman") {
      potongan = 3000000 - h.gaji_pokok;
      absen = potongan / 100000;
    }

    kinerja.push({
      id_karyawan: tempKaryawan.id_user,
      nama_karyawan: tempKaryawan.username,
      jabatan: tempJabatan.nama_jabatan,
      tanggal: h.tanggal_gaji,
      absen: absen,
      gaji: h.gaji_pokok,
      potongan: potongan,
    });
  });

  return res.status(200).send(kinerja);
});

//========================== GET ALL DETAIL BARANG ==========================//
app.get("/api/getListDbarang", async (req, res) => {
  let dbarang = await db.DetailBarang.findAll();
  return res.status(200).send(dbarang);
});

//========================== GET ALL DETAIL TRANSAKSI ==========================//
app.get("/api/getAllDetailTransaksi", async (req, res) => {
  let detailTransaksi = await db.DetailTransaksi.findAll();
  return res.status(200).send(detailTransaksi);
});

//========================== GET DATA DETAIL BARANG BY ID ==========================//
app.post("/api/detailBarang/:id", async (req, res) => {
  let { id } = req.params;

  let detailBarang = await db.DetailBarang.findOne({
    where: {
      id_detail_barang: id,
    },
  });

  let barang = await db.MasterBarang.findOne({
    where: {
      id_barang: detailBarang.id_barang,
    },
  });

  let brand = await db.MasterBrand.findOne({
    where: {
      id_brand: barang.id_brand,
    },
  });

  let result = {
    id_detail_barang: detailBarang.id_detail_barang,
    id_barang: detailBarang.id_barang,
    nama_brand: brand.nama_brand,
    nama_barang: barang.nama_barang,
    stok_karton: detailBarang.jumlah_karton,
    stok_pcs: detailBarang.jumlah_pcs,
    harga_karton: barang.harga_karton,
    harga_pcs: barang.harga_pcs,
    tanggal_masuk: detailBarang.tanggal_masuk,
    expired: detailBarang.tanggal_expired,
  };

  return res.status(200).send(result);
});

//========================== PUT UPDATE STATUS HEADER TRANSAKSI BY ID ==========================//
app.put("/api/updateHeaderTransaksi/:id", async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;

  let update = await db.HeaderTransaksi.update(
    {
      status_transaksi: status,
    },
    {
      where: {
        id_transaksi: id,
      },
    }
  );

  return res.status(201).send(update);
});

//========================== PUT UPDATE DETAIL BARANG BY ID ==========================//
app.put("/api/updateDetailBarang/:id", async (req, res) => {
  let { id } = req.params;
  let { stok_pcs, stok_karton } = req.body;

  let barang = await db.DetailBarang.findOne({
    where: {
      id_detail_barang: id,
    },
  });

  if (stok_pcs && stok_karton) {
    // Both
    let newStockPCS = barang.jumlah_pcs - Number(stok_pcs);
    let newStockKarton = barang.jumlah_karton - Number(stok_karton);

    let updateStock = await db.DetailBarang.update(
      {
        jumlah_pcs: newStockPCS,
        jumlah_karton: newStockKarton,
      },
      {
        where: {
          id_detail_barang: id,
        },
      }
    );

    return res.status(201).send(updateStock);
  } else if (stok_pcs) {
    // PCS
    let newStockPCS = barang.jumlah_pcs - Number(stok_pcs);

    let updateStock = await db.DetailBarang.update(
      {
        jumlah_pcs: newStockPCS,
      },
      {
        where: {
          id_detail_barang: id,
        },
      }
    );

    return res.status(201).send(updateStock);
  } else if (stok_karton) {
    // KARTON
    let newStockKarton = barang.jumlah_karton - Number(stok_karton);

    let updateStock = await db.DetailBarang.update(
      {
        jumlah_karton: newStockKarton,
      },
      {
        where: {
          id_detail_barang: id,
        },
      }
    );

    return res.status(201).send(updateStock);
  }
});

//========================== PUT UPDATE REALISASI ==========================//
app.put("/api/realisasi/:idSales", async (req, res) => {
  let { idSales } = req.params;
  let { subtotal } = req.body;

  // Realisasi Saleman
  let salesman = await db.MasterUser.findByPk(idSales);
  let newRealisasiSalesman = salesman.target_sekarang + Number(subtotal);
  // console.log(newRealisasiSalesman);
  let updateSalesman = await db.MasterUser.update(
    {
      target_sekarang: newRealisasiSalesman,
    },
    {
      where: {
        id_user: salesman.id_user,
      },
    }
  );

  // Realisasi Supervisor
  let supervisor = await db.MasterUser.findByPk(salesman.id_atasan);
  let newRealisasiSupervisor = supervisor.target_sekarang + Number(subtotal);
  // console.log(newRealisasiSupervisor);
  let updateSupervisor = await db.MasterUser.update(
    {
      target_sekarang: newRealisasiSupervisor,
    },
    {
      where: {
        id_user: supervisor.id_user,
      },
    }
  );

  return res.status(201).send("Success!");
});

//========================== POST TAMBAH DETAIL BARANG ==========================//
app.post("/api/dbarang", async (req, res) => {
  let { id_barang, jumlah_karton, jumlah_pcs, tanggal_expired } = req.body;

  const now = new Date();
  const date =
    now.getDate().toString().padStart(2, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getFullYear().toString().padStart(4, "0");

  const dbarang = await db.DetailBarang.findAll();

  await db.DetailBarang.create({
    id_detail_barang: dbarang.length+1,
    id_barang: id_barang,
    jumlah_karton: jumlah_karton,
    jumlah_pcs: jumlah_pcs,
    tanggal_masuk: date,
    tanggal_expired: tanggal_expired,
  });

  return res.status(201).send("Done");
});

//========================== DELETE DETAIL BARANG ==========================//
app.put("/api/dbarang", async (req, res) => {
  let { id_detail_barang } = req.body;

  await db.DetailBarang.destroy(
    {
      where: {
        id_detail_barang: id_detail_barang,
      },
    }
  );

  return res.status(200).send("Done");
});

//========================== GET DATA LIST BRAND KEYWORD ==========================//
app.get("/api/getListDbarang/:keyword", async (req, res) => {
  const { keyword } = req.params;
  const key = `%${keyword}%`;
  let barang = await db.MasterBarang.findAll({
    where: {
      nama_barang: {
        [Op.like]: key,
      }
    },
  });

  let temp = [];

  for (let i = 0; i < barang.length; i++) {
    const b = barang[i];
    let t = await db.DetailBarang.findAll({
      where: {
        id_barang: b.id_barang,
      },
    });
    for (let j = 0; j < t.length; j++) {
      temp.push(t[j]);      
    }
  }

  return res.status(200).send(temp);
});

//========================== PUT EDIT DETAIL BARANG ==========================//
app.put("/api/editDbarang", async (req, res) => {
  let { id_detail_barang, id_barang, jumlah_karton, jumlah_pcs, tanggal_expired } = req.body;

  await db.DetailBarang.update(
    {
      id_barang: id_barang,
      jumlah_karton: jumlah_karton,
      jumlah_pcs: jumlah_pcs,
      tanggal_expired: tanggal_expired,
    },
    {
      where: {
        id_detail_barang: id_detail_barang,
      },
    }
  );

  return res.status(200).send("Done");
});