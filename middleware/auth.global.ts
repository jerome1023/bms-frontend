import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (route, redirect) => {
  // const { route, redirect } = context;

  if (process.client) {
    // const userStore = useUserStore();
    // await userStore.getUserDetails();

    // if (!userStore.user?.id && route.path !== '/login') {
    //   return navigateTo('/login');
    // }

    // else if (userStore.user?.id && route.path === '/login') {
    //   return navigateTo('/dashboard');
    // }
  }
});
