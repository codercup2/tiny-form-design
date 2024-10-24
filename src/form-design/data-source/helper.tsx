import { getMetaInfo } from './init'

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
  return components.map((item: IComponentItem) => ({
    ...item,
    id: `G${idCount++}`,
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
    groupedComponents[categoryName].push({
      ...component,
      id: `G${idCount++}`,
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
