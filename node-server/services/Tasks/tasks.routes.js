const { Router } = require("express");
const { createNewTasks } = require("./CreateNewTasks");
const { authenticateToken } = require("../JWTAuth/JWTAuth");

const taskRouter = Router();

// Create a new task
taskRouter.post("/", authenticateToken, async (req, res) => {
  await createNewTasks(req, res);
});

module.exports = { taskRouter };
