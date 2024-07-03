import { Tasks } from "../schema/task.schema.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Tasks.create({ title });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};

export { getTasks, createTask, updateTask, deleteTask };
