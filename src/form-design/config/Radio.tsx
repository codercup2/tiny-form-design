import { Button, Input, Switch } from 'antd'
import React, { FC } from 'react'
type Props = {
  formItems: IFormItem[]
  setFormItems: (items: IFormItem[]) => void
  currId: string
}
const RadioConfig: FC<Props> = ({ formItems, setFormItems, currId }) => {
  const item = formItems.find((item) => item.name === currId)!
  const { label, extra, options = [], required } = item
  const onChange = (key: keyof IFormItem, value: any) => {
    const newItems = JSON.parse(JSON.stringify(formItems)) as IFormItem[]
    const curItem = newItems.find((item) => item.name === currId)!
    curItem[key] = value
    setFormItems(newItems)
  }
  return (
    <React.Fragment>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>标题：</p>
        <Input
          placeholder='请输入'
          size='small'
          value={label}
          onChange={(e) => onChange('label', e.target.value)}
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
        <p style={{ marginBottom: '5px' }}>是否必填：</p>
        <Switch
          size='small'
          checked={required}
          onChange={(checked) => onChange('required', checked)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>
          选项：
          <Button
            size='small'
            title='添加'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.warn('options', options)
              options.push({
                label: `option${options.length + 1}`,
                value: `option${options.length + 1}`,
              })
              onChange('options', options)
            }}
          >
            添加
          </Button>
        </p>
        <div className='flex flex-col gap-y-2'>
          {options.map((el, i) => (
            <div key={i} className='flex'>
              <Input
                size='small'
                allowClear
                value={el.value}
                onChange={(e) => {
                  options[i].value = e.target.value
                  onChange('options', options)
                }}
              />
              <Button
                size='small'
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  marginLeft: '10px',
                }}
                onClick={() => {
                  options.splice(i, 1)
                  onChange('options', options)
                }}
              >
                删除
              </Button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default RadioConfig
