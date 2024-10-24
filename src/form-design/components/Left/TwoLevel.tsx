import clsx from 'clsx'
import { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  ICategoryComponentItem,
  IComponentItemWithConsequenceId,
} from '../../data-source/helper'

/** 方便CloneItem时一起使用 */
const RenderItem = ({ item }: { item: IComponentItemWithConsequenceId }) => {
  return (
    <div className='seed border-base border-rounded text-center leading-loose'>
      {item.id} {item.name} {item.title}
    </div>
  )
}

/** 两层结构的左侧物料区 */
const TwoLevel: FC<{ items: ICategoryComponentItem[] }> = ({ items }) => {
  return (
    <div className='left flex-basis-200px flex-shrink-0'>
      <h3>页面组件</h3>
      {/* <div className=''>{JSON.stringify(items)}</div> */}
      <Droppable droppableId={'left'} isDropDisabled={true}>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx('flex flex-col gap-4 ', {
                'left-isDraggingOver': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item) => (
                <div key={item.name}>
                  <h4>{item.title}</h4>
                  {item.list.map((item, index) => (
                    <Draggable
                      index={index}
                      draggableId={item.id}
                      key={item.id}
                    >
                      {(provided, snapshot) => (
                        <>
                          <div
                            className={clsx('', {
                              '!translate-x-0 !translate-y-0':
                                !snapshot.isDragging,
                            })}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <RenderItem item={item} />
                          </div>
                          {/* 通过clone一个元素来解决拖拽时，物料元素不见了的问题 */}
                          {snapshot.isDragging && <RenderItem item={item} />}
                        </>
                      )}
                    </Draggable>
                  ))}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}
export default TwoLevel
