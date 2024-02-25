export type TOptions = {
    text: String;
    value: String;
}[]

export type TAlert = {
    error: boolean
    type: 'info' | 'success' | 'danger' | 'warning'
    message: string
}

export type TTableContent = {
    title?: string;
    head: string[];
    body: { [key: string]: any }[]
}

export type TForm = {
        component: ComponentPublicInstance | any
        schema: object
}