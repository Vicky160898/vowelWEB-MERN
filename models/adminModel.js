const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AdminSchema = new model("data", ProductSchema);
module.exports = AdminSchema;
