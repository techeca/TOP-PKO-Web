import getConfig from 'next/config'
import { sqlConfig, sqlConfigDB, pool } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const jwt = require('jsonwebtoken')
const md5Hash = require('md5-hash')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getCharDetails()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getCharDetails(){
    const userId = req.user.sub
    const chracterDetails =  await sql.connect(sqlConfigDB).then(() => {
      return sql.query`SELECT * FROM [GameDB].[dbo].[character] WHERE act_id = ${userId} AND [GameDB].[dbo].[character].delflag = 0`
    })
    //console.log(chracterDetails)
    if(chracterDetails.rowsAffected > 0){
          return res.status(200).json(chracterDetails.recordsets)
      //sql.close()
    }else {
      throw 'No tiene personajes creados'
    }
  }

}
