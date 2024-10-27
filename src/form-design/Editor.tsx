import { FC, useEffect, useState } from 'react'
import {
  Combine,
  DragDropContext,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd'
import Left from './components/Left'
import Mid from './components/Mid'
import Right from './components/Right'
import { findTargetById, handleCheckAllow2 } from './data-source/helper'
import { metaInfo } from './data-source/init'
import { initState } from './data-source/page'
import { RootNs } from './data-source/typing'
import { deepClone } from './utils'

const Index: FC = () => {
  const { leftComps, leftFlatComps } = metaInfo
  // 所有的数据都在这里
  const [state, setState] = useState<RootNs.IRoot>(initState)
  useEffect(() => {
    console.log('state changed:', state)
  }, [state])

  const onDragUpdate = (result: DragUpdate) => {
    // console.log('onDragUpdate result: ', result)
    // const { source, destination, draggableId, ...rest } = result
    // console.log('onDragUpdate draggableId: ', draggableId)
    // console.log('onDragUpdate source: ', source)
    // console.log('onDragUpdate destination: ', destination)
    // console.log('onDragUpdate rest: ', rest)
    // console.log('\n ')
  }
  const onDragEnd = async (result: DropResult) => {
    console.log('onDragEnd result: ', result)
    const { source, destination, draggableId } = result
    // console.log('onDragEnd draggableId: ', draggableId)
    // console.log('onDragEnd source: ', source)
    // console.log('onDragEnd destination: ', destination)
    // console.log('onDragEnd rest: ', rest)
    // console.log('\n ')

    // 1、左边拖到中间区域，新增组件
    if (
      source.droppableId === 'left' &&
      destination?.droppableId &&
      destination?.droppableId !== 'left'
    ) {
      console.log('1、左边拖到中间区域，新增组件')
      const item = leftFlatComps.find((item) => item.id === draggableId)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      const [id, slotName] = destination.droppableId.split(':')
      // 通过id查找到对应的节点，然后把数据放到该节点的 'slot:{slotName}':[] 对应的数据里面
      const node = findTargetById(state, id)
      if (!node) {
        console.error('找不到目标节点，不可能出现')
        return
      }
      const comps = node[`slot:${slotName}`] || []
      const checkAllow = handleCheckAllow2(node, slotName, draggableId)
      if (!checkAllow) {
        console.log('不允许放置，丢弃')
        return
      }
      const uuid = Date.now()
      const newId = `${draggableId}_${uuid}`
      comps.splice(destination.index, 0, {
        ...item,
        id: newId,
      } as any)
      node[`slot:${slotName}`] = comps
      const newState = { ...state }
      setState(newState)
      return
    }
    // 2、中间区域，同列内部拖动（排序）
    if (source.droppableId === destination?.droppableId) {
      const [id, slotName] = destination.droppableId.split(':')
      // 通过id查找到对应的节点，然后把数据放到该节点的 'slot:{slotName}':[] 对应的数据里面
      const node = findTargetById(state, id)
      if (!node) {
        console.error('找不到目标节点，不可能出现')
        return
      }
      const comps = node[`slot:${slotName}`]
      const [item] = comps.splice(source.index, 1)
      comps.splice(destination.index, 0, item)
      const newState = deepClone(state)
      setState(newState)
      return
    }
    // 3、中间区域，不同列之间拖动（移动）
    if (
      source.droppableId &&
      destination?.droppableId &&
      source.droppableId !== destination.droppableId
    ) {
      console.log('3、中间区域，不同列之间拖动（移动）')
      const [sourId, sourSlotName] = source.droppableId.split(':')
      const [destId, destSlotName] = destination.droppableId.split(':')
      // 通过id查找到对应的节点，然后把数据放到该节点的 'slot:{slotName}':[] 对应的数据里面
      const sourNode = findTargetById(state, sourId)
      if (!sourNode) {
        console.error('找不到来源节点，不可能出现')
        return
      }
      const destNode = findTargetById(state, destId)
      if (!destNode) {
        console.error('找不到目标节点，不可能出现')
        return
      }

      // 来源的列表去掉一个
      const item = sourNode[`slot:${sourSlotName}`].splice(source.index, 1)
      // 目的目的列表添加一个
      destNode[`slot:${destSlotName}`].splice(destination.index, 0, item)
      const newState = deepClone(state)
      setState(newState)
      return
    }

    // 4、组合的处理（主要出现在拖进来的组件还有插槽的时候）
    if (result.combine as Combine) {
      // TODO：有需要再实现具体逻辑
      console.log(result.combine)
      return
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div className='form-design flex gap-4 p-4 h-full box-border'>
        <Left items={leftComps} />
        <Mid state={state} />
        <Right state={state} />
      </div>
    </DragDropContext>
  )
}
export default Index
