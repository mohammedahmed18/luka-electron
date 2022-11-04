import Module from './module'
import { ipcMain } from 'electron'
import channels from './../../shared/lib/ipc-channels'
import { DataTypes } from 'sequelize'
import JsonError from '../lib/JsonError'

class Category extends Module {
   db
   constructor(_db) {
      super()
      this.db = _db
   }

   async load() {
      //    define user model
      const CategoryModel = this.db.define('Category', {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         }
      })

      await CategoryModel.sync({ force: true })

      return new Promise((resolve, _) => {
         resolve('done')
      })
   }
}

export default User
