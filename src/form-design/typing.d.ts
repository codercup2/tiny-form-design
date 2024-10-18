type ICategoryItem = {
  id: string
  name: string
  max: number
  current: number
  preview: string
}
type ISeed = {
  id: string
  category: string
  max: number
  current: number
  list: ICategoryItem[]
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
