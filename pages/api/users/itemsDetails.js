import getConfig from 'next/config'
import { sqlConfig } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return getItemsDetails2()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getItemsDetails(){
    //const userId = req.user.sub
    const {item, reqType} = req.body
    let result = false
    //const attrids = [item.]
    console.log(req.body)

      switch (reqType) {
        case 'addCat':
              const addCategorie =  await sql.connect(sqlConfig).then(() => {
              return sql.query`INSERT [Tradedb].[dbo].[ClassInfo] (clsName, parentID, isDel, delTime, buildTime) VALUES (${item.clsName}, ${item.parentID}, ${item.isDel}, ${item.delTime}, ${item.buildTime})`
              //DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${itemID} AND comID = ${packid}
              //if(addCategorie.rowsAffected > 0){
                    //return res.status(200).json('Item deleted')
                      //result = 'categorie inserted'
                      return res.status(200).json('categorie inserted')
                //sql.close()
              //}
            })
        default:
          return res.status(400).json(result)
      }

    //return res.status(200).json(result)
    //req.body.itemsRequest.map((x) => x.itemID
    //console.log(chracterDetails)

  }
  //obtiene detalles de personaje
  async function getItemsDetails2(){
    //const userId = req.user.sub
    const {item, reqType} = req.body
    let result = false
    //const attrids = [item.]
    //console.log(req.body)

      switch (reqType) {
        case 'addItem':
            const itemsDetails =  await sql.connect(sqlConfig).then(() => {
            return sql.query`INSERT INTO [Tradedb].[dbo].[ItemInfo] (comID, itemID, itemNum, itemFlute, itemAttrID1, itemAttrVal1, itemAttrID2, itemAttrVal2, itemAttrID3, itemAttrVal3, itemAttrID4, itemAttrVal4, itemAttrID5, itemAttrVal5) VALUES (${item.comID}, ${item.itemID}, ${item.quantity}, ${item.flute}, ${item.attribute1Id}, ${item.attribute1Value}, ${item.attribute2Id}, ${item.attribute2Value}, ${item.attribute3Id}, ${item.attribute3Value}, ${item.attribute4Id}, ${item.attribute4Value}, ${item.attribute5Id}, ${item.attribute5Value})`})
            if(itemsDetails.rowsAffected > 0){
            return res.status(200).json('Item inserted')}else{
            return res.status(405).end('Error on insert item')}
            break
        case 'deleteItem':
            const deleteReq =  await sql.connect(sqlConfig).then(() => {
            return sql.query`DELETE FROM [Tradedb].[dbo].[ItemInfo] WHERE itemID= ${item.itemID} AND comID = ${item.packageID}`})
            if(deleteReq.rowsAffected > 0){
            return res.status(200).json('Item deleted')}else{
            return res.status(405).end('Error on delete item')}
            break
        case 'updatePackage':
          console.log('update')
            const updateReq =  await sql.connect(sqlConfig).then(() => {
            return sql.query`UPDATE [Tradedb].[dbo].[StoreInfo] SET comName = ${item.comName}, comRemack = ${item.comRemack}, comPrice = ${item.comPrice}, isHot = ${item.isHot} WHERE comID = ${item.comID} AND comClass = ${item.comClass}`})
            if(updateReq.rowsAffected > 0){
            return res.status(200).json('Package updated')}else{
            return res.status(405).end('Error on update package')}
            break
            break
        case 'addCat':
              const addCategorie =  await sql.connect(sqlConfig).then(() => {
              return sql.query`INSERT [Tradedb].[dbo].[ClassInfo] (clsName, parentID, isDel, delTime, buildTime) VALUES (${item.clsName}, ${item.parentID}, ${item.isDel}, ${item.delTime}, ${item.buildTime})`})
              if(addCategorie.rowsAffected > 0){
              return res.status(200).json('Item deleted')}else{
              return res.status(405).end('Error on insert')}
            break
        case 'delCat':
              const delCategorie =  await sql.connect(sqlConfig).then(() => {
              return sql.query`DELETE FROM [Tradedb].[dbo].[ClassInfo] WHERE clsID = ${item.clsID}`})
              if(delCategorie.rowsAffected > 0){
              return res.status(200).json('Categorie deleted')}else{
              return res.status(405).end('Error on delete categorie')}
            break
        case 'delPack':
            const delPack =  await sql.connect(sqlConfig).then(() => {
            return sql.query`DELETE FROM [Tradedb].[dbo].[StoreInfo] WHERE comID = ${item.comID}`})
            if(delPack.rowsAffected > 0){
            return res.status(200).json('Categorie deleted')}else{
            return res.status(405).end('Error on delete categorie')}
            break
        case 'addPackToCat':
              const addPack =  await sql.connect(sqlConfig).then(() => {
              return sql.query`INSERT INTO [Tradedb].[dbo].[StoreInfo] (comName, comClass, comPrice, comRemack, isHot, comTime, beginTime, comExpire, comNumber, isDel, delTime) VALUES (${item.comName}, ${item.comClass}, ${item.comPrice}, ${item.comRemack}, ${item.isHot}, ${item.comTime}, ${item.beginTime}, ${item.comExpire}, ${item.comNumber}, ${item.isDel}, ${item.delTime})`})
                if(addPack.rowsAffected > 0){
                return res.status(200).json('Package inserted')}else{
                return res.status(405).end('Error on add categorie')}
                break
            break
        default:
          return res.status(405).end('error')
      }

      //return res.status(200).json(result)

    //req.body.itemsRequest.map((x) => x.itemID
    //console.log(chracterDetails)

  }

}
