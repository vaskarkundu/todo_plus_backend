// ExpressJS Core
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//Auth controller
const AuthCtrl = require("./controllers/auth.controller");

//register route
router.post("/signup", AuthCtrl.SingUp);
// //login route
router.post("/signin", AuthCtrl.SingIn);

module.exports = router;
