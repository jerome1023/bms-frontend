import type { TResponse } from "~/types";

export const useAuth = async (value: any, endpoint: string) => {
    const path = `/api/${endpoint}`;
    const data = await useApiFetch(path, {
        method: "POST",
        body: {
            ...value,
        },
    });

    return data;
};

type TLogout = TResponse & {
    data: {};
};

export const logoutUser = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    const userStore = useUserStore();
    const router = useRouter();
    const path = "/api/logout";
    const data = await useApiFetch(path, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if ((<TLogout>data).status_code == 200) {
        userStore.logout();

        router.push("/login");
    }
};
