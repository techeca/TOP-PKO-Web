import getConfig from 'next/config'
import { sqlConfig, pool } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const jwt = require('jsonwebtoken')
const md5Hash = require('md5-hash')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return newUser()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function newUser(){
    const {username, password, email} = JSON.parse(req.body)
    const request = new sql.Request(pool)
    const ps = new sql.PreparedStatement()
    //ps.input('name', sql.varchar(50), {username})
    //ps.input('password', sql.varchar(50), {password})
    //ps.input('email', sql.varchar(50), {email})

    const chracterExist =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT name FROM [AccountServer].[dbo].[account_login] WHERE name = ${username} OR [AccountServer].[dbo].[account_login].email = ${email}`
    })
    //const result = request.query('INSERT INTO [AccountServer].[dbo].[account_login] VALUES ()')
    //console.log(chracterDetails)
    if(!chracterExist.rowsAffected > 0){


          return res.status(200).json(chracterExist.recordsets)
      //sql.close()
    }else {
      throw 'Username or Email already exists'
    }
  }

}
