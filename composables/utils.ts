export const useGetFetch = async (path: string): Promise<any> => {
    const token = localStorage.getItem('token')
    const apiPath = `/api/${path}`
    const response = await useApiFetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return <any>response;
  }