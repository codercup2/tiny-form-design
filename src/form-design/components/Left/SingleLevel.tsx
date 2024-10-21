import clsx from 'clsx'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

/** 单层结构的左侧物料区 */
const SingleLevel: FC<{ items: ICategoryItem[] }> = ({ items }) => {
  return (
    <div className='left flex-basis-200px flex-shrink-0'>
      <h3>页面组件</h3>
      <div className=''>{JSON.stringify(items)}</div>
      <Droppable droppableId={'left'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx('flex flex-col gap-4 ', {
                'left-isDraggingOver': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable index={index} draggableId={item.id} key={item.id}>
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
                          {item.id} {item.name}
                        </div>
                      </div>
                      {/* 通过clone一个元素来解决拖拽时，物料元素不见了的问题 */}
                      {snapshot.isDragging && (
                        <div className='seed border-base border-rounded text-center leading-loose'>
                          {item.name}
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
export default SingleLevel
