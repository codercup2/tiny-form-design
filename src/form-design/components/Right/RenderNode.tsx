import { FC } from 'react'
import { RootNs } from '../../data-source/typing'

type Props = {
  state: RootNs.IComponent
}
const RenderNode: FC<Props> = ({ state }) => {
  console.log('RightRenderNode:', state)
  return (
    <div className='h-40 w-40 bg-slate-300 rounded '>
      {state.title}
      <div className='ml-2'>
        {state.slots.map((slot, index) => (
          <div key={index}>{slot.name ?? slot}</div>
        ))}
      </div>
    </div>
  )
}
export default RenderNode
