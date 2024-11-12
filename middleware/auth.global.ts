import type { TObjectLiteral } from "~/types";

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) {
    const userStore = useUserStore();
    await userStore.getUserDetails();

    const authExceptions = ["/login", "/register"];

    const roleBasedRoutes: TObjectLiteral = {
      Administrator: [
        "/dashboard",
        "/barangay-official",
        "/resident/list",
        "/resident/manage-account",
        "/request/pending",
        "/request/approved",
        "/request/disapproved",
        "/transaction",
        "/announcement",
        "/blotter",
        "/archive",
        "/edit-profile",
        "/management",
      ],
      User: [
        "/announcement",
        "/request/new",
        "/request/pending",
        "/request/approved",
        "/request/disapproved",
        "/transaction",
        "/edit-profile",
      ],
    };

    const defaultRedirects: TObjectLiteral = {
      Administrator: "/dashboard",
      User: "/announcement",
    };

    const authRestrictedRoutes = ["/login", "/register", "/"];

    if (authRestrictedRoutes.includes(to.path) && userStore.user.id) {
      const userRole = userStore.user.role.name;
      return navigateTo(defaultRedirects[userRole]);
    }

    if (!authExceptions.includes(to.path)) {
      if (!userStore.user.id) {
        return navigateTo("/login");
      }

      const userRole = userStore.user.role.name;
      if (
        roleBasedRoutes[userRole] &&
        !roleBasedRoutes[userRole].includes(to.path)
      ) {
        return window.history.back();
      }
    }
  }
});
