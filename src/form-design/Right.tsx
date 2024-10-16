import { Dispatch, FC } from 'react'
import Config from './config'
import { IFormItemType } from './initData'

type Props = {
  formItems: IFormItem[]
  setFormItems: Dispatch<React.SetStateAction<IFormItem[]>>
  currId: string
  formItemsRef: React.MutableRefObject<IFormItem[]>
}
const Right: FC<Props> = ({
  formItems,
  setFormItems,
  currId,
  formItemsRef,
}) => {
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
          <Config.Input
            formItems={formItems}
            setFormItems={setFormItems}
            currId={currId}
            formItemsRef={formItemsRef}
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
  }

  return (
    <div className='right flex flex-col gap-4 flex-basis-300px'>
      <h3>表单配置</h3>
      <RenderConfig />
    </div>
  )
}
export default Right
