import getConfig from 'next/config'
import { sqlConfig } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getAccDetails()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  //obtiene detalles de personaje
  async function getAccDetails(){
    const userId = req.user.sub
    //console.log(req.user)
    const accDetails =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT * FROM [AccountServer].[dbo].[account_login]`
    })
    const tradeDetails =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT * FROM [Tradedb].[dbo].[AccountInfo]`
    })
    //console.log(chracterDetails)
    if(accDetails.rowsAffected > 0){
          //console.log(tradeDetails)
          return res.status(200).json({accDetails:accDetails.recordsets, tradeDetails:tradeDetails.rowsAffected > 0 ? tradeDetails.recordsets : ''})
      //sql.close()
    }else {
      throw 'No tiene personajes creados'
    }
  }

}
