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

  //registro nuevo usuario
  async function newUser(){
    const {name, email, password} = JSON.parse(req.body)
    const hashPass = md5Hash.default(password).toUpperCase()
    const transaction = new sql.Transaction(pool)
    const request = new sql.Request(transaction)
    //const ps = new sql.PreparedStatement()
    //ps.input('name', sql.varchar(50), {username})
    //ps.input('password', sql.varchar(50), {password})
    //ps.input('email', sql.varchar(50), {email})

    const chracterExist =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT name FROM [AccountServer].[dbo].[account_login] WHERE name = ${name} OR [AccountServer].[dbo].[account_login].email = ${email}`
    })

    console.log(!chracterExist.rowsAffected[0] > 0)

    if(!chracterExist.rowsAffected[0] > 0){
      const insertAcc =  await sql.connect(sqlConfig).then(() => {
        return sql.query`INSERT INTO [AccountServer].[dbo].[account_login] (name, password, email) VALUES (${name}, ${hashPass}, ${email})`
      })
      if(insertAcc.rowsAffected[0] > 0){
        const insertGDB =  await sql.connect(sqlConfig).then(() => {
          return sql.query`INSERT INTO [GameDB].[dbo].[account] (act_id, act_name) VALUES ((SELECT MAX(act_id) + 1 FROM [GameDB].[dbo].[account]), ${name})`
        })
        if(insertGDB.rowsAffected[0] > 0){
          return res.status(200).json('Registered Successfully')
        }else {
          throw 'Errooooorrrr!!!~~~¬## GameDB INSERT'
        }
      }else {
        throw 'Errooooorrrr!!!~~~¬## AccountServer INSERT'
      }
      //sql.close()
    }else {
      throw 'Username or Email already exists'
    }
  }

}
