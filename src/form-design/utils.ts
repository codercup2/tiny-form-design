import { pageLayout } from './data-source-bak/components'
import { IPage } from './typing/app-schema'

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// 目前只有 '@kc/mk/market-page' 这种 pageLayout 组件
export function getPageLayoutMeta() {
  const rootId = 'root'
  const state: IPage = {
    root: {
      id: rootId,
      // type: '@kc/mk/market-page',
      // type: '@kc/lego-mk-ui/PlHeroTop',
      type: '@kc/lego-mk-ui/HeroV1', // 一样报错
      // 页面使用的业务场景, 对应组件类型为 busi-scene 的组件名
      scene: '@kc/mk/scene-market',
    },
    zones: {},
    locales: {},
  }
  // 处理props
  state.root.props = pageLayout.defaults

  if (typeof pageLayout.slots === 'undefined') {
    state.root.slots = []
  } else if (typeof pageLayout.slots === 'boolean') {
    if (pageLayout.slots) {
      state.root.slots = ['children']
    } else {
      state.root.slots = []
    }
  } else if (Array.isArray(pageLayout.slots)) {
    state.root.slots = (pageLayout.slots || []).map((item) => {
      if (typeof item === 'string') {
        return item
      }
      if ('name' in item && typeof item.name === 'string') {
        return item.name
      }
      console.error('invalid slot name', item)
      return 'error-slot-name'
    })
  }
  // 处理zones
  ;(state.root.slots as string[]).forEach((slot) => {
    state.zones[`${rootId}:${slot}`] = []
  })
  return state
}
