import { Tasks } from "../schema/task.schema.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createTask = (req, res) => {};
const updateTask = (req, res) => {};
const deleteTask = (req, res) => {};

export { getTasks, createTask, updateTask, deleteTask };
