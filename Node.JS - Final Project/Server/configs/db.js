const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/FactoryDB")
    .then(() => console.log("Connected to FactoryDB"))
    .catch(console.log);
};

module.exports = connectDB;
