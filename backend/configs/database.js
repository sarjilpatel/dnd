const mongoose = require("mongoose");
MONGO_URL =
  "mongodb+srv://sarjilpatel:SARjil543@cluster0.x0ehsvt.mongodb.net/?retryWrites=true&w=majority";

exports.connectDatabase = () => {
  mongoose
    .connect(MONGO_URL)
    .then((con) => console.log(`database connected : ${con.connection.host}`))
    .catch((err) => {
      console.log(err.message);
    });
};
