import type { NitroFetchOptions, AvailableRouterMethod, NitroFetchRequest } from 'nitropack'

export async function useApiFetch<T>(
    path: string,
    options: NitroFetchOptions<NitroFetchRequest,AvailableRouterMethod<NitroFetchRequest>> = {}
) {
    const config = useRuntimeConfig();
    const token = await useCsrfToken();
    // const authStore = useAuthStore()

    const response = await $fetch(`${path}`, {
        baseURL: config.public.backendURL,
        credentials: 'include',
        ...options,
        headers: {
            ...options?.headers,
            'Accept': 'application/json',
            'X-XSRF-TOKEN': token,
            'Content-Type': 'application/json'
        },
        ignoreResponseError: true,
        async onResponse({ request, response, options }) {
            if (response.status === 401 && !request.toString().includes('/logout')) {
                // authStore.logout()
            }
        },
    })

    return response
}