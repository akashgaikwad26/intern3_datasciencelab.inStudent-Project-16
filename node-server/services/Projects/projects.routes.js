const { Router } = require("express");
const { authenticateToken } = require("../JWTAuth/JWTAuth");
const { createNewProject } = require("./CreateNewProject");
const { allProjects } = require("./AllProjects");

// Routes for Project and Task Management
const projectRouter = Router();

// Create a new project
projectRouter.post("/", async (req, res) => {
  await createNewProject(req, res);
});

// Get all projects
projectRouter.get("/", async (req, res) => {
  await allProjects(req, res);
});

module.exports = { projectRouter };
