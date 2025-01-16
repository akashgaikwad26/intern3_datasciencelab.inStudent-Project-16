const { compare } = require("bcrypt");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { TABLE_USERS } = require("../../Constants/Constants");
const { sendResponse } = require("../../utils/sendResponse");

async function Login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await getResponse(
      `SELECT * FROM ${TABLE_USERS()} WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) return error(res, 404, "User not found");

    const user = result.rows[0];
    const match = await compare(password, user.password_hash);

    if (!match) return error(res, 403, "Invalid credentials");

    return sendResponse(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { Login };
