import { Button, Input, message, Switch } from 'antd'
import React, { FC } from 'react'
type Props = {
  formItems: IFormItem[]
  setFormItems: (items: IFormItem[]) => void
  currId: string
}
function deepClone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

const RadioConfig: FC<Props> = ({ formItems, setFormItems, currId }) => {
  const item = formItems.find((item) => item.name === currId)!
  const { label, extra, fieldProps, required } = item
  const { options = [] } = fieldProps
  const onChange = (key: keyof IFormItem | 'options', value: any) => {
    const newItems = JSON.parse(JSON.stringify(formItems)) as IFormItem[]
    const curItem = newItems.find((item) => item.name === currId)!
    if (key === 'options') {
      curItem.fieldProps.options = value
      console.log(curItem)
      console.log(newItems)
    } else {
      curItem[key] = value
    }
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
              const _Options = deepClone(options)
              let count = _Options.length + 1
              let name = `option${count}`
              while (_Options.some((el: any) => el.value === name)) {
                count += 1
                name = `option${count}`
              }
              _Options.push({
                label: name,
                value: name,
              })
              onChange('options', _Options)
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
                  const name = e.target.value.trim()
                  options[i].label = name
                  options[i].value = name
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
                  if (options.length === 1) {
                    message.warning('至少需要一个选项')
                    return
                  }
                  const _Options = deepClone(options)
                  _Options.splice(i, 1)
                  onChange('options', _Options)
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
