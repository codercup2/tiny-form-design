import { Input, Switch } from 'antd'
import { Dispatch, FC } from 'react'

type Props = {
  formItems: IFormItem[]
  setFormItems: Dispatch<React.SetStateAction<IFormItem[]>>
  currId: string
  formItemsRef: React.MutableRefObject<IFormItem[]>
}
const InputConfig: FC<Props> = ({
  formItems,
  setFormItems,
  currId,
  formItemsRef,
}) => {
  const item = formItems.find((item) => item.name === currId)!
  const { label, placeholder, extra, defaultValue, required } = item
  const onChange = (key: keyof IFormItem, value: any) => {
    // 使用 setState(prev=>xxx) 的方式也不行，还是会打断输入
    // setFormItems((formItems) => {
    //   const newItems = JSON.parse(JSON.stringify(formItems)) as IFormItem[]
    //
    //   curItem[key] = value
    //   return newItems
    // })
    const newFormItems = [...formItemsRef.current]
    const curItem = newFormItems.find((item) => item.name === currId)!
    curItem[key] = value
    formItemsRef.current = newFormItems
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
        <div style={{ marginBottom: '5px' }}>默认值：</div>
        <Input
          placeholder='请输入'
          size='small'
          value={defaultValue}
          onChange={(e) => onChange('defaultValue', e.target.value)}
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
