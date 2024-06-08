const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://majoqr:l47EtsR7AcV6o4GD@cexpe.l83yedb.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Conexión establecida!");
  } catch (err) {
    console.error("DB: ERROR", err);
    process.exit(1);
  }
};

module.exports = connectDB;
