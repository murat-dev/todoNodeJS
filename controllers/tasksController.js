const firebase = require("../db");
const Tasks = require("../models/tasks");
const firestore = firebase.firestore();

const addtask = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("tasks").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await firestore.collection("tasks");
    const data = await tasks.get();
    const tasksArray = [];
    if (data.empty) {
      res.status(404).send("No task record found");
    } else {
      data.forEach((doc) => {
        const task = new Tasks(
          doc.id,
          doc.data().listId,
          doc.data().text,
          doc.data().completed
        );
        tasksArray.push(task);
      });
      res.send(tasksArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const gettask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await firestore.collection("tasks").doc(id);
    const data = await task.get();
    if (!data.exists) {
      res.status(404).send("task with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatetask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const task = await firestore.collection("tasks").doc(id);
    await task.update(data);
    res.send("task record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletetask = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("tasks").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addtask,
  getAllTasks,
  gettask,
  updatetask,
  deletetask,
};
