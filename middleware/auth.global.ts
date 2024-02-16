import { useUserStore } from "~/stores/user"

export default defineNuxtRouteMiddleware(async (route, redirect) => {
  if (process.client) {
    const userStore = useUserStore();
    await userStore.getUserDetails();

    if (!userStore.user.first_name && route.path !== '/login') {
      return navigateTo('/login');
    }
  }
});