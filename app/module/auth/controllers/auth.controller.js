const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserRepo = require("../repositories/user.repository");

exports.SingUp = async (req, res) => {
  const { phone, email, password, name, role } = req.body;
  try {
    const user = await UserRepo.Single({ $or: [{ phone }, { email }] });

    if (user) {
      return res.status(400).json({ message: "User Already exits" });
    }

    const hassPassword = await bcrypt.hashSync(password, 10);
    const data = {
      name: name,
      email: email,
      password: hassPassword,
      phone: phone,
      role: role,
    };
    const result = await UserRepo.Create(data);
    return res.status(200).json({ message: "User Created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.SingIn = async (req, res) => {
  const { phone, email, password } = req.body;
  try {
    const user = await UserRepo.Single({ $or: [{ phone }, { email }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const payload = {
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "Sign in successfull", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
