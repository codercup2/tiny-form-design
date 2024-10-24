import { Dispatch, FC, SetStateAction } from 'react'
import { IPage } from '../../typing/app-schema'
import DropZone from './DropZone'
import PageLayout from './PageLayout'

type Props = {
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
}

/** 表单内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const rootId = state.root.id
  const Comp =
    state.root.type === '@kc/mk/market-page' ? PageLayout : PageLayout // 默认为页面布局
  const { slots } = state.root.slots
  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
      </div>

      <PageLayout
        hero={
          <DropZone
            id={rootId}
            state={state}
            setState={setState}
            slotName='hero'
          />
        }
        hideFooter={state.root.props?.hideFooter}
      >
        <DropZone
          id={rootId}
          state={state}
          setState={setState}
          slotName='children'
        />
      </PageLayout>
    </div>
  )
}
export default Mid
