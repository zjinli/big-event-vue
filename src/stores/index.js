import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia

// import { useUserStore } from './modules/user'

// import { useCountStore } from './modules/count'
// export { useUserStore, useCountStore }
export * from './modules/user.js'
export * from './modules/count.js'
export * from './modules/article.js'
