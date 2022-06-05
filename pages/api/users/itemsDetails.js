import getConfig from 'next/config'
import { sqlConfig } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return getItemsDetails()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  //obtiene detalles de personaje
  async function getItemsDetails(){
    //const userId = req.user.sub
    const {item, reqType} = req.body
    let result = false
    //const attrids = [item.]
    console.log(req.body)
    switch (reqType) {
      case 'add':
          const itemsDetails =  await sql.connect(sqlConfig).then(() => {
          return sql.query`INSERT INTO [Tradedb].[dbo].[ItemInfo] (comID, itemID, itemNum, itemFlute, itemAttrID1, itemAttrVal1, itemAttrID2, itemAttrVal2, itemAttrID3, itemAttrVal3, itemAttrID4, itemAttrVal4, itemAttrID5, itemAttrVal5) VALUES (${item.comID}, ${item.itemID}, ${item.quantity}, ${item.flute}, ${item.attribute1Id}, ${item.attribute1Value}, ${item.attribute2Id}, ${item.attribute2Value}, ${item.attribute3Id}, ${item.attribute3Value}, ${item.attribute4Id}, ${item.attribute4Value}, ${item.attribute5Id}, ${item.attribute5Value})`

            if(itemsDetails.rowsAffected > 0){
              return res.status(200).json(itemsDetails)
            }else {
              throw 'bad insert'
            //sql.close()
          //DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${itemID} AND comID = ${packid}
        }})
      case 'delete':
          const deleteReq =  await sql.connect(sqlConfig).then(() => {
          return sql.query`DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${item.itemID} AND comID = ${item.packageID}`
          //DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${itemID} AND comID = ${packid}
          if(result.rowsAffected > 0){
                //return res.status(200).json('Item deleted')
                  result = 'Item deleted'
            //sql.close()
          }else {
            result = 'error delete'
          }
        })
      case 'updatePackage':
          const updateReq =  await sql.connect(sqlConfig).then(() => {
          return sql.query`UPDATE [Tradedb].[dbo].[StoreInfo] SET comName = ${item.comName}, comRemack = ${item.comRemack}, comPrice = ${item.comPrice}, isHot = ${item.isHot} WHERE comID = ${item.comID} AND comClass = ${item.comClass}`
          //DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${itemID} AND comID = ${packid}
          if(updateReq.rowsAffected > 0){
                //return res.status(200).json('Item deleted')
                  result = 'Item deleted'
            //sql.close()
          }
        })
        case 'addCat':
            const addCat =  await sql.connect(sqlConfig).then(() => {
            return sql.query`INSERT [Tradedb].[dbo].[ClassInfo] (clsName, parentID, isDel, delTime, buildTime) VALUES (${item.clsName}, ${item.parentID}, ${item.isDel}, ${item.delTime}, ${item.buildTime})`
            //DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${itemID} AND comID = ${packid}
            if(updateReq.rowsAffected > 0){
                  //return res.status(200).json('Item deleted')
                    result = 'Item deleted'
              //sql.close()
            }
          })
      default:
        result = 'error in request'
    }

    return res.status(200).json(result)

    //req.body.itemsRequest.map((x) => x.itemID
    //console.log(chracterDetails)

  }

}
