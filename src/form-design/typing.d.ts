type ISeed = {
  label: string
  type: string
}
type IFormItem = ISeed & {
  name: string
  placeholder?: string
  extra?: string
  required?: boolean
  defaultValue?: any
  value?: any
}
