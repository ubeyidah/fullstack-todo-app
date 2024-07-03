import { Tasks } from "../schema/task.schema.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findOne({ _id: id });
    if (!task)
      return res.sataus(404).json({ msg: "Task not found", success: false });
    res.status(200).json(task);
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
    if (!updatedTask)
      return res.sataus(404).json({ msg: "Task not found", success: false });
    res.status(200).json({ msg: "Task updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findOneAndDelete({ _id: id });
    if (!deletedTask)
      return res.sataus(404).json({ msg: "Task not found", success: false });
    res.status(200).json({ msg: "Task deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { getTasks, createTask, updateTask, deleteTask, getTask };
