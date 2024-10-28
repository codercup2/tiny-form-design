import clsx from 'clsx'
import { FC } from 'react'
import {
  Draggable,
  DraggableId,
  Droppable,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import { handleCheckAllow2 } from '../../data-source/helper'
import { ISlot, RootNs } from '../../data-source/typing'
import RenderNode from './RenderNode'

type Props = {
  state: RootNs.IComponent
  id: string
  slot: ISlot
}

const DropZone: FC<Props> = ({ state, id, slot }) => {
  const slotName = typeof slot === 'string' ? slot : slot.name

  const dropzoneId = `${id}:${slotName}`
  const comps = state[`slot:${slotName}`] || []
  console.log('DropZone state:', state)
  console.log('DropZone comps:', comps)

  return (
    <Droppable droppableId={dropzoneId}>
      {(provided, snapshot: DroppableStateSnapshot) => {
        const getCls = () => {
          if (!snapshot.isDraggingOver) {
            return 'bg-green-200'
          }
          const checkAllow = handleCheckAllow2(
            state,
            slotName,
            snapshot.draggingOverWith as DraggableId
          )
          console.log(checkAllow)
          if (checkAllow) {
            return 'bg-green-300'
          }
          return 'bg-red-500 cursor-not-allowed'
        }
        return (
          <div
            className={clsx('content flex-1', getCls(), {
              'h-40': comps.length === 0,
              // 这里需要判断拖拽的元素是否允许拖入到此区域，根据allow or disallow
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {/* <div className='break-all'>
                Droppable snapshot:{JSON.stringify(snapshot)}
              </div> */}
              {comps.length > 0 &&
                comps.map((item, index) => {
                  console.log('comps item:', item)
                  return (
                    <Draggable
                      // 这里 id是唯一的，`原本的Id_${Date.now()}` 的形式
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={clsx(
                            'border-dashed border-base p-2 relative',
                            {
                              'bg-green-100': snapshot.isDragging,
                              'border-left-highlight': item.id === id,
                            }
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <RenderNode state={item} />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              {provided.placeholder}
            </div>
          </div>
        )
      }}
    </Droppable>
  )
}
export default DropZone
