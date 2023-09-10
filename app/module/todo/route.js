const express = require("express");
const router = express.Router();
const passport = require("passport");

const TodoCtrl = require("./controllers/todo.controller");

const TodoModel = require("./models/todo.model");
const Middlewares = require("../core/middlewares/index");
const LoadTodo = Middlewares.LoadModel({ model: TodoModel });
// const Pagination = Middlewares.Pagination(ProductModel);

router.post("/create/", (req, res, next) => next(), TodoCtrl.Create);
router.put("/:id/edit", (req, res, next) => next(), TodoCtrl.Update);
router.get("/:id/detail", (req, res, next) => next(), TodoCtrl.Details);
router.post("/:id/remove", (req, res, next) => next(), TodoCtrl.Remove);

// router.get(
//   "/index",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => next(),
//   Middlewares.Pagination(ProductModel),
//   ProductCtrl.Index
// );

//Exports router
module.exports = router;
