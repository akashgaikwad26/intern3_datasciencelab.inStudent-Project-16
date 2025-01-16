function sendResponse(res, result) {
  return res.status(201).json(result.rows[0]);
}
module.exports = { sendResponse };
