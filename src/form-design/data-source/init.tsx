import './init-pre'
import { handleInitState } from './page'
import {
  IBaseMeta,
  ICategory,
  ICategoryComponent,
  ICategoryComponentFlat,
  IComponent,
} from './typing'

export const metaInfo = {
  libs: {} as any,
  baseMeta: {} as IBaseMeta,
  leftComps: [] as ICategoryComponent[],
  leftFlatComps: [] as ICategoryComponentFlat[],
}
export const loadLibs = async () => {
  await getLibs()
  await getBaseMeta()
  await getComps()
  await getFlatComps()
  await handleInitState()
  console.log('metaInfo', metaInfo)
}

// 加载组件库
export const VERSION = '0.0.1'
export const PREFIX = `/mk-ui/${VERSION}/`
export const getInfoByPath = async (filePath: string) => {
  try {
    const info = await System.import(`${PREFIX}/${filePath}`)
    return info
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error)
    return null
  }
}

const getBaseMeta = async () => {
  try {
    const info = await System.import(`/mk-ui/catalog.json`)
    const baseMeta = info.default || info
    const { components } = baseMeta
    const _components = await Promise.all(components.map(fetchComponentData))
    baseMeta.components = _components
    metaInfo.baseMeta = baseMeta
  } catch (error) {
    console.error('Failed to load catalog.json:', error)
  }
}

const fetchComponentData = async (component: any) => {
  const meta = await getInfoByPath(component.meta)
  // fetchThumbnail还是先不处理好，等到左侧列表需要展示的时候再来获取
  // const thumbnail = await fetchThumbnail(component.thumbnail)
  return {
    ...component,
    // meta: meta.default,
    ...meta.default,
    // thumbnail,
  }
}

const COMPONENT_REG = /([^.]+)(?:\.([^~]+))(?:~(.+))?$/

export function parseComponentName(componentName: string) {
  const [compName] = componentName.split('/').reverse()
  const match = COMPONENT_REG.exec(compName)
  console.log('parseComponentName:', compName, match)
  if (!match) {
    return {
      name: compName,
      associated: '',
      variant: '',
    }
  }
  return {
    name: match[1],
    associated: match[2] || '',
    variant: match[3] || '',
  }
}

export const getLibs = async () => {
  try {
    const libs = await System.import(`${PREFIX}/index.system.js`)
    metaInfo.libs = libs
    console.log('libs', metaInfo.libs)
  } catch (error) {
    console.error(`Failed to getLibs:`, error)
  }
}
export const importComponent = async (componentName: string) => {
  try {
    const { libs } = metaInfo
    const { name, associated, variant } = parseComponentName(componentName)
    console.log(name, associated, variant)
    return libs[name]
  } catch (error) {
    console.error(`Failed to import component ${componentName}:`, error)
  }
}

// 处理gragdableId的连续性
let idCount = 100

/**
 * 处理成单层的左侧数据，已废弃
 * @deprecated
 */
export const handleComponentsSingleLevel = async (): Promise<
  ICategoryComponentFlat[]
> => {
  const { components } = metaInfo.baseMeta
  const sort = idCount++
  return components.map((item: IComponent) => ({
    ...item,
    id: `G${sort}`,
    instance: null,
    sort,
  }))
}

/**
 * 处理成双层的左侧数据，第一层是category, category 里面的 list 是左侧组件
 */
export const getComps = async () => {
  const { components, categories } = metaInfo.baseMeta

  // 创建一个映射表，用于快速查找类别
  const categoryMap: { [name: string]: ICategory } = {}
  categories.forEach((category) => {
    categoryMap[category.name] = category
  })

  // 按类别分组组件
  const groupedComponents: {
    [categoryName: string]: ICategoryComponentFlat[]
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
      instance: null,
    })
  })

  // 构建最终的输出格式
  const leftComps: ICategoryComponent[] = []
  categories.forEach((category, index) => {
    const componentsInCategory = groupedComponents[category.name] || []
    leftComps.push({
      id: index + 1,
      name: category.name,
      title: category.title,
      list: componentsInCategory,
    })
  })
  metaInfo.leftComps = leftComps
}

/**
 * 1、平铺的所有组件，方便在组件拖进去的时候获取组件用
 * 2、根据name拿到组件的实例
 */
export const getFlatComps = async () => {
  const { leftComps } = metaInfo
  const leftFlatComps: ICategoryComponentFlat[] = leftComps.flatMap(
    (item) => item.list
  )
  // 提前获取组件实例
  await Promise.all(
    leftFlatComps.map(async (component) => {
      const componentName = component.name
      const componentInstance = await importComponent(componentName)
      if (componentInstance) {
        component.instance = componentInstance
      }
    })
  )
  metaInfo.leftFlatComps = leftFlatComps
}
