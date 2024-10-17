export enum IFormItemType {
  input = 'input',
  textarea = 'textarea',
  radio = 'radio',
  upload = 'upload',
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
  {
    label: '文件上传',
    type: IFormItemType.upload,
  },
]
const getBaseConfigByType = (type: IFormItemType): ISeed =>
  seeds.find((item) => item.type === type)!

const requiredAndRules = (defaultValue: boolean) => {
  return {
    // required 和 rules[0].required 需要同步更改 （在config里面）
    required: defaultValue,
    rules: [
      {
        required: defaultValue,
        message: 'Please input',
      },
    ],
  }
}

export const configs = {
  [IFormItemType.input]: {
    ...getBaseConfigByType(IFormItemType.input),
    ...requiredAndRules(false),
    placeholder: '',
    fieldProps: {},
  },
  [IFormItemType.textarea]: {
    ...getBaseConfigByType(IFormItemType.textarea),
    ...requiredAndRules(false),
    placeholder: '',
    fieldProps: {},
  },
  [IFormItemType.radio]: {
    ...getBaseConfigByType(IFormItemType.radio),
    ...requiredAndRules(false),
    placeholder: 'Please select',
    fieldProps: {
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
  },
  [IFormItemType.upload]: {
    ...getBaseConfigByType(IFormItemType.upload),
    ...requiredAndRules(false),
    fieldProps: {
      multiple: true,
      listType: 'picture-card',
    },
    action: '/api/upload',
  },
}
