const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("cexpe");

const ProgramScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
    },
  },
  {
    collection: "program",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Program = db.model("ProgramScheme", ProgramScheme);
module.exports = { Program };
