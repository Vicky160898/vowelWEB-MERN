require("dotenv").config();
const mongoose = require("mongoose");

//here we connecting the database to the node js server..
const connect = () => {
  return mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("mongodb not connected");
      } else {
        console.log("mongodb connected successfully");
      }
    }
  );
};

module.exports = connect;
