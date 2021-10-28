const express = require("express");
const {
  addtask,
  getAllTasks,
  gettask,
  updatetask,
  deletetask,
} = require("../controllers/tasksController");

const router = express.Router();

router.post("/task", addtask);
router.get("/tasks", getAllTasks);
router.get("/task/:id", gettask);
router.put("/task/:id", updatetask);
router.delete("/task/:id", deletetask);

module.exports = {
  routes: router,
};
