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
  let datauser = {...data.dataValues,jabatan:jabatan.dataValues.nama_jabatan}
  return res
    .status(200)
    .send({
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
  let dataReturn=[];

  for (let i = 0; i < barang.length; i++) {
    let jml = await db.DetailBarang.findAll({where:{
        id_barang:barang[i].dataValues.id_barang
    }})
    let jmlPcs=0;
    let jmlKarton=0;
    for(let j=0;j<jml.length;j++){
        jmlPcs+=jml[j].dataValues.jumlah_pcs;
        jmlKarton+=jml[j].dataValues.jumlah_karton;
    }
    dataReturn.push({
        id_barang:barang[i].dataValues.id_barang,
        nama_barang:barang[i].dataValues.nama_barang,
        stok_karton:jmlKarton,
        stok_pcs:jmlPcs,
        harga_karton:barang[i].dataValues.harga_karton,
        harga_pcs:barang[i].dataValues.harga_pcs,
    })
  }
  return res.status(201).send(dataReturn);
});

app.post("/api/atasan",async(req,res)=>{
    let {id_user} = req.body;
    let user = await db.MasterUser.findByPk(id_user);
    return res.status(200).send(user.dataValues.username)
  })
