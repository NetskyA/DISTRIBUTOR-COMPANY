const express = require("express");
const app = express();
const { Sequelize, Op } = require("sequelize");
const { getDB } = require("./sequelize");
const jwt = require("jsonwebtoken");
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
const JWT_KEY = "TUGASFPWM6";
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
  if(!data){
    return res.status(404).send("Email tidak terdaftar")
  }
  if(data.dataValues.password!==password){
    return res.status(401).send("Password Salah")
  }
  let jabatan = await db.MasterJabatan.findOne({
    where:{
        id_jabatan:data.dataValues.id_jabatan
    }
  })
  let token = jwt.sign(
    {
      currentUser:data.dataValues
    }, 
    JWT_KEY
  );
  return res.status(200).send({user:data.dataValues,jabatan:jabatan.dataValues.nama_jabatan,token:token});
});


app.get("/api/barang", async (req, res) => { 
    let barang = await db.MasterBarang.findAll();
    return res.status(201).send(barang)
}) 