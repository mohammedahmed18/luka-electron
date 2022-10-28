import { Sequelize } from 'sequelize'
import Module from './module'
// import { app } from 'electron'
// import path from 'path'
class DB extends Module {
   db
   async load() {
      this.db = new Sequelize({
         dialect: 'sqlite',
         storage: 'db.sqlite'
      })

      return new Promise((resolve, reject) => {
         resolve(this.db.authenticate())
      })
   }
}

export default DB
