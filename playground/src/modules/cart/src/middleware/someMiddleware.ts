export default defineNuxtRouteMiddleware((to, from) => {
  console.warn('Running middleware "someMiddleware"')
})
