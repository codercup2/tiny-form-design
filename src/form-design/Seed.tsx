import clsx from 'clsx'
import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props<T> = {
  data: T
  index: number
}
const Seed: FC<Props<ISeed>> = (props) => {
  const { data, index } = props
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx({
            'seed-dragging': snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='seed'>{data.label}</div>
        </div>
      )}
    </Draggable>
  )
}
export default Seed
