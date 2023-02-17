const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  purchase_product: [
    { product_id: { type: Schema.Types.ObjectId, ref: "data" } },
  ],
});

//Export the model
const UserModel = model("User", userSchema);
module.exports = UserModel;
