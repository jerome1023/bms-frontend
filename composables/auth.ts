export const useLogin = async(value: any) => {
    const path = '/api/login'
    const data = await useApiFetch(path, {
        method: 'POST',
        body: {
            'email': value.email,
            'password': value.password
        }
    })

    return data;
}
