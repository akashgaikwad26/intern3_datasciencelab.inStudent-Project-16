const pool = require("./GetPool");

async function getResponse(query, options) {
  return await pool.query(query, options);
}

module.exports = { getResponse };
