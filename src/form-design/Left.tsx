import clsx from 'clsx'
import { FC } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Seed from './Seed'

const Left: FC<{ items: ISeed[] }> = ({ items }) => {
  return (
    <div className='left flex-basis-100px'>
      <Droppable droppableId={'only-one-droppable'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx({
                'left-isDraggingOver': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Seed key={item.id} data={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}
export default Left
