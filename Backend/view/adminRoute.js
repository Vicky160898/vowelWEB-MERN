const express = require("express");
const { CartData, GetCart, QtyUpdate } = require("../controller/Cart");

const {
  getproduct,
  deleteProduct,
  postProduct,
  editProduct,
  // cartProduct,
} = require("../controller/product");
const app = express.Router();

//admin route...
app.get("/", getproduct);
app.post("/add", postProduct);
app.delete("/:id", deleteProduct);
app.patch("/detail/:id", editProduct);
app.get("/cart", GetCart);
app.post("/cart", CartData);
app.patch("/qty/:id", QtyUpdate)

module.exports = app;
