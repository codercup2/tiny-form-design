import { FC, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { configs, seeds } from './initData'
import Left from './Left'
import Mid from './Mid'
import Right from './Right'
const Index: FC = () => {
  const [formItems, setFormItems] = useState<IFormItem[]>([])
  const [currId, setCurrId] = useState<string>('')
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, ...rest } = result
    console.log('draggableId: ', draggableId)
    console.log('source: ', source)
    console.log('destination: ', destination)
    console.log('rest: ', rest)

    // 同列内部拖动 且是 中间区域内部拖动
    if (
      source.droppableId === destination?.droppableId &&
      source.droppableId === 'content'
    ) {
      const newList = [...formItems]
      const [item] = newList.splice(source.index, 1)
      setCurrId(item.name)
      newList.splice(destination.index, 0, item)
      setFormItems(newList)
      return
    }
    // 做左边拖到中间区域，新增的表单项
    if (
      source.droppableId === 'left' &&
      destination?.droppableId === 'content'
    ) {
      const item = seeds.find((item) => item.type === draggableId)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      const uuid = String(Date.now())
      const newList = [...formItems]
      newList.splice(destination.index, 0, {
        // id: uuid,
        name: `field-${uuid}`,
        ...configs[item.type as keyof typeof configs],
      } as any)
      setFormItems(newList)
      setCurrId(`field-${uuid}`)
      return
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='form-design flex gap-4 p-4 h-full box-border'>
        <Left items={seeds} />
        <Mid formItems={formItems} setCurrId={setCurrId} currId={currId} />
        <Right
          formItems={formItems}
          setFormItems={setFormItems}
          currId={currId}
        />
      </div>
    </DragDropContext>
  )
}
export default Index
