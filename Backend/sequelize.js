const Sequelize = require("sequelize");
// ISI DENGAN DATA DARI DB YANG AKAN DIHUBUNGKAN
const db = new Sequelize(
  'alphateam', // DB_NAME
  'root', // DB_USER
  '', // DB_PASSWORD
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: "mysql",
  }
);

module.exports = {
  initDB: () => {
    return db.authenticate();
  },
  getDB: () => {
    return db;
  },
};
