import { FC } from 'react'

const Right: FC<{ formItems: IFormItem[] }> = ({ formItems }) => {
  const item = {}
  return (
    <div className='right flex flex-col gap-4'>
      <h3>表单配置</h3>
      <InputCofing config={item} />
    </div>
  )
}
export default Right
