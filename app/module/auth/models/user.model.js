const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },

  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, maxlength: 11, minlength: 11, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  createAt: { type: Date, default: Date.now },
  updateAt: Date,
});

module.exports = mongoose.model("User", UserSchema);
