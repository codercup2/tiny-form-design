type ISeed = {
  label: string
  type: IFormItemType
}
type IFormItem = ISeed & {
  name: string
  placeholder?: string
  extra?: string
  required?: boolean
  value?: any
  rules: Array<{ required?: boolean; message?: string }>
  fieldProps: {
    options?: Array<{ label: string; value: string }>
  }
}
