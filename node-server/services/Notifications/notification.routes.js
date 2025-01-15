const { authenticateToken } = require("../JWTAuth/JWTAuth");
const { getNotifications } = require("./GetNotifications");
const { markNotification } = require("./MarkNotification");
const { Router } = require("express");
// Notifications and Updates
const notificationRouter = Router();

// Get notifications for the user
notificationRouter.get("/", authenticateToken, async (req, res) => {
  await getNotifications(req, res);
});

// Mark notification as read
notificationRouter.put("/:id/read", authenticateToken, async (req, res) => {
  await markNotification(req, res);
});

module.exports = { notificationRouter };
