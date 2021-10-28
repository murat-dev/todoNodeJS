const express = require("express");
const {
  addList,
  getAllLists,
  getList,
  updateList,
  deleteList,
} = require("../controllers/listsController");

const router = express.Router();

router.post("/list", addList);
router.get("/lists", getAllLists);
router.get("/list/:id", getList);
router.put("/list/:id", updateList);
router.delete("/list/:id", deleteList);

module.exports = {
  routes: router,
};
