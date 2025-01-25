// Import necessary modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./services/UsersManagement/users.routes");
const { projectRouter } = require("./services/Projects/projects.routes");
const { taskRouter } = require("./services/Tasks/tasks.routes");
const { messageRouter } = require("./services/Message/message.routes");
const {
  notificationRouter,
} = require("./services/Notifications/notification.routes");
const schedule = require('node-schedule');
const { notificationCronJob } = require("./CronJobs/Notification.CronJob");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//  ****************************************************************

// cron jobs                      s m h d mo dow
// let jobs = schedule.scheduleJob('*/5 * * * * *',notificationCronJob)

// Use routers
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/messages", messageRouter);
app.use("/notifications", notificationRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
