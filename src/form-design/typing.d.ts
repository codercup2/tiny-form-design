type ISeed = {
  id: string
  label: string
  type: string
}
type IFormItem = ISeed & {
  extra?: string
  value?: unknown
}
