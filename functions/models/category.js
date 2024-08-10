const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("cexpe");

const CategoryScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "category",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Category = db.model("CategoryScheme", CategoryScheme);
module.exports = { Category };
