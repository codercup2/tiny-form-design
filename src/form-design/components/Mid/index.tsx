import { Dispatch, FC, SetStateAction } from 'react'
// import { importComponent } from '../../data-source/init'
import { metaInfo } from '../../data-source/init'
import { ISlot } from '../../data-source/typing'
import DropZone from './DropZone'

type Props = {
  state: any
  setState: Dispatch<SetStateAction<any>>
}

/** 中间内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const { leftFlatComps } = metaInfo
  const comp = leftFlatComps.find((item) => item.name === state.name)
  if (!comp) {
    return null
  }
  const Comp = comp.instance
  const { slots = [], props, id: rootId } = state
  console.log(slots)
  // const [Comp, setComp] = useState<ComponentType<any> | null>(null)

  // const props: any = {
  //   // TODO check 是否需要增加这2个
  //   title: '根节点 title',
  //   description: '根节点 description',
  // }

  slots.forEach((slot: ISlot) => {
    if (typeof slot === 'string') {
      props[slot] = (
        <DropZone
          state={state}
          id={state.id}
          slot={slot}
          children={state[`slot:${slot}`]}
        />
      )
    }
    if ('name' in slot) {
      props[slot.name] = (
        <DropZone
          state={state}
          id={state.id}
          slot={slot}
          children={state[`slot:${slot.name}`]}
        />
      )
    }
  })
  console.log('props', props)

  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
      </div>

      <Comp {...props} />
    </div>
  )
}
export default Mid
