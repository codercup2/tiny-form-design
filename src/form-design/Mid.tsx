import clxs, { clsx } from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
  formItems: IItem[]
  setFormItems: Dispatch<SetStateAction<IItem[]>>
  currId: string
  setCurrId: (id: string) => void
}

/** 表单内容 */
const Mid: FC<Props> = ({ formItems, setCurrId, currId, setFormItems }) => {
  const deleteItem = (index: number) => {
    const newList = JSON.parse(JSON.stringify(formItems))
    newList.splice(index, 1)
    setFormItems(newList)
  }
  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>表单内容</h3>
      </div>
      <Droppable droppableId={'content'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clxs('content flex-1', {
                'is-dragging-over': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                {JSON.stringify(formItems)}
                {formItems.map((item, index) => {
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
                              'border-left-highlight': item.name === currId,
                            }
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() => setCurrId(item.id)}
                        >
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
    </div>
  )
}
export default Mid
{
  /* <Droppable droppableId={'content'}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={clxs('content flex-1', {
                          'is-dragging-over': snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div></div>
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
                <Droppable droppableId={'content'}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={clxs('content flex-1', {
                          'is-dragging-over': snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div></div>
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable> */
}
