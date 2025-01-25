const { TABLE_PROJECTS } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { sendResponse } = require("../../utils/sendResponse");

async function createNewProject(req, res) {
  const { name, description, deadline } = req.body;
  try {
    const result = await getResponse(
      `INSERT INTO ${TABLE_PROJECTS()} (name, description, deadline, created_by) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, deadline, req.query.userId]
    );
    sendResponse(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = {
  createNewProject,
};
