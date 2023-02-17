const { mongoose, Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "data",
  },
  title: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});
const Order = model("order", OrderSchema);
module.exports = Order;
