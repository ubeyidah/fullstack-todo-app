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
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: id },
      { title, isCompleted }
    );
    if (!updatedTask) return res.sataus(404).json({ msg: "Task not found" });
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const deleteTask = async (req, res) => {};

export { getTasks, createTask, updateTask, deleteTask };
