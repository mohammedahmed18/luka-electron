export const init = async (...modules) => {
   await Promise.all(modules.map(async module => await module.init()))
}
