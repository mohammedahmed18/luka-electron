import { Sequelize } from 'sequelize'
import Module from './module'
// import { app } from 'electron'
// import path from 'path'
class DB extends Module {
   async load() {
      const sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: 'db.sqlite'
      })

      return new Promise((resolve, reject) => {
         resolve(sequelize.authenticate())
      })
   }
}

export default DB
