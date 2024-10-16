import { FC } from 'react'
import Config from './config'
import { IFormItemType } from './initData'

type Props = {
  formItems: IFormItem[]
  setFormItems: (items: IFormItem[]) => void
  currId: string
}
const Right: FC<Props> = ({ formItems, setFormItems, currId }) => {
  const RenderConfig = () => {
    const item = formItems.find((item) => item.name === currId)
    if (!item) {
      return (
        <>
          <p>请选择表单项</p>
        </>
      )
    }
    switch (item.type) {
      case IFormItemType.input:
        return (
          <Config.InputConfig
            formItems={formItems}
            setFormItems={setFormItems}
            currId={currId}
          />
        )
    }
  }

  return (
    <div className='right flex flex-col gap-4 flex-basis-200px'>
      <h3>表单配置</h3>
      <RenderConfig />
    </div>
  )
}
export default Right
