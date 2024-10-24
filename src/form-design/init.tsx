import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRuntime from 'react/jsx-runtime'
import 'systemjs' // # 若已在项目中引入 systemjs, 则无需再次引入

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

export const getInfo = async (filePath: string) => {
  try {
    const info = await System.import(`/mk-ui/${VERSION}/${filePath}`)
    return info
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error)
    return null
  }
}

const getMeta = async () => {
  try {
    const info = await System.import(`/mk-ui/catalog.json`)
    return info
  } catch (error) {
    console.error('Failed to load catalog.json:', error)
    return null
  }
}

const fetchThumbnail = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch thumbnail: ${url}`)
    }
    const blob = await response.blob()
    const thumbnailUrl = URL.createObjectURL(blob)
    return thumbnailUrl
  } catch (error) {
    console.error(`Failed to fetch thumbnail: ${url}`, error)
    return null
  }
}

const fetchComponentData = async (component: any) => {
  const meta = await getInfo(component.meta)
  const thumbnail = await fetchThumbnail(component.thumbnail)
  return {
    ...component,
    meta: meta.default,
    thumbnail,
  }
}

/** 基础信息，主要是左侧栏目需要用到的数据 */
export const getMetaInfo = async () => {
  try {
    const info = await getMeta()
    if (!info) return null
    const _info = info.default || info
    console.log('_info', _info)
    const { components, ...rest } = JSON.parse(JSON.stringify(_info))

    const _components = await Promise.all(components.map(fetchComponentData))

    const metaInfo = {
      ...rest,
      components: _components,
    }

    console.log('metaInfo', metaInfo)
    return metaInfo
  } catch (error) {
    console.error('Failed to fetch catalog data:', error)
    return null
  }
}

const COMPONENT_REG = /([^.]+)(?:\.([^~]+))(?:~(.+))?$/

export function parseComponentName(libName: string, componentName: string) {
  const prefix = libName + '/'
  if (!componentName.startsWith(prefix)) {
    throw new Error(
      `Invalid component name: ${componentName} does not start with ${prefix}`
    )
  }
  const nonPrefixed = componentName.replace(prefix, '')
  const match = COMPONENT_REG.exec(nonPrefixed)
  if (!match) {
    return {
      name: nonPrefixed,
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

// 加载组件库
export const VERSION = '0.0.1'
export const importComponent = async (id: string) => {
  try {
    const lib = await System.import(`/mk-ui/${VERSION}/index.system.js`)
    console.log(lib)
  } catch (error) {
    console.error(`Failed to import component ${id}:`, error)
  }
}
