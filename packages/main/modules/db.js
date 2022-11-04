import { Sequelize } from 'sequelize'
import Module from './module'
import { DataTypes } from 'sequelize'

class DB extends Module {
   db = null
   UserModel = null

   async load() {
      this.db = new Sequelize({
         dialect: 'sqlite',
         storage: 'db.sqlite'
      })
      await this.defineSchema()
      return new Promise((resolve, reject) => {
         resolve(this.db.authenticate())
      })
   }

   async defineSchema() {
      this.UserModel = this.db.define('User', {
         id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED
         },
         username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false
         }
      })
      // await this.db.sync({ force: true })
   }
}

export default DB
