const mongoose = require("mongoose");

// Define the Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    enum: ["to-do", "in-progress", "checking", "done"],
    default: "to-do", // Default section is "to-do"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
