import { FC, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { seeds } from './initData'
import Left from './Left'
import Mid from './Mid'
const Index: FC = () => {
  const [formItems, setFormItems] = useState<IFormItem[]>([])
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, ...rest } = result
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
      newList.splice(destination.index, 0, item)
      setFormItems(newList)
      return
    }
    if (
      source.droppableId === 'left' &&
      destination?.droppableId === 'content'
    ) {
      const uuid = String(Date.now())
      const item = seeds.find((item) => item.type === draggableId)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      setFormItems((list) => [
        ...list,
        {
          id: uuid,
          name: 'field-' + uuid,
          type: item.type,
          label: item.label,
          placeholder: '',
          extra: '',
          required: false,
        },
      ])
      return
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='form-design flex gap-4 p-4 h-full'>
        <Left items={seeds} />
        <Mid formItems={formItems} />
        {/* <Right formItems={formItems} /> */}
      </div>
    </DragDropContext>
  )
}
export default Index
