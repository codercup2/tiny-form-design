import { Input, Switch } from 'antd'

import { FC } from 'react'
const InputConfig: FC<{ config: IFormItem }> = ({ config }) => {
  const { label, placeholder, extra, defaultValue, required } = config
  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>标题：</p>
        <Input
          placeholder='请输入'
          size='small'
          value={label}
          onChange={(e) => this.props.callback('label', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>占位内容：</p>
        <Input
          placeholder='请输入'
          size='small'
          value={placeholder}
          onChange={(e) => this.props.callback('placeholder', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>额外描述：</p>
        <Input
          placeholder='请输入'
          size='small'
          value={extra}
          onChange={(e) => this.props.callback('placeholder', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>默认值：</p>
        <Input
          placeholder='请输入'
          size='small'
          value={defaultValue}
          onChange={(e) => this.props.callback('defaultValue', e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ marginBottom: '5px' }}>是否必填：</p>
        <Switch
          size='small'
          checked={required}
          onChange={(checked) => this.props.callback('required', checked)}
        />
      </div>
    </>
  )
}

export default InputConfig
