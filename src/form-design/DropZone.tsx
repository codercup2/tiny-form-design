import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

type Props<T> = {
  children?: React.ReactNode
  id: string
  setCurrId: (id: string) => void
  data: T[]
  setData: Dispatch<SetStateAction<T[]>>
}
const DropZone: FC<Props<any>> = ({
  children,
  id,
  setCurrId,
  data,
  setData,
}) => {
  const deleteItem = (index: number) => {
    const newList = JSON.parse(JSON.stringify(data))
    newList.splice(index, 1)
    setData(newList)
  }
  return (
    <Droppable droppableId={'slot-content'}>
      {(provided, snapshot) => {
        return (
          <div
            className={clsx('content flex-1 h-20', {
              'bg-green-100': snapshot.isDraggingOver,
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {JSON.stringify(data)}
              {data.map((item, index) => {
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
                        onClick={() => setCurrId(item.id)}
                      >
                        {children}
                        {item.id} - {item.name}
                        {/* 右上角的关闭按钮，不需要二次确认 */}
                        <div
                          onClick={() => {
                            deleteItem(index)
                          }}
                          className='cursor-pointer absolute top-2 right-2 w-5 h-5 flex items-center justify-center border-rounded border-base border-dashed hover:border-solid'
                        >
                          X
                        </div>
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
