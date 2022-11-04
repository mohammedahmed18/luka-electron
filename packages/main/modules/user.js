import Module from './module'
import { ipcMain } from 'electron'
import jwt from 'jsonwebtoken'
import channels from './../../shared/lib/ipc-channels'
import JsonError from '../lib/JsonError'
import bcrypt from 'bcrypt'

class User extends Module {
   db = null
   model = null
   constructor(_db) {
      super()
      this.db = _db.db
      this.model = _db.UserModel
   }

   async load() {
      //    add new user
      ipcMain.handle(channels.ADD_USER, async (_, { username, password }) => {
         // search for username
         const user = await this.model.findOne({
            where: { username }
         })
         //  //////////// user exist
         if (user) {
            return JsonError('this username already exists')
         }
         const hash = bcrypt.hashSync(password, 10)
         return await this.model.create({ username, password: hash })
      })

      //  log in
      ipcMain.handle(channels.LOG_IN, async (_, { username, password }) => {
         const user = await this.model.findOne({
            where: { username }
         })
         if (!user) return JsonError('invalid username or password')

         const access = await bcrypt.compare(password, user.password)

         // wrong password
         if (!access) return JsonError('invalid username or password')
         const token = await jwt.sign(user.dataValues, 'SECRET_KEY', {
            expiresIn: '15h'
         })
         // right password
         return token
      })

      return new Promise((resolve, _) => {
         resolve('done')
      })
   }
}

export default User
