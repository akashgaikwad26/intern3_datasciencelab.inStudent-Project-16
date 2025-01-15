const { TABLE_NOTIFICATIONS } = require("../../Constants/Constants");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");

async function getNotifications(req, res) {
  try {
    const result = await getResponse(
      `SELECT * FROM ${TABLE_NOTIFICATIONS()} WHERE user_id = $1`,
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { getNotifications };
