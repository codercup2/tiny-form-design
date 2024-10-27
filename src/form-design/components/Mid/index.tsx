import { FC } from 'react'
import RenderNode from './RenderNode'

type Props = {
  state: any
}

/** 中间内容 */
const Mid: FC<Props> = ({ state }) => {
  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
        <RenderNode state={state} />
      </div>
    </div>
  )
}

export default Mid
