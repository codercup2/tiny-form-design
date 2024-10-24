import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { IPage } from '../../typing/app-schema'

type Props = {
  id: string
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
  slotName: string
}
const DropZone: FC<Props> = ({ id, state, setState, slotName }) => {
  const { zones } = state
  const dropzoneId = `${id}:${slotName}`
  const comps = zones[dropzoneId]
  return (
    <Droppable droppableId={dropzoneId}>
      {(provided, snapshot) => {
        return (
          <div
            className={clsx('content flex-1 bg-red-100', {
              '!bg-red': snapshot.isDraggingOver,
              'h-20': comps.length === 0,
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              <div className='break-all'>
                Droppable snapshot:{JSON.stringify(snapshot)}
              </div>
              {comps.map((item, index) => {
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
                        <div className='break-all'>
                          Draggable snapshot:{JSON.stringify(item)}
                        </div>
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
