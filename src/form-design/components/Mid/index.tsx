import { Dispatch, FC, SetStateAction } from 'react'
// import { importComponent } from '../../data-source/init'
import { metaInfo } from '../../data-source/init'
import { IPage } from '../../typing/app-schema'
import DropZone from './DropZone'

type Props = {
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
}

/** 中间内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const { leftFlatComps } = metaInfo
  const comp = leftFlatComps.find((item) => item.name === state.root.type)
  if (!comp) {
    return null
  }
  const Comp = comp.instance
  const { slots = [], id: rootId } = state.root
  console.log(slots)
  // const [Comp, setComp] = useState<ComponentType<any> | null>(null)

  const props: any = {
    // TODO check 是否需要增加这2个
    title: '根节点 title',
    description: '根节点 description',
  }

  slots.forEach((slot) => {
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
  console.log('props', props)
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
