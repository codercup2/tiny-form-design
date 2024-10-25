import {
  ComponentType,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { flatComps } from '../../data-source/helper'
import { importComponent } from '../../data-source/init'
import { IPage } from '../../typing/app-schema'
import DropZone from './DropZone'

type Props = {
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
}

/** 中间内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const rootId = state.root.id
  const [Comp, setComp] = useState<ComponentType<any> | null>(null)
  const compMeta = flatComps.find((item) => item.id === rootId)
  console.log('compMeta', compMeta)

  const props = {
    title: '根节点 title',
    description: '根节点 description',
    configuration: compMeta?.configurations,
  }
  compMeta?.slots?.forEach((slot) => {
    if (typeof slot === 'string') {
      props[slot] = (
        <DropZone
          state={state}
          setState={setState}
          id={rootId}
          slotName={slot}
        />
      )
    }

    props[slot.name] = (
      <DropZone
        state={state}
        setState={setState}
        id={rootId}
        slotName={slot.name}
        allow={slot.allow}
        disallow={slot.disallow}
      />
    )
  })
  useEffect(() => {
    importComponent(state.root.type).then((FC) => {
      setComp(() => FC)
    })
  }, [state.root.type])

  const RenderComp = () => {
    if (!Comp) {
      return <div>默认的</div>
    }
    // TODO: 通过配置文件得到组件的props, 生成组件
    return <Comp {...props} />
  }

  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
      </div>

      <RenderComp />
    </div>
  )
}
export default Mid
