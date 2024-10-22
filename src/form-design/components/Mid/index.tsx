import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { IComponentItemWithConsequenceId } from '../../typing/component-meta'
import DropZone from './DropZone'

type Props = {
  formItems: IComponentItemWithConsequenceId[]
  setFormItems: Dispatch<SetStateAction<IComponentItemWithConsequenceId[]>>
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
      <Droppable droppableId={'content'} isCombineEnabled>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx('content flex-1', {
                'bg-green-100': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                {/* {JSON.stringify(formItems)} */}
                {JSON.stringify(snapshot)}
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
                              'bg-green-500': snapshot.isDragging,
                              'border-left-highlight': item.name === currId,
                            }
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() => setCurrId(item.id)}
                        >
                          {item.id} - {item.name} - {item.title}
                          <div>有slot吗？{item.slots ? 'Y' : 'N'}</div>
                          {/* <PageLayout
                            hideFooter={false}
                            hero={<DropZone compoent={xxx}  />}
                            children={<DropZone xxx />}
                          /> */}
                          {!!item.slots && (
                            <div className='flex'>
                              <DropZone
                                id={item.id}
                                setCurrId={setCurrId}
                                data={item.slots.children}
                                setData={(data) => {
                                  console.log(data)
                                }}
                              />
                            </div>
                          )}
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
