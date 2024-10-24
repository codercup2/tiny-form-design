import { FC, useEffect, useState } from 'react'
import {
  Combine,
  DragDropContext,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd'
import Left from './components/Left'
import Mid from './components/Mid'
import {
  getAllComponents,
  handleComponents,
  ICategoryComponentItem,
  IComponentItemWithConsequenceId,
} from './data-source/helper'
import './data-source/init'
import { handleInitState, initState } from './data-source/page'
import { IPage } from './typing/app-schema'
import { deepClone } from './utils'

const Index: FC = () => {
  const [leftComps, setLeftComps] = useState<ICategoryComponentItem[]>([])
  const [flatComps, setFlatComps] = useState<IComponentItemWithConsequenceId[]>(
    []
  )
  useEffect(() => {
    handleComponents().then((comps) => {
      console.log('leftComps', comps)
      setLeftComps(comps)
      const flatComps = getAllComponents(comps)
      console.log('flatComps', flatComps)
      setFlatComps(flatComps)
      const state = handleInitState(flatComps)
      setState(state)
    })
  }, [])
  // 所有的数据都在这里
  const [state, setState] = useState<IPage>(initState)
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
      const item = flatComps.find((item) => item.id === draggableId)
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      const { zones } = state
      const comps = zones[destination.droppableId]
      const uuid = Date.now()
      const newId = `${draggableId}_${uuid}`
      comps.splice(destination.index, 0, {
        ...item,
        id: newId,
      } as any)
      state.zones[destination.droppableId] = comps
      const newState = deepClone(state)
      setState(newState)
      return
    }
    // 2、中间区域，同列内部拖动（排序）
    if (source.droppableId === destination?.droppableId) {
      console.log('2、中间区域，同列内部拖动（排序）')
      const { zones } = state
      const comps = zones[destination.droppableId]
      const [item] = comps.splice(source.index, 1)
      comps.splice(destination.index, 0, item)
      state.zones[destination.droppableId] = comps
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
      const { zones } = state
      const item = zones[source.droppableId].find(
        (item) => item.id === draggableId
      )
      if (!item) {
        console.error('数据匹配不上，不可能出现')
        return
      }
      // 来源的列表去掉一个
      zones[source.droppableId].splice(source.index, 1)
      // 目的目的列表添加一个
      zones[destination.droppableId].splice(destination.index, 0, item)
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
        <Mid state={state} setState={setState} />
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
