export type TOptions = {
  name: String;
  code: String;
}[];

export type TAlert = {
  type: "info" | "success" | "danger" | "warning";
  title: string;
  error?: boolean;
};

export type TTableColumn = {
  field: string;
  header: string;
};

export type TTableContent = {
  title?: string;
  columns: TTableColumn[];
  actions: string[];
  body: any[];
};

export type TForm = {
  mode: string;
  title: string;
  component: ComponentPublicInstance | any;
  schema: object;
  data: object
};

export type TResponse = {
  status: string;
  status_code: number;
  message: string;
  data?: any;
};

export type TFormResponse = TResponse & {
  errors?: string;
  data: any;
  alert: TAlert;
};
