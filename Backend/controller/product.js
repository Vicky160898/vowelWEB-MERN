const ProductSchema = require("../models/adminModel");
const UserModel = require("../models/userModel");
// const Cart = require('../models/cartModel');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

//all product getting route..
const getproduct = async (req, res) => {
  const product = await ProductSchema.find();
  res.send(product);
};

//product adding route..
const postProduct = async (req, res) => {
  const { url, title, price } = req.body;
  const data = await ProductSchema.findOne({ title: title });
  try {
    if (!data) {
      const newData = new ProductSchema({
        title,
        url,
        price,
      });
      await newData.save();
      return res.status(200).send(newData);
    } else {
      return res.send("data already present");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//product add into the cart route..
// const cartProduct = async (req, res) => {
//   const { id } = req.params;
//   let token = req.headers.authorization;
//   let verification = jwt.verify(token, SECRET_KEY);
//   console.log(id);
//   try {
//     const product = await UserModel.findOneAndUpdate(
//       {
//         email: verification.email,
//       },
//       { $push: { purchased_product: { product_id: id } } }
//     );
//     console.log(product);
//     return res
//       .status(200)
//       .send({ status: true, message: "Product added successfully" });
//   } catch (e) {
//     return res.status(401).send({ message: e.message });
//   }
// };

//product delete route..
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await ProductSchema.deleteOne({ _id: id });
    res.status(200).send(`Product deleted`);
  } catch {
    res.status(500).send("Product not found");
  }
};

//product edit route..
const editProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductSchema.findOne({ _id: id });
    if (!data) {
      return res.status(401).send("Data not found");
    } else {
      await ProductSchema.updateOne({ _id: id }, { $set: req.body });
      return res.status(201).send("Data updated successfully");
    }
  } catch (e) {
    res.status(403).send("error");
  }
};

module.exports = {
  getproduct,
  deleteProduct,
  postProduct,
  editProduct,
};
