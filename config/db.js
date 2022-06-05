//import mysql from 'serverless-mysql';
const sql = require('mssql')

const sqlConfig = {
  user: 'sa',     //process.env.SQL_USER
  password: 'Y87dc#$98',
  database: 'AccountServer',
  server: 'DESKTOP-6T9A8EA\\SQLEXPRESS',

  pool: {
    max:10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true  //    true for local dev
  }
}

const pool = new sql.ConnectionPool({sqlConfig})


export { sqlConfig, pool };
