export enum IFormItemType {
  input = 'input',
  textarea = 'textarea',
}
export const seeds: ISeed[] = [
  {
    label: '单行文本',
    type: IFormItemType.input,
  },
  {
    label: '多行文本',
    type: IFormItemType.textarea,
  },
]
export const configs = {
  [IFormItemType.input]: {
    label: '单行文本',
    type: 'input',
    placeholder: '请输入',
  },
  [IFormItemType.textarea]: {
    label: '多行文本',
    type: 'textarea',
    placeholder: '请输入',
  },
}
