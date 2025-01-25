// Import necessary modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./services/UsersManagement/users.routes");
const { projectRouter } = require("./services/Projects/projects.routes");
// const { taskRouter } = require("./services/Tasks/tasks.routes");
// const { messageRouter } = require("./services/Message/message.routes");
// const {
//   notificationRouter,
// } = require("./services/Notifications/notification.routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//  ****************************************************************

// Use routers
app.use("/users", userRouter);
app.use("/projects", projectRouter);
// app.use("/tasks", taskRouter);
// app.use("/messages", messageRouter);
// app.use("/notifications", notificationRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
