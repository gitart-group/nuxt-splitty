export default defineNuxtRouteMiddleware((to, from) => {
  console.warn('Running middleware "elseMiddleware.global"')
})
