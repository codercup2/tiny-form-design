export enum IFormItemType {
  input = 'input',
  textarea = 'textarea',
  radio = 'radio',
  upload = 'upload',
}
export const seeds: ISeed[] = [
  {
    id: '1',
    category: '头图类',
    max: 10,
    current: 0,
    list: [
      {
        id: '1-1',
        name: '头图样式1',
        max: 10,
        current: 0,
        preview:
          'https://img.alicdn.com/imgextra/i2/O1CN01KZYVXe1E5Y8q8JJ0l_!!6000000001498-2-tps-600-600.png',
      },
    ],
  },
  {
    id: '2',
    category: '文本类',
    max: 10,
    current: 0,
    list: [
      {
        id: '2-1',
        name: '一排一',
        max: 10,
        current: 0,
        preview:
          'https://img.alicdn.com/imgextra/i2/O1CN01KZYVXe1E5Y8q8JJ0l_!!6000000001498-2-tps-600-600.png',
      },
      {
        id: '2-2',
        name: '一排二',
        max: 10,
        current: 0,
        preview:
          'https://img.alicdn.com/imgextra/i2/O1CN01KZYVXe1E5Y8q8JJ0l_!!6000000001498-2-tps-600-600.png',
      },
    ],
  },
  {
    id: '3',
    category: '图文类',
    max: 5,
    current: 0,
    list: [
      {
        id: '3-1',
        name: '单图',
        max: 10,
        current: 0,
        preview:
          'https://img.alicdn.com/imgextra/i2/O1CN01KZYVXe1E5Y8q8JJ0l_!!6000000001498-2-tps-600-600.png',
      },
    ],
  },
  {
    id: '4',
    category: '任务发奖组件',
    max: 1,
    current: 0,
    list: [
      {
        id: '4-1',
        name: '任务&直发',
        max: 1,
        current: 0,
        preview:
          'https://img.alicdn.com/imgextra/i2/O1CN01KZYVXe1E5Y8q8JJ0l_!!6000000001498-2-tps-600-600.png',
      },
    ],
  },
]
/** 从 seeds 里面获取所有的Item */
export const allItems: ICategoryItem[] = seeds.reduce<ICategoryItem[]>(
  (acc, cur) => {
    return acc.concat(cur.list)
  },
  []
)
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
