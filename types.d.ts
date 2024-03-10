export type TOptions = {
  text: String;
  value: String;
}[];

export type TAlert = {
  type: "info" | "success" | "danger" | "warning";
  title: string;
  error?: boolean;
};

export type TTableContent = {
  title?: string;
  head: string[];
  body: [];
};

export type TForm = {
  title: string;
  component: ComponentPublicInstance | any;
  schema: object;
};

export type TResponse = {
  status: string
  status_code: number
  message: string
  data?: any
}

export type TFormResponse = TResponse & {
  errors?: string
  data: any
  alert: TAlert
}
