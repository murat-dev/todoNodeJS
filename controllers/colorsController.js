const firebase = require("../db");
const Colors = require("../models/colors");
const firestore = firebase.firestore();

const addColor = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("colors").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllColors = async (req, res, next) => {
  try {
    const colors = await firestore.collection("colors");
    const data = await colors.get();
    const colorsArray = [];
    if (data.empty) {
      res.status(404).send("No color record found");
    } else {
      data.forEach((doc) => {
        const color = new Colors(doc.id, doc.data().hex, doc.data().name);
        colorsArray.push(color);
      });
      res.send(colorsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteColor = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("colors").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addColor,
  getAllColors,
  deleteColor,
};
