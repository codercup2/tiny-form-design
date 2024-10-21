import { FC, useState } from 'react'
import { Combine, DragDropContext, DropResult } from 'react-beautiful-dnd'
import Left from './components/Left/SingleLevel'
import Mid from './components/Mid'
import { handledComponents } from './data-source/component-list'
import { IComponentItemWithConsequenceId } from './typing/component-meta'
import { deepClone } from './utils'

const Index: FC = () => {
  const [formItems, setFormItems] = useState<IComponentItemWithConsequenceId[]>(
    []
  )
  const [currId, setCurrId] = useState<string>('')
  const onDragEnd = (result: DropResult) => {
    console.log('result: ', result)
    const { source, destination, draggableId, ...rest } = result
    console.log('draggableId: ', draggableId)
    console.log('source: ', source)
    console.log('destination: ', destination)
    console.log('rest: ', rest)
    console.log('\n ')

    // 组合的是的处理
    if (result.combine as Combine) {
      const newList = deepClone(formItems)
      // TODO：是否对source.draggableId有限制，目前 source.draggableId 有 content 和 left 两种
      if (source.droppableId === 'content') {
        return
      }
      const target = newList.find(
        (item) => item.id === result.combine!.draggableId
      )
      if (!target) {
        return
      }
      console.log(target)
      const item = handledComponents.find((item) => item.id === draggableId)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      const newItem = deepClone(item)
      const uuid = String(Date.now())
      const newId = `${draggableId}_${uuid}`
      newItem.id = newId
      if (target.slots && Array.isArray(target.slots) && target.slots.length) {
        // slots里面有 children + 其他
        const children = target.slots.find((o) => o === 'children')
        if (!children) {
          return
        }
        // TODO check 后面的逻辑怎么处理：children + 其他slot
        // 这里先直接放进去
        if (!target.slots.children) {
          target.slots.children = []
        }
        target.slots.children.push(newItem)
        setFormItems(newList)
      }
      return
    }
    // 同列内部拖动 且是 中间区域内部拖动
    if (
      source.droppableId === destination?.droppableId &&
      source.droppableId === 'content'
    ) {
      const newList = [...formItems]
      const [item] = newList.splice(source.index, 1)
      setCurrId(item.id)
      newList.splice(destination.index, 0, item)
      setFormItems(newList)
      return
    }
    // 做左边拖到中间区域，新增的表单项
    if (
      source.droppableId === 'left' &&
      destination?.droppableId === 'content'
    ) {
      const item = handledComponents.find((item) => item.id === draggableId)
      console.log('new Item:', item)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      const uuid = String(Date.now())
      const newId = `${draggableId}_${uuid}`
      const newList = [...formItems]
      newList.splice(destination.index, 0, {
        ...item,
        id: newId,
      } as any)
      setFormItems(newList)
      setCurrId(newId)
      return
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='form-design flex gap-4 p-4 h-full box-border'>
        <Left items={handledComponents} />
        <Mid
          formItems={formItems}
          setFormItems={setFormItems}
          setCurrId={setCurrId}
          currId={currId}
        />
        {/* <Right
          formItems={formItems}
          setFormItems={setFormItems}
          currId={currId}
        /> */}
      </div>
    </DragDropContext>
  )
}
export default Index
