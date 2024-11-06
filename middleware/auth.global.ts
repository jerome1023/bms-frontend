export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
      const userStore = useUserStore()
      await userStore.getUserDetails()

      const authExceptions = [
          '/login', 
          '/register', 
          '/invalid-page'
      ]

      if (!authExceptions.includes(to.path)) {
          if (!userStore.user.id) {
              return navigateTo('/login')
          }
      }

      // const privacyStatusExceptions = [
      //     '/login', 
      //     '/register', 
      //     '/forgot-password',
      //     '/reset-password',
      //     '/privacy-policy',
      //     '/terms-and-condition',
      //     '/user-activate',
      //     '/dashboard',            
      //     '/invalid-page'
      // ]

      // if (!privacyStatusExceptions.includes(to.path)) {
      //     if (authStore.hasAgreedDataPrivacy === false) {
      //         return navigateTo('/dashboard')
      //     }
      // }
  }
})
