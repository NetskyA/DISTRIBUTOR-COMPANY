const express = require("express");
const app = express();
const { Sequelize, Op } = require("sequelize");
const { getDB } = require("./sequelize");
const conn = getDB();
const port = 3000;
const initApp = async () => {
    console.log("Testing database connection");
    try {
        await conn.authenticate();
        console.log("Successfully connected!");
        app.listen(port, () =>
            console.log(`App listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Failure database connection : ", error.original);
    }
}

initApp();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));