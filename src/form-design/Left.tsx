import clsx from 'clsx'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Left: FC<{ items: ISeed[] }> = ({ items }) => {
  return (
    <div className='left flex-basis-200px'>
      <h3>组件库</h3>
      <Droppable droppableId={'left'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx('flex flex-col gap-4', {
                'left-isDraggingOver': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable
                  draggableId={item.type}
                  index={index}
                  key={item.type}
                >
                  {(provided, snapshot) => (
                    <>
                      <div
                        className={clsx('', {
                          '!translate-x-0 !translate-y-0': !snapshot.isDragging,
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className='seed border-base border-rounded text-center leading-loose'>
                          {item.label}
                        </div>
                      </div>
                      {/* 通过clone一个元素来解决拖拽时，物料元素不见了的问题 */}
                      {snapshot.isDragging && (
                        <div className='seed border-base border-rounded text-center leading-loose'>
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </Draggable>
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
