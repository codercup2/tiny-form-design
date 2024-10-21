import { Dispatch, FC, SetStateAction } from 'react'
import Config from './config'
import { IFormItemType } from './initData'

type Props = {
  formItems: IFormItem[]
  setFormItems: Dispatch<SetStateAction<IFormItem[]>>
  currId: string
}
const configs: Record<IFormItemType, FC<any>> = {
  [IFormItemType.input]: Config.Input,
  [IFormItemType.radio]: Config.Radio,
  [IFormItemType.textarea]: Config.Textarea,
  [IFormItemType.upload]: Config.Upload,
}
const Right: FC<Props> = ({ formItems, setFormItems, currId }) => {
  const item = formItems.find((item) => item.name === currId)
  if (!item) {
    return (
      <div className='right flex flex-col gap-4 flex-basis-300px'>
        <h3>表单配置</h3>
        <p>请选择表单项</p>
      </div>
    )
  }

  const RenderConfig = configs[item.type as IFormItemType]

  return (
    <div className='right flex flex-col gap-4 flex-basis-300px'>
      <h3>表单配置</h3>
      <RenderConfig
        formItems={formItems}
        setFormItems={setFormItems}
        currId={currId}
      />
    </div>
  )
}
export default Right
