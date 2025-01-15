const { Router } = require("express");
const { signUp } = require("./SignUp");
const { Login } = require("./Login");

// Routes for User Management
const userRouter = Router();

// Signup
userRouter.post("/signup", async (req, res) => {
  await signUp(req, res);
});

// Login
userRouter.post("/login", async (req, res) => {
  await Login(req, res);
});

module.exports = { userRouter };
