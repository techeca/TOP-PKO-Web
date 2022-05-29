import getConfig from 'next/config'
import { sqlConfig, sqlConfigDB } from '@config/db'
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

  async function authenticate(){

    const {username, password} = JSON.parse(req.body)
    const hashPass = md5Hash.default(password).toUpperCase()
    let userData = false
    const result =  await sql.connect(sqlConfig).then(() => {
      return sql.query`SELECT id, name, password, last_login_time, last_login_ip, email FROM [AccountServer].[dbo].[account_login] WHERE name = ${username} AND password = ${hashPass}`
    })
    console.log(result)
    //sql.close()

    //console.log(result.recordsets[0][0].id)
    if(result.rowsAffected > 0){
      //console.log('hay resultados')
      await sql.connect(sqlConfigDB).then(() => {
        return sql.query`SELECT * FROM [GameDB].[dbo].[account] INNER JOIN [GameDB].[dbo].[character] ON [GameDB].[dbo].[character].act_id = [GameDB].[dbo].[account].act_id WHERE [GameDB].[dbo].[account].act_name = ${result.recordsets[0][0].name} AND [GameDB].[dbo].[character].delflag = 0`
      }).then(resultDB => {
        if(resultDB.rowsAffected > 0){
          //console.log(resultDB.recordsets[0][0].act_id[0])
          //resultDB[0][0].cha_ids.map((char) => charsUser.push(char))
          const token = jwt.sign({sub: resultDB.recordsets[0][0].act_id[0]}, serverRuntimeConfig.secret, {expiresIn:'7d'})
          return res.status(200).json({
            name: resultDB.recordsets[0][0].act_name,
            userIdGame: resultDB.recordsets[0][0].act_ids,
            charractersUser: resultDB.recordsets[0][0].cha_ids,
            gmLevel: resultDB.recordsets[0][0].gm,
            lastLoginTime: result.recordsets[0][0].last_login_time,
            lastLoginIp: result.recordsets[0][0].last_login_ip,
            email: result.recordsets[0][0].email,
            token
          })
        }
      }).catch((err) => {
        //console.log(err)
      })
      //sql.close()
    }else {
      throw 'No hay resultados'
    }
    //pool.close()
    //md5Hash.default(result.password)

    //console.log(result.password)
    //Se encripta la contraseña con bcrypt
    //var hash = await bcrypt.hash(password, 10);
    //Query para buscar email en BD
    //let results = await conn.query('SELECT name FROM account_login WHERE name = ?', [username])
    //const stringdata = JSON.stringify(results)
    //const parsedata1 = JSON.parse(stringdata)
    //conn.end()

    //Si hay resultados
  //  if(parsedata1.length>0){
        //Guardamos hash de BD
        //const storedPass = parsedata1[0]['hash']
        //Validamos que password es igual a hash de BD
        //const match = await bcrypt.compare(password, storedPass);
      //  if(true){
            //let results2 = await conn.query('SELECT idUsers, name, lastName, rut, phone, email, hash FROM users WHERE email = ?', [username])
            //const stringdata2 = JSON.stringify(results2)
            //const parsedata = JSON.parse(stringdata2)
            //conn.end()
            //Enviamos token con los datos del usuario
            //res.cookie('token', generateToken(parsedata[0]), {maxAge: 300 * 1000});


      //    }else {
            //Pasword y hash distintos
      //      throw 'Username or password is incorrect'
      //    }
      //  }
  }

}
