export enum IFormItemType {
  input = 'input',
  textarea = 'textarea',
  radio = 'radio',
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
  {
    label: '单选框',
    type: IFormItemType.radio,
  },
]
const getBaseConfigByType = (type: IFormItemType): ISeed =>
  seeds.find((item) => item.type === type)!

export const configs = {
  [IFormItemType.input]: {
    ...getBaseConfigByType(IFormItemType.input),
    placeholder: '请输入',
  },
  [IFormItemType.textarea]: {
    ...getBaseConfigByType(IFormItemType.textarea),
    placeholder: '请输入',
  },
  [IFormItemType.radio]: {
    ...getBaseConfigByType(IFormItemType.radio),
    placeholder: '请输入',
    options: [
      {
        label: 'option1',
        value: 'option1',
      },
      {
        label: 'option2',
        value: 'option2',
      },
      {
        label: 'option3',
        value: 'option3',
      },
    ],
  },
}
