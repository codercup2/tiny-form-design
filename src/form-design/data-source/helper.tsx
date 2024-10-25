import { DraggableId } from 'react-beautiful-dnd'
import { getMetaInfo } from './init'
import { ISlot, ISlotMore } from './typing'

export type ICategoryItem = {
  name: string
  title: string
}
export type ICategoryComponentItem = {
  id: number
  name: string
  title: string
  list: IComponentItemWithConsequenceId[]
}
export type IComponentItem = {
  /** 类别：hero */
  category: string
  /** 组件名：@kc/lego-mk-ui/HeroV1 */
  name: string
  /** 中文名：HeroV1 component */
  title: string
  /** 缩略图：blob:http://localhost:5173/8321336d-d5bc-4b5c-abe0-95ac6c7b1cad */
  thumbnail: string
  meta: any
}

export type IComponentItemWithConsequenceId = IComponentItem & {
  id: string
  sort: number
}

// 处理gragdableId的连续性
let idCount = 100

/**
 * 处理成单层的左侧数据，已废弃
 * @deprecated
 */
export const handleComponentsSingleLevel = async (): Promise<
  IComponentItemWithConsequenceId[]
> => {
  const { components } = (await getMetaInfo()) as {
    components: IComponentItem[]
    categories: ICategoryItem[]
  }
  const sort = idCount++
  return components.map((item: IComponentItem) => ({
    ...item,
    id: `G${sort}`,
    sort,
  }))
}

/**
 * 处理成双层的左侧数据，第一层是category, category 里面的 list 是左侧组件
 */
export const handleComponents = async (): Promise<ICategoryComponentItem[]> => {
  const { components, categories } = (await getMetaInfo()) as {
    components: IComponentItem[]
    categories: ICategoryItem[]
  }

  // 创建一个映射表，用于快速查找类别
  const categoryMap: { [name: string]: ICategoryItem } = {}
  categories.forEach((category) => {
    categoryMap[category.name] = category
  })

  // 按类别分组组件
  const groupedComponents: {
    [categoryName: string]: IComponentItemWithConsequenceId[]
  } = {}
  components.forEach((component) => {
    const categoryName = component.category
    if (!groupedComponents[categoryName]) {
      groupedComponents[categoryName] = []
    }
    const sort = idCount++
    groupedComponents[categoryName].push({
      ...component,
      id: `G${sort}`,
      sort,
    })
  })

  // 构建最终的输出格式
  const result: ICategoryComponentItem[] = []
  categories.forEach((category, index) => {
    const componentsInCategory = groupedComponents[category.name] || []
    result.push({
      id: index + 1,
      name: category.name,
      title: category.title,
      list: componentsInCategory,
    })
  })

  return result
}

/**
 * 通过上面的 handleComponents 函数，得到左侧组件列表，相当于是平铺的所有组件，在组件拖进去的时候获取组件用
 */
export const getAllComponents = (list: ICategoryComponentItem[]) => {
  return list.flatMap((item) => item.list)
}

export const flatComps = [
  {
    name: '@kc/lego-mk-ui/HeroV1',
    title: 'HeroV1 component',
    category: 'hero',
    meta: 'components/hero-v1/meta.json',
    thumbnail: 'components/hero-v1/descriptive-res/thumbnails/index.png',
    configurations: [
      {
        required: true,
        name: 'title',
        type: 'string',
      },
      {
        required: true,
        name: 'description',
        type: 'string',
      },
      {
        required: true,
        name: 'image',
        type: 'string',
      },
      {
        required: true,
        name: 'activeButton',
        type: 'string',
      },
      {
        required: true,
        name: 'shareButton',
        type: 'string',
      },
    ],
    id: 'G100',
    sort: 100,
  },
  {
    name: '@kc/lego-mk-ui/CalendarV1',
    title: 'CalendarV1 component',
    category: 'image-text',
    meta: 'components/calendar-v1/meta.json',
    thumbnail: 'components/calendar-v1/descriptive-res/thumbnails/index.png',
    configurations: [
      {
        required: true,
        name: 'name',
        type: 'string',
      },
      {
        required: true,
        name: 'subtitle',
        type: 'string',
      },
      {
        required: true,
        name: 'title',
        type: 'string',
      },
      {
        required: true,
        name: 'content',
        type: 'string',
      },
    ],
    id: 'G101',
    sort: 101,
  },
  {
    name: '@kc/lego-mk-ui/PlHeroTop',
    title: '默认页面布局组件',
    category: 'page-layout',
    meta: 'components/pl-hero-top/meta.json',
    thumbnail: 'components/pl-hero-top/descriptive-res/thumbnails/index.png',
    configurations: [],
    slots: [
      {
        name: 'hero',
        title: '头图插槽',
        max: 1,
        allow: ['#hero'],
      },
      {
        name: 'children',
        disallow: ['#hero'],
      },
    ],
    id: 'G102',
    sort: 102,
  },
]

export const handleCheckAllow = (
  /** 如 root:hero 这样的带 id+slotName 的字符串 */
  idWithSlotName: string,
  /** 比如 G100 这样的id */
  draggableId: DraggableId,
  state: any
) => {
  const [id, slotName] = idWithSlotName.split(':')
  // 只有拖进入区域才判断，没拖进来不需要判断
  // 先从root找，有没有这样的id
  const isRoot = state.root.id === id
  let slots = []
  if (isRoot) {
    slots = state.root.slots
  } else {
    // comps为二级DropZone里面的元素数据
    const comps = state.zones[idWithSlotName]
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
  const dragCompInfo = flatComps.find((item) => item.id === draggableId)
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

  if (slotInfo.allow) {
    return slotInfo.allow.some(judge)
  }
  if (slotInfo.disallow) {
    return !slotInfo.disallow.some(judge)
  }
  return true
}
