import Module from './module'
import teeny from 'teeny-conf'
import { app } from 'electron'
import path from 'path'

class ConfigModule extends Module {
   config

   load() {
      const pathToConfig = path.join(app.getPath('userData'), 'config.json')
      this.config = new teeny(pathToConfig, this.getDefaultConfig())

      return new Promise((resolve, reject) => {
         resolve(this.config.save())
      })
   }

   async set(key, value) {
      this.config.set(key, value)
   }

   async get(key) {
      return this.config.get(key)
   }

   async save() {
      this.config.save
   }

   getDefaultConfig() {
      return {
         themeId: 1
      }
   }
}
export default ConfigModule
