require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRoute = require('./view/routes');
const adminRoute = require("./view/adminRoute");
const payment = require('./controller/payment');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

//route
app.use("/api", userRoute);
app.use("/product", adminRoute);
app.post("/orders" , payment.orders)
app.post("/verify" , payment.verify)
// server connection
connect();
app.listen(PORT, () => {
  console.log("server started at port 8080");
});
