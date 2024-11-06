export const useGetData = async (route: string) => {
  const token = localStorage.getItem("token");
  const url = `/api/${route}`;
  const response = (await useApiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })) as any;

  return response.status
    ? response.data
    : useNuxtApp().$toast.error("Something went wrong!");
};
