const pool = require("./GetPool");

async function getResponse(query, options) {
  console.log(query)
  return await pool.query(query, options);
}

module.exports = { getResponse };
