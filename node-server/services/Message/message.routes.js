const { Router } = require("express");
const { authenticateToken } = require("../JWTAuth/JWTAuth");
const { message } = require("./Message");

// Real-time Communication and Message Handling
const messageRouter = Router();

// Send a message
messageRouter.post("/", authenticateToken, async (req, res) => {
  await message(req, res);
});

module.exports = { messageRouter };
