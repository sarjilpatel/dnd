const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb+srv://sarjilpatel:SARjil543@cluster0.ebwhdhf.mongodb.net/?retryWrites=true&w=majority";

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((con) => console.log(`database connected : ${con.connection.host}`))
    .catch((err) => {
      console.log(err.message);
    });
};
