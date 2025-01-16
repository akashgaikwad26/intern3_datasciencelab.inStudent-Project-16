const { TABLE_TASKS } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { sendResponse } = require("../../utils/sendResponse");

async function createNewTasks(req, res) {
  const { project_id, name, description, priority, due_date } = req.body;
  try {
    const result = await getResponse(
      `INSERT INTO ${TABLE_TASKS()} (project_id, name, description, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [project_id, name, description, priority, due_date]
    );
    sendResponse(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { createNewTasks };
