const Cart = require("../models/cartModel");
const CartData = async (req, res) => {
  const user_id = req.user_id;
  console.log(user_id);
  const { product_id, title, url, price, quantity } = req.body;
  try {
    let cartData = await Cart.create({
      user_id,
      product_id,
      title,
      url,
      price,
      quantity,
    });
    res.send(cartData);
  } catch (err) {
    console.log(err.message);
  }
};

const GetCart = async (req, res) => {
  const id = req.user_id;
  try {
    const cart = await Cart.find();
    return res.status(200).send(cart);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
};

const QtyUpdate = async (req, res) => {
  const { id } = req.params;
  const { c } = req.body;
  try {
    //const quantity = await Cart.findOneAndUpdate({ _id: id });
    await Cart.findOneAndUpdate(
      { _id: id },
      { $set: { quantity: quantity + c } }
    );
    return res.status(201).send("Data updated successfully");
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = { CartData, GetCart, QtyUpdate };
