import { DraggableId } from 'react-beautiful-dnd'
import { metaInfo } from './init'
import { ISlot, ISlotMore, RootNs } from './typing'

export const handleCheckAllow = (
  /** 如 root:hero 这样的带 id+slotName 的字符串 */
  idWithSlotName: string,
  /** 比如 G100 这样的id */
  draggableId: DraggableId,
  state: any
) => {
  const { leftFlatComps } = metaInfo
  const [id, slotName] = idWithSlotName.split(':')
  // 只有拖进入区域才判断，没拖进来不需要判断
  // 先从root找，有没有这样的id
  const isRoot = state.root.id === id
  let slots = []
  const comps = state.zones[idWithSlotName]
  if (isRoot) {
    slots = state.root.slots
  } else {
    // comps为二级DropZone里面的元素数据
    const comp = comps.find((item: any) => item.id === id)
    console.log(comp)
  }
  const idx = slots.findIndex((item: ISlot) => {
    if (typeof item === 'string') {
      return item === slotName
    } else {
      return (item as ISlotMore).name === slotName
    }
  })
  if (idx === -1) {
    console.error('slotName not found in root slots')
    return false
  }
  const slotInfo = slots[idx]
  if (typeof slotInfo === 'string') {
    // 只有一个字符串，那就什么都可以放进去
    return true
  }

  // 再得到对应的组件的元信息
  const dragCompInfo = leftFlatComps.find((item) => item.id === draggableId)
  if (!dragCompInfo) {
    console.error(`draggableId not found in flatComps: ${draggableId}`)
    return false
  }
  const judge = (item: string) => {
    // 以#开头的表示为某个类型
    if (item.startsWith('#')) {
      const allowCategory = item.slice(1)
      return allowCategory === dragCompInfo.category
    }
    // 组件名字对得上就可以
    return item === dragCompInfo.name
  }
  if (typeof slotInfo.max === 'number') {
    // 如果已经有max限制，并且超过这个限制，那就不能再拖进去了
    if (comps.length >= slotInfo.max) {
      console.error('max limit exceeded')
      return false
    }
    // 否则继续往下走
  }
  if (slotInfo.allow) {
    return slotInfo.allow.some(judge)
  }
  if (slotInfo.disallow) {
    return !slotInfo.disallow.some(judge)
  }
  return true
}

export const handleCheckAllow2 = (
  node: RootNs.IComponent,
  slotName: string,
  /** 比如 G100 这样的id */
  draggableId: DraggableId
) => {
  const slots = node.slots
  const idx = slots.findIndex((item: ISlot) => {
    if (typeof item === 'string') {
      return item === slotName
    } else {
      return (item as ISlotMore).name === slotName
    }
  })
  if (idx === -1) {
    console.error('slotName not found in root slots')
    return false
  }
  const slotInfo = slots[idx]
  if (typeof slotInfo === 'string') {
    // 只有一个字符串，那就什么都可以放进去
    return true
  }

  // 再得到对应的组件的元信息
  const { leftFlatComps } = metaInfo
  const dragCompInfo = leftFlatComps.find((item) => item.id === draggableId)
  if (!dragCompInfo) {
    console.error(`draggableId not found in flatComps: ${draggableId}`)
    return false
  }
  const judge = (item: string) => {
    // 以#开头的表示为某个类型
    if (item.startsWith('#')) {
      const allowCategory = item.slice(1)
      return allowCategory === dragCompInfo.category
    }
    // 组件名字对得上就可以
    return item === dragCompInfo.name
  }
  const comps = node[`slot:${slotName}`]
  console.log('handleCheckAllow2 dragCompInfo:', dragCompInfo)
  console.log('handleCheckAllow2 slotInfo:', slotInfo)
  if (typeof slotInfo.max === 'number') {
    // 如果已经有max限制，并且超过这个限制，那就不能再拖进去了
    if (comps.length >= slotInfo.max) {
      console.error('max limit exceeded')
      return false
    }
    // 否则继续往下走
  }
  if (slotInfo.allow) {
    return slotInfo.allow.some(judge)
  }
  if (slotInfo.disallow) {
    return !slotInfo.disallow.some(judge)
  }
  return true
}
/** 通过 dfs 遍历寻找目标节点 */
export const findTargetById = (
  root: RootNs.IRoot,
  id: string
): RootNs.IComponent | null => {
  const stack: RootNs.IComponent[] = [root]
  while (stack.length) {
    const node = stack.pop()!
    if (node.id === id) {
      return node
    }
    node.slots.forEach((slot: ISlot) => {
      if (typeof slot === 'string') {
        stack.push(...node[`slot:${slot}`])
        return
      }
      // slot 属于 ISlotMore
      if ('name' in slot) {
        stack.push(...node[`slot:${slot.name}`])
      }
    })
  }
  return null
}
