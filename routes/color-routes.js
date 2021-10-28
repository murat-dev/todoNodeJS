const express = require("express");
const {
  addColor,
  getAllColors,
  deleteColor,
} = require("../controllers/colorsController");

const router = express.Router();

router.post("/color", addColor);
router.get("/colors", getAllColors);
router.delete("/color/:id", deleteColor);

module.exports = {
  routes: router,
};
