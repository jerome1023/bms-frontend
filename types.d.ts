export type TOptions = {
  name: string;
  code: string;
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
  data: object;
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

export type TObjectLiteral<T = any> = {
  [key: string | number]: T;
};

export type TDashboardList = {
  label: string;
  value: number;
  icon: any;
  href: string;
}[];

export type TDashboardDocument = {
  list : TOptions;
  revenue : number;
  count : number
}