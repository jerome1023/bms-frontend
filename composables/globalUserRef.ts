export const user = ref({});

export const getUser = async() => {
    const id = localStorage.getItem('id')
    const response = await useGetFetch(`users/${id}`)
    user.value = response.status == 200 ? response.data : null
}