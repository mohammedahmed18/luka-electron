export const init = async (...modules) => {
   await Promise.all(
      modules.map(module =>
         module.init().catch(err => {
            throw err
         })
      )
   )
}
