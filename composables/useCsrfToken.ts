export async function useCsrfToken(): Promise<string> {
    const token = useCookie('XSRF-TOKEN');
    const config = useRuntimeConfig();
    const csrfToken = ref(token.value);
  
    !csrfToken.value &&
    await useFetch(config.public.backendURL + '/sanctum/csrf-cookie', {
      credentials: 'include',
      server: false,
      lazy: true
    }).then(() => {
      const updatedToken = useCookie('XSRF-TOKEN');
      csrfToken.value = updatedToken.value;
    });
  
    return csrfToken.value as string;
}