import { FC } from 'react'
import { RootNs } from '../../data-source/typing'
import RenderNode from './RenderNode'

type Props = {
  state: RootNs.IComponent
}

const Right: FC<Props> = ({ state }) => {
  return (
    <div className='right flex flex-col gap-4 flex-basis-300px'>
      <RenderNode state={state} />
    </div>
  )
}
export default Right
