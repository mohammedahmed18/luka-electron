import Module from './module'
import { ipcMain } from 'electron'
import channels from './../../shared/lib/ipc-channels'
import { DataTypes } from 'sequelize'
import JsonError from '../lib/JsonError'
import bcrypt from 'bcrypt'
class User extends Module {
   db
   constructor(_db) {
      super()
      this.db = _db
   }
   async load() {
      //    define user model
      const UserModel = this.db.define('User', {
         username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false
         }
      })

      await UserModel.sync({ force: true })

      //    add new user
      ipcMain.handle(channels.ADD_USER, async (event, data) => {
         // search for username
         const user = await UserModel.findOne({
            where: { username: data.username }
         })
         if (user) {
            return JsonError('this username already exists')
         }
         //  hash the password
         bcrypt.hash(data.password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) return JsonError(err.message)
            return await UserModel.create({ ...data, password: hash })
         })
      })

      //   log in

      return new Promise((resolve, _) => {
         resolve('done')
      })
   }
}

export default User
