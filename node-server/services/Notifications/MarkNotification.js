const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");

async function markNotification(req, res) {
  const { id } = req.params;
  try {
    await getResponse(
      `UPDATE ${TABLE_NOTIFICATIONS()} SET is_read = TRUE WHERE notification_id = $1 AND user_id = $2`,
      [id, req.user.userId]
    );
    res.sendStatus(204);
  } catch (err) {
    error(res, 500, err.message);
  }
}
module.exports = { markNotification };
