import dayjs from "dayjs";

export const dateFormatter = (params: any) => {
  if (params) {
    return dayjs(params, "YYYY-MM-DD").format("YYYY-MM-DD");
  }
};

export const dateTimeFormatter = (params: any) => {
  if (params) {
    return dayjs(params, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
  }
};
