export default class Module {
   loaded

   constructor() {
      this.loaded = false
   }

   async init() {
      if (this.loaded)
         throw new TypeError(
            `Module ${this.constructor.name} is already loaded`
         )
      this.load()
         .then(() => {
            console.log(`Module ${this.constructor.name} is loaded`)
            this.loaded = true
         })
         .catch(err => {
            console.log(err)
         })
   }
   load() {
      throw new Error(`Module ${this.constructor.name} must have a load method`)
   }
}
