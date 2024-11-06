import type { TFormResponse } from "~/types.d";

export const useFormSubmit = async (
  path: string,
  formData: Object,
  method?: any
) => {
  const token = localStorage.getItem("token");
  const response = (await useApiFetch(`/api/${path}`, {
    method: method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })) as Omit<TFormResponse, "alert">;

  const res: TFormResponse = {
    status: response.status,
    status_code: response.status_code,
    message: response.message,
    data: response.data,
    errors: response.errors,
    alert: {
      type: !response.status ? "danger" : "success",
      title: response.message,
    },
  };

  return res;
};
