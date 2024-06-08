const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("cexpe");

const ProgramScheme = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
    },
  },
  { collection: "program" }
);

const Program = db.model("ProgramScheme", ProgramScheme);
module.exports = { Program };
