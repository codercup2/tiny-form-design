import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRuntime from 'react/jsx-runtime'
import 'systemjs' // # 若已在项目中引入 systemjs, 则无需再次引入
import {
  IBaseMeta,
  ICategory,
  ICategoryComponent,
  IComponent,
  IComponentWithConsequenceId,
} from './typing'

// 手动声明 react, react/jsx-runtime 和 react-dom 并注册到 System 中
System.addImportMap({
  imports: {
    react: 'app:react',
    'react/jsx-runtime': 'app:react-runtime',
    'react-dom': 'app:react-dom',
  },
})
System.set('app:react', { ...React, __useDefault: true })
System.set('app:react-dom', { ...ReactDom, __useDefault: true })
System.set('app:react-runtime', { ...ReactRuntime, __useDefault: true })

export const metaInfo = {
  baseMeta: {} as IBaseMeta,
  leftComps: [] as any[],
  leftFlatComps: [] as any[],
}
export const loadLibs = async () => {
  await getBaseMeta()
  await handleComponents()
  await handleLeftFlatComponents()
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

export const importComponent = async (componentName: string) => {
  try {
    const lib = await System.import(`${PREFIX}/index.system.js`)
    console.log('lib', lib)
    const { name, associated, variant } = parseComponentName(componentName)
    console.log('name', name)
    return lib[name]
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
  IComponentWithConsequenceId[]
> => {
  const { components } = metaInfo.baseMeta
  const sort = idCount++
  return components.map((item: IComponent) => ({
    ...item,
    id: `G${sort}`,
    sort,
  }))
}

/**
 * 处理成双层的左侧数据，第一层是category, category 里面的 list 是左侧组件
 */
export const handleComponents = async () => {
  const { components, categories } = metaInfo.baseMeta

  // 创建一个映射表，用于快速查找类别
  const categoryMap: { [name: string]: ICategory } = {}
  categories.forEach((category) => {
    categoryMap[category.name] = category
  })

  // 按类别分组组件
  const groupedComponents: {
    [categoryName: string]: IComponentWithConsequenceId[]
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
  const result: ICategoryComponent[] = []
  categories.forEach((category, index) => {
    const componentsInCategory = groupedComponents[category.name] || []
    result.push({
      id: index + 1,
      name: category.name,
      title: category.title,
      list: componentsInCategory,
    })
  })
  metaInfo.leftComps = result
}

/**
 * 通过上面的 handleComponents 函数，得到左侧组件列表，相当于是平铺的所有组件，在组件拖进去的时候获取组件用
 */
export const handleLeftFlatComponents = () => {
  const { leftComps } = metaInfo
  metaInfo.leftFlatComps = leftComps.flatMap((item) => item.list)
}
