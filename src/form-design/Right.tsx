import { Dispatch, FC, SetStateAction } from 'react'
import Config from './config'
import { IFormItemType } from './initData'

type Props = {
  formItems: IFormItem[]
  setFormItems: Dispatch<SetStateAction<IFormItem[]>>
  currId: string
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

  return (
    <div className='right flex flex-col gap-4 flex-basis-300px'>
      <h3>表单配置</h3>
      {(() => {
        switch (item.type) {
          case IFormItemType.input:
            return (
              <Config.Input
                formItems={formItems}
                setFormItems={setFormItems}
                currId={currId}
              />
            )
          case IFormItemType.radio:
            return (
              <Config.Radio
                formItems={formItems}
                setFormItems={setFormItems}
                currId={currId}
              />
            )
        }
      })()}
    </div>
  )
}
export default Right
