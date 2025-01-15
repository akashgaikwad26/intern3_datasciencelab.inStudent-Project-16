const fs = require("fs");

const dbconfig = {
  user: "myadmin",
  host: "pravinyam-dev-do-user-9198634-0.b.db.ondigitalocean.com",
  database: "defaultdb",
  password: "bugya@1969!@#$",
  port: 25060,
  _connectionTimeoutMillis: 0,
  idleTimeoutMillis: 2000,
  ssl: {
    ca: fs.readFileSync(__dirname + "/ca-certificate.crt"),
  },
};

module.exports = dbconfig;
