const { TABLE_PROJECTS } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/error");

async function allProjects(req, res) {
  try {
    const result = await getResponse(
      `SELECT * FROM ${TABLE_PROJECTS()} WHERE created_by = $1`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { allProjects };
