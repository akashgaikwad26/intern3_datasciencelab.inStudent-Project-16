const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const error = require("../../utils/error");
const { getResponse } = require("../../utils/getResponse");
const { TABLE_USERS } = require("../../Constants/Constants");
const { returnData } = require("../../utils/returnData");

async function Login(req, res) {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  try {
    const result = await getResponse(
      `SELECT * FROM ${TABLE_USERS()} WHERE email = $1`,
      [email]
    );
    console.log("result", result);
    if (result.rows.length === 0) return error(res, 404, "User not found");
    const user = result.rows[0];

    const match = await compare(password, user.password_hash);
    console.log("match", match);
    if (!match) return error(res, 403, "Invalid credentials");

    // const token = sign(
    //   { userId: user.user_id, role: user.role },
    //   process.env.JWT_SECRET
    // );
    // console.log("token", token);
    // res.json({ token });
    returnData(res, result);
  } catch (err) {
    error(res, 500, err.message);
  }
}

module.exports = { Login };
