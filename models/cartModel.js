const { mongoose, Schema, model } = require("mongoose");
const CartSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required:true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "data",
    // required:true,
  },
  title: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});
const Cart = model("cart", CartSchema);
module.exports = Cart;
