const { Pool } = require("pg");
const dbconfig = require("../Config/config");

const pool = new Pool(dbconfig);

module.exports = pool;
