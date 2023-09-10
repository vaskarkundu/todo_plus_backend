const UserModel = require("../models/user.model");

const Create = async (data) => {
  const user = new UserModel(data);
  return await user.save();
};

const Single = async (query) => {
  return await UserModel.findOne(query);
};
module.exports = {
  Create,
  Single,
};
