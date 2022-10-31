const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());
require("dotenv").config({ path: "backend/configs/config.env" });

//Using middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Importing Routersdotenv

const calculateRoutes = require("./routes/calculatorRoutes");

//using Routes
app.use("/api/v1", calculateRoutes);

module.exports = app;
