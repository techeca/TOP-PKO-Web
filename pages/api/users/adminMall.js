import getConfig from 'next/config'
import { sqlConfig } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'GET':
        return getMallDetails()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  //obtiene detalles de personaje
  async function getMallDetails(){
    let items = ''
    //const userId = req.user.sub
    //console.log(req.user)
    const catMall =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT * FROM [Tradedb].[dbo].[ClassInfo]`
    })
    const pacMall = await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT * FROM [Tradedb].[dbo].[StoreInfo]`
    })
    const itemMall = await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT * FROM [Tradedb].[dbo].[ItemInfo] INNER JOIN [WebDB].[dbo].[items] ON [Tradedb].[dbo].[ItemInfo].itemID = [WebDB].[dbo].[items].item_id`
      //SELECT * FROM [WebDB].[dbo].[items] INNER JOIN [Tradedb].[dbo].[ItemInfo] ON [WebDB].[dbo].[items].item_Id = [Tradedb].[dbo].[ItemInfo].itemID WHERE [GameDB].[dbo].[account].act_name = ${result.recordsets[0][0].name} AND [GameDB].[dbo].[character].delfla

    })
  //  const itemMallDetails = await sql.connect(sqlConfig).then(() => {
  //    return sql.query`SELECT * FROM [WebDB].[dbo].[items]`
  //  })

    //console.log(itemMall)
    if(catMall.rowsAffected > 0){
          return res.status(200).json({categories:catMall.recordset, package:pacMall.recordset, items:itemMall.recordset})
      //sql.close()
    }else {
      throw 'No characters in DB'
    }
  }

}
