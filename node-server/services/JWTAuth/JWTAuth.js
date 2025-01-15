const { verify } = require("jsonwebtoken");
const { sendStatus } = require("../../utils/sendStatus");

// Middleware for verifying JWT tokens
function authenticateJWTToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return sendStatus(res, 401);

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return sendStatus(res, 403);
    req.user = user;
    next();
  });
}

const authenticateToken = (req, res, next) => {
  authenticateJWTToken(req, res, next);
};
module.exports = { authenticateToken };
