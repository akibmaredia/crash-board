const Pool = require("pg").Pool;

const {host, user, database, password, port} = require('./config');

const pool = new Pool({
  host,
  user,
  password,
  database,
  port
});

module.exports = pool;