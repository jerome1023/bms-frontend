export type TOptions = {
    text: String;
    value: String;
}[]

export type TAlert = {
    error: boolean
    type: 'info' |'success' | 'danger' | 'warning'
    message: string
  }