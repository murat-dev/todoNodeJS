const firebase = require("../db");
const Lists = require("../models/lists");
const firestore = firebase.firestore();

const addList = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("lists").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    const lists = await firestore.collection("lists");
    const data = await lists.get();
    const listsArray = [];
    if (data.empty) {
      res.status(404).send("No list record found");
    } else {
      data.forEach((doc) => {
        const lists = new Lists(doc.id, doc.data().name, doc.data().colorId);
        listsArray.push(lists);
      });
      res.send(listsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await firestore.collection("lists").doc(id);
    const data = await student.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const lists = await firestore.collection("lists").doc(id);
    await lists.update(data);
    res.send("lists record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("lists").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addList,
  getAllLists,
  getList,
  updateList,
  deleteList,
};
