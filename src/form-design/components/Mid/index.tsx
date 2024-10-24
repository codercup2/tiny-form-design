import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { importComponent } from '../../data-source/init'
import { IPage } from '../../typing/app-schema'
import DropZone from './DropZone'
import PageLayout from './PageLayout'

type Props = {
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
}

/** 中间内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const rootId = state.root.id
  const [Comp, setComp] = useState(null)

  // const { slots } = state.root.slots
  useEffect(() => {
    importComponent(state.root.type).then(setComp)
  }, [state.root.type])

  if (!Comp) {
    return null
  }

  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
      </div>

      <PageLayout
        title='XXX'
        destination='YYY'
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
