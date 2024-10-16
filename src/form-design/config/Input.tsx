import { Input, Switch } from 'antd'
import { FC } from 'react'

type Props = {
  formItems: IFormItem[]
  setFormItems: (items: IFormItem[]) => void
  currId: string
}
const InputConfig: FC<Props> = ({ formItems, setFormItems, currId }) => {
  const item = formItems.find((item) => item.name === currId)!
  const { label, placeholder, extra, required } = item
  const onChange = (key: keyof IFormItem, value: any) => {
    const newItems = JSON.parse(JSON.stringify(formItems)) as IFormItem[]
    const curItem = newItems.find((item) => item.name === currId)!
    curItem[key] = value
    setFormItems(newItems)
  }
  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '5px' }}>标题：</div>
        <Input
          placeholder='请输入'
          size='small'
          value={label}
          onChange={(e) => onChange('label', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '5px' }}>占位内容：</div>
        <Input
          placeholder='请输入'
          size='small'
          value={placeholder}
          onChange={(e) => onChange('placeholder', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '5px' }}>额外描述：</div>
        <Input
          placeholder='请输入'
          size='small'
          value={extra}
          onChange={(e) => onChange('extra', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '5px' }}>是否必填：</div>
        <Switch
          size='small'
          checked={required}
          onChange={(checked) => onChange('required', checked)}
        />
      </div>
    </>
  )
}

export default InputConfig
