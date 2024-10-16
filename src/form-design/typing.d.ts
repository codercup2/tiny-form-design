type ISeed = {
  label: string
  type: string
}
type IFormItem = ISeed & {
  name: string
  extra?: string
  placeholder?: string
  required?: boolean
  value?: unknown
}
