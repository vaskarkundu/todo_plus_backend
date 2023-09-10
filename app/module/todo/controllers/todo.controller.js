const TodoRepo = require("../../todo/repositories/todo.repository");

exports.Create = async (req, res) => {
  try {
    let todo = req.body;
    let _todo = await TodoRepo.Create(todo);
    return res.status(200).json({
      message: "Todo created successfully",
      data: _todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Update = async (req, res) => {
  let todoID = req.params.id;
  try {
    let todo = await TodoRepo.Single({ _id: todoID });
    if (!todo) {
      return res.status(404).json({ message: "ToDo is not avaiable" });
    }
    Object.assign(todo, req.body);
    await todo.save();
    return res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Details = async (req, res) => {
  let todoID = req.params.id;
  try {
    let todo = await TodoRepo.Single({ _id: todoID });
    if (!todo) {
      return res.status(404).json({ message: "Todo is not avaiable" });
    }
    res.status(200).json({ message: "Here is the todo", data: todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Remove = async (req, res) => {
  let todoID = req.params.id;
  try {
    await TodoRepo.Delete({ _id: todoID });

    return res.status(200).json({ message: "Todo removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Index = async (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
