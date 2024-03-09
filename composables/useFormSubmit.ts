// import type { TFormResponse } from "~/types.d";

export const useFormSubmit = async (path: string, formData: Object, method?: any) => {
    const token = localStorage.getItem('token');
    const response = await useApiFetch(`/api/${path}`, {
        method: method ?? 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    return response;

    // if (!response || response.error) {
    //     return <TFormResponse>{
    //         status: 'error',
    //         status_code: response?.status_code || 401,
    //         message: response?.error || 'Unauthorized',
    //         data: null,
    //         alert: {
    //             type: 'danger',
    //             title: 'Error! ' + response?.error || 'Unauthorized',
    //         }
    //     };
    // }

    // let alertTitle = response.message;
    // let alertData: string[] = [];
    // if(response.status_code === 400) {
    //     alertTitle = "Please check the highlighted fields and try again.";
    //     alertData = Object.values(response.data).flat() as string[];
    // }

    // const res: TFormResponse = {
    //     status: response.status,
    //     status_code: response.status_code,
    //     message: response.message,
    //     data: response.data,
    //     alert: {
    //         type: response.status === 'error' ? 'danger' : 'success',
    //         title: alertTitle,
    //         message: response.message,
    //         list: alertData
    //     }
    // };

    // return res;
};