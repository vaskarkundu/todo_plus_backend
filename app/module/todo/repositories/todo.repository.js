const TodoModel = require("../models/todo.model");

const Create = async (data) => {
  const todo = new TodoModel(data);
  return await todo.save();
};

const Single = async (query) => {
  return await TodoModel.findOne(query);
};
const Delete = async (query) => {
  return await TodoModel.deleteOne(query);
};
const Index = async (query, page, size, sortQuery) => {
  if (!sortQuery) sortQuery = { updateAt: -1 };
  return await TodoModel.find(query)
    .skip((page - 1) * size)
    .limit(size)
    .sort(sortQuery);
};
const Count = async (query) => {
  try {
    return await TodoModel.countDocuments(query);
  } catch (error) {
    return [];
  }
};

module.exports = {
  Create,
  Single,
  Delete,
  Index,
  Count,
};
