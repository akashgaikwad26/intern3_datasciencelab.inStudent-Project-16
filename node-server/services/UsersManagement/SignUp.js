const { hash } = require("bcrypt");
const error = require("../../utils/error");
const { returnData } = require("../../utils/returnData");
const { TABLE_USERS } = require("../../Constants/Constants");
const { getResponse } = require("../../utils/getResponse");

async function signUp(req, res) {
  console.log("body", req.body);
  const { username, email, password, role } = req.body;
  // console.log`username: ${username}, email: ${email}, password: ${password}, role: ${role}`;
  const hashedPassword = await hash(password, 10);
  try {
    const result = await getResponse(
      `INSERT INTO ${TABLE_USERS()} (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, hashedPassword, role]
    );
    console.log("result", result);
    returnData(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { signUp };
