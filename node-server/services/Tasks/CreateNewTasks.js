const { TABLE_TASKS } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { sendResponse } = require("../../utils/sendResponse");
const { assignTask } = require("./AssigenTask");

async function createNewTasks(req, res) {
  const { project_id, name, description, priority, due_date } = req.body;
  try {
    const result = await getResponse(
      `INSERT INTO ${TABLE_TASKS()} (project_id, name, description, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [project_id, name, description, priority, due_date]
    );
    // sendResponse(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}
// createNewTasks({body:{project_id:2, name:"demo t task",description:'Testing the Game of Life with predefined patterns like still lifes, oscillators, and spaceships.',priority:'high',due_date:'2025-01-27'}})

module.exports = { createNewTasks };
