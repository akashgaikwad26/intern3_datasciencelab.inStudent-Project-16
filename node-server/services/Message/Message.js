const { TABLE_MESSAGES } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { sendResponse } = require("../../utils/sendResponse");

async function message(req, res) {
  const { project_id, content } = req.body;
  try {
    const result = await getResponse(
      `INSERT INTO ${TABLE_MESSAGES()} (sender_id, project_id, content) VALUES ($1, $2, $3) RETURNING *`,
      [req.user.userId, project_id, content]
    );
    sendResponse(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { message };
