type ISeed = {
  label: string
  type: string
}
type IFormItem = ISeed & {
  name: string
  placeholder?: string
  extra?: string
  defaultValue?: unknown
  required?: boolean
  value?: unknown
}
