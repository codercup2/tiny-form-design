import { FC } from 'react'
import { RootNs } from '../../data-source/typing'

type Props = {
  state: RootNs.IComponent
}
const RenderNode: FC<Props> = ({ state }) => {
  console.log('RightRenderNode:', state)
  return (
    <div className=' '>
      {state.title}
      <div className='ml-2'>
        {Array.isArray(state.slots) &&
          state.slots?.length > 0 &&
          state.slots.map((slot, index) => (
            <div key={index}>
              {Array.isArray(slot.children) &&
                slot.children?.length > 0 &&
                slot.children.map((item, index) => (
                  <RenderNode state={item} key={index} />
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}
export default RenderNode
