import getConfig from 'next/config'
import { sqlConfig } from '@config/db'
import {apiHandler} from '@helpers/api'
const sql = require('mssql')
const jwt = require('jsonwebtoken')
const md5Hash = require('md5-hash')
const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res){
  switch (req.method) {
    case 'POST':
        return authenticate()
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  //login de usuario
  async function authenticate(){

    const {username, password} = JSON.parse(req.body)
    const hashPass = md5Hash.default(password).toUpperCase()
    let userData = false
    const result =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT id, name, password, last_login_time, last_login_ip, email FROM [AccountServer].[dbo].[account_login] WHERE name = ${username} AND password = ${hashPass}`
    })
    
    if(result.rowsAffected > 0){
      const tradeData = await sql.connect(sqlConfig).then(() => {
        return sql.query`SELECT accID, accName, Money FROM [Tradedb].[dbo].[AccountInfo] WHERE accName = ${username}`
      })

      const accGameData = await sql.connect(sqlConfig).then(() => {
        return sql.query`SELECT act_name, gm, last_ip, last_leave FROM [GameDB].[dbo].[account] WHERE act_name = ${username}`
      })

      //Buscar personajes de usuario
      await sql.connect(sqlConfig).then(() => {
        return sql.query`SELECT * FROM [GameDB].[dbo].[account] INNER JOIN [GameDB].[dbo].[character] ON [GameDB].[dbo].[character].act_id = [GameDB].[dbo].[account].act_id WHERE [GameDB].[dbo].[account].act_name = ${result.recordsets[0][0].name} AND [GameDB].[dbo].[character].delflag = 0 `
      }).then(resultDB => {
        const isGM = accGameData.recordsets[0][0].gm == 99
        const fakeGM = accGameData.recordsets[0][0].gm == 1

        if(resultDB.rowsAffected > 0){
          const token = jwt.sign({sub: resultDB.recordsets[0][0].act_id[0]}, serverRuntimeConfig.secret, {expiresIn:'7d'})
          const tokenAdmin = isGM ? jwt.sign({sub: resultDB.recordsets[0][0].act_id[0]}, serverRuntimeConfig.secretAdmin, {expiresIn:'7d'}) : false
          return res.status(200).json({
            name: resultDB.recordsets[0][0].act_name,
            userIdGame: resultDB.recordsets[0][0].act_ids,
            charractersUser: resultDB.recordsets[0][0].cha_ids,
            crystals: tradeData.rowsAffected > 0 ? tradeData.recordsets[0][0].Money : '0',
            honor : '0',
            //gmLevel: resultDB.recordsets[0][0].gm,
            lastLoginTime: result.recordsets[0][0].last_login_time,
            lastLoginIp: result.recordsets[0][0].last_login_ip,
            email: result.recordsets[0][0].email,
            token,
            tokenAdmin
          })
        }else {
          const token = jwt.sign({sub: result.recordsets[0][0].id}, serverRuntimeConfig.secret, {expiresIn:'7d'})
          const tokenAdmin = isGM ? jwt.sign({sub: result.recordsets[0][0].act_id[0]}, serverRuntimeConfig.secretAdmin, {expiresIn:'7d'}) : false
          return res.status(200).json({
            name: result.recordsets[0][0].name,
            userIdGame: result.recordsets[0][0].id,
            charractersUser: '0',
            crystals: '0',
            honor : '0',
            //gmLevel: resultDB.recordsets[0][0].gm,
            lastLoginTime: result.recordsets[0][0].last_login_time,
            lastLoginIp: result.recordsets[0][0].last_login_ip,
            email: result.recordsets[0][0].email,
            token,
            tokenAdmin
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      //sql.close()
    }else {
      throw 'No hay resultados'
    }
  }

}
