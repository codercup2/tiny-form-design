type ISeed = {
  label: string
  type: IFormItemType
}
type IFormItem = ISeed & {
  name: string
  placeholder?: string
  extra?: string
  required?: boolean
  defaultValue?: any
  value?: any
  options?: Array<{ label: string; value: string }>
}
