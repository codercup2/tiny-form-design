import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import {
  Draggable,
  DraggableId,
  Droppable,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import { handleCheckAllow } from '../../data-source/helper'
import { PREFIX } from '../../data-source/init'
import { IPage } from '../../typing/app-schema'

type Props = {
  // 所在的父级的Zone名称（比如 'root-1:children'）这样方便定位到具体的Zone
  // 如果pZone为'',则表示是根节点,在root里面查找slots信息
  // 否则去zones里面查找slots信息
  // 查找slots信息是为了确定该区域是否可以放某个类型的组件（allow+disallow)
  pZone: string
  id: string
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
  slotName: string
}

const DropZone: FC<Props> = ({ id, state, setState, slotName }) => {
  const { zones } = state
  const dropzoneId = `${id}:${slotName}`
  const comps = zones[dropzoneId] || []

  return (
    <Droppable droppableId={dropzoneId}>
      {(provided, snapshot: DroppableStateSnapshot) => {
        const getCls = () => {
          if (!snapshot.isDraggingOver) {
            return 'bg-green-200'
          }
          const checkAllow = handleCheckAllow(
            `${id}:${slotName}`,
            snapshot.draggingOverWith as DraggableId,
            state
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
              <div className='break-all'>
                Droppable snapshot:{JSON.stringify(snapshot)}
              </div>
              {comps.map((item, index) => {
                console.log(console.log(item))
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
                        <img
                          src={PREFIX + item.thumbnail}
                          alt='Thumbnail'
                          width={'100%'}
                        />
                        {item.id} - {item.title}
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
