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

app.post("/api/retur", async (req, res) => {
  let { data } = req.body;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let rawDetailTrans = (await db.DetailTransaksi.findAll({
      where: {
          id_transaksi: data[i].id_transaksi ,
      },
    }));
    let detailTrans = [];
    for (let j = 0; j < rawDetailTrans.length; j++) {
      let detailBarang = await db.DetailBarang.findAll({
        where:{
          id_barang:data[i].id_barang
        }
      })
      for (let k = 0; k < detailBarang.length; k++) {
        if(rawDetailTrans[j].dataValues.id_detail_barang===detailBarang[k].dataValues.id_detail_barang){
          detailTrans.push({...rawDetailTrans[j].dataValues})
        }
      }
    }
    if (data[i].status == 2) {
      let jmlPcs = data[i].jumlah_retur_pcs;
      let jmlKarton = data[i].jumlah_retur_karton;
      let uang = 0;
      let stop1=false;
      let stop2=false;
      for (let j = 0; j < detailTrans.length; j++) {
        let tempjmlpcs = 0;
        let tempjmlkarton = 0;
        if (jmlPcs !== 0 && detailTrans[j].jumlah_barang_pcs >= jmlPcs) {
          tempjmlpcs += jmlPcs;
          uang += jmlPcs * data[i].harga_pcs;
          jmlPcs = 0;
        }
        if (jmlPcs !== 0 && detailTrans[j].jumlah_barang_pcs !== 0 && detailTrans[j].jumlah_barang_pcs <= jmlPcs) {
          tempjmlpcs += detailTrans[j].jumlah_barang_pcs;
          uang += detailTrans[j].jumlah_barang_pcs * data[i].harga_pcs;
          jmlPcs -= detailTrans[j].jumlah_barang_pcs;
        }
        if (jmlKarton !== 0 && detailTrans[j].jumlah_barang_karton >= jmlKarton) {
          tempjmlkarton += jmlKarton;
          uang += jmlKarton * data[i].harga_karton;
          jmlKarton = 0;
        }
        if (jmlKarton !== 0 && detailTrans[j].jumlah_barang_karton !== 0 && detailTrans[j].jumlah_barang_karton <= jmlKarton) {
          tempjmlkarton += detailTrans[j].jumlah_barang_karton;
          uang += detailTrans[j].jumlah_barang_karton * data[i].harga_karton;
          jmlKarton -= detailTrans[j].jumlah_barang_karton;
        }
        if (jmlPcs== 0) {
          stop2 = true;
        }
        if (jmlKarton == 0) {
          stop1 = true;
        }
        await db.DetailTransaksi.update(
          {
            retur_pcs:tempjmlpcs,
            retur_karton:tempjmlkarton,
            tanggal_retur:data[i].tanggal_retur,
            jenis_retur:data[i].status
          },{
          where: {
            [Op.and]: [
              { id_detail_barang: detailTrans[j].id_detail_barang },
              { id_transaksi: detailTrans[j].id_transaksi },
            ],
          },
        })
        if (stop1 && stop2) {
          break;
        }
      }
      console.log(uang)
      let jmlUangSekarang = await db.MasterKeuangan.findOne({
        order:[["id_keuangan","DESC"]]
      })
      let jmlUangUpdate = jmlUangSekarang.dataValues.jumlah_uang - uang;
      await db.MasterKeuangan.create({
        jumlah_uang:jmlUangUpdate,
        uang_masuk:0,
        uang_keluar:uang,
        tanggal_perpindahan:data[i].tanggal_retur
      })
      
    }else{

      let detailBarang = await db.DetailBarang.findAll({
        where:{
          id_barang:data[i].id_barang
        }
      })
      let jmlPcs = data[i].jumlah_retur_pcs;
      let jmlKarton = data[i].jumlah_retur_karton;
      let stop1=false;
      let stop2=false;
      for (let j = 0; j < detailTrans.length; j++) {
        let jmlPcsDetail =  0    
        let jmlKartonDetail = 0
        if(jmlPcs<detailTrans[j].jumlah_barang_pcs){
          jmlPcsDetail = jmlPcs;
          jmlPcs = 0
        }else{
          jmlPcsDetail = detailTrans[j].jumlah_barang_pcs
          jmlPcs -=detailTrans[j].jumlah_barang_pcs
        }
        if(jmlKarton<detailTrans[j].jumlah_barang_karton){
          jmlKartonDetail = jmlKarton;
          jmlKarton = 0
        }else{
          jmlKartonDetail = detailTrans[j].jumlah_barang_karton
          jmlKarton -=detailTrans[j].jumlah_barang_karton
        }
        console.log(jmlPcsDetail)
        let jmlUpdatePcs = 0;
        let jmlUpdateKarton = 0;
        for (let k = 0; k < detailBarang.length; k++) {
          if (jmlPcsDetail !== 0 && detailBarang[k].dataValues.jumlah_pcs >= jmlPcsDetail){
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
          if (jmlKartonDetail !== 0 && detailBarang[k].dataValues.jumlah_karton >= jmlKartonDetail){
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
          if (jmlPcsDetail !== 0 && detailBarang[j].dataValues.jumlah_pcs !== 0 && detailBarang[j].dataValues.jumlah_pcs <= jmlPcsDetail){
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
            jmlPcsDetail -=detailBarang[j].dataValues.jumlah_pcs

          }
          if (jmlKartonDetail !== 0 && detailBarang[j].dataValues.jumlah_karton !== 0 && detailBarang[j].dataValues.jumlah_karton <= jmlKartonDetail){
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
            jmlKartonDetail -=detailBarang[j].dataValues.jumlah_karton
          }
          if(jmlKartonDetail==0 && jmlPcsDetail==0){
            break
          }
        }
        console.log(jmlUpdatePcs);
        await db.DetailTransaksi.update(
          {
            retur_pcs:jmlUpdatePcs,
            retur_karton:jmlUpdateKarton,
            tanggal_retur:data[i].tanggal_retur,
            jenis_retur:data[i].status
          },{
          where: {
            [Op.and]: [
              { id_detail_barang: detailTrans[j].id_detail_barang },
              { id_transaksi: detailTrans[j].id_transaksi },
            ],
          },
        })
        if(jmlPcs==0 && jmlKarton==0){
          break
        }
      }
    }
  }
  return res.status(200).send("Yay")
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
  return res
    .status(200)
    .send({
      header: headerTransaksi.dataValues,
      detail: detailTransaksi,
      toko: toko,
      barang: barang,
      detailBarang: detailBarang,
    });
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

// Get Data Kelurahan
app.get("/api/kelurahan", async (req, res) => {
  let result = await db.MasterKelurahan.findAll();
  return res.status(200).send(result);
});

// Get Data Bawahan Supervisor
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

    const kel = wilayah.find((e) => e.id_kelurahan == salesmanTarget.id_wilayah);

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

// Get Data Detail Barang
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
    })
  }
  return res.status(200).send(temp);
});

// Get Data Header Transaksi
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
    if(h.jenis_transaksi==1){
      pembayaran = "Cash";
    }

    let status = "Selesai";
    if(h.status_transaksi==-1){
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
    })
  }
  return res.status(200).send(temp);
});

// Get Data History Gaji
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
        id_jabatan: user.id_jabatan
      }
    })

    temp.push({
      id_gaji: h.id_gaji,
      nama_karyawan: user.username,
      email: user.email,
      jabatan: jabatan.nama_jabatan,
      gaji_pokok: h.gaji_pokok,
      komisi: h.gaji_komisi,
      tanggal_gaji: h.tanggal_gaji,
      total_gaji: h.gaji_pokok + h.gaji_komisi, 
    })
  }
  return res.status(200).send(temp);
});

// Get Data Katalog Toko
app.get("/api/getKatalogToko", async (req, res) => {
  let toko = await db.MasterToko.findAll({
    where: {
      status_toko: 1,
    }
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
    })
  }
  return res.status(200).send(temp);
});