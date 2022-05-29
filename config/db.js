//import mysql from 'serverless-mysql';
const sql = require('mssql')

const sqlConfig = {
  user: process.env.SQL_USER,
  password: 'Y87dc#$98',
  database: process.env.SQL_DATABASE,
  server: '192.168.0.8\\SQLEXPRESS',

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

const sqlConfigDB = {
  user: process.env.SQL_USER,
  password: 'Y87dc#$98',
  database: process.env.SQL_DATABASE_GDB,
  server: process.env.SQL_HOST,
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


export { sqlConfig, sqlConfigDB, pool };
