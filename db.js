const Pool = require("pg").Pool;

const {host, user, database, password, port, sslmode} = require('./config');

const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;