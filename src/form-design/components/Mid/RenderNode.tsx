import { FC } from 'react'
import { metaInfo } from '../../data-source/init'
import { ISlot } from '../../data-source/typing'
import DropZone from './DropZone'

type Props = {
  state: any
}

const RenderNode: FC<Props> = ({ state }) => {
  const { leftFlatComps } = metaInfo
  const comp = leftFlatComps.find((item) => item.name === state.name)
  if (!comp) {
    return null
  }
  const Comp = comp.instance
  const { slots = [], props = {} } = state
  console.log('RenderNode state:', state)
  // const [Comp, setComp] = useState<ComponentType<any> | null>(null)

  // const props: any = {
  //   // TODO check 是否需要增加这2个
  //   title: '根节点 title',
  //   description: '根节点 description',
  // }

  slots.forEach((slot: ISlot) => {
    if (typeof slot === 'string') {
      props[slot] = <DropZone state={state} id={state.id} slot={slot} />
    }
    if ('name' in slot) {
      props[slot.name] = <DropZone state={state} id={state.id} slot={slot} />
    }
  })
  console.log('RenderNode props', props)

  return <Comp {...props} />
}

export default RenderNode
