import type { TResponse } from "~/types";

export const useGetFetch = async (path: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const apiPath = `/api/${path}`;
  const response = await useApiFetch(apiPath, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return <any>response;
};

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

export const useFetchOption = async (path: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const apiPath = `/api/${path}`;
  const response = (await useApiFetch(apiPath, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as TResponse;

  return response.data.map((item: any) => {
    const prefix = ["Kalihim", "Ingat Yaman"].includes(item.position)
      ? ""
      : "Hon. ";

    const name =
      item.name ??
      `${prefix}${item.firstname} ${item.middlename} ${item.lastname}`;

    return {
      code: item.id,
      name,
    };
  });
};
