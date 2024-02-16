export const useAuth = async(value: any, endpoint: string) => {
    const path = `/api/${endpoint}`
    const data = await useApiFetch(path, {
        method: 'POST',
        body: {
            ...value
        }
    })

    return data;
}
