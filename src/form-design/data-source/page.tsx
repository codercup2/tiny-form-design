import { deepClone } from '../utils'
import { IComponentItemWithConsequenceId } from './helper'

// 目前只有 '@kc/mk/market-page' 这种 pageLayout 组件
export const rootId = 'root'
// export const defaultPageLayoutType = '@kc/mk/market-page'
export const defaultPageLayoutType = '@kc/lego-mk-ui/PlHeroTop'

export const initState = {
  root: {
    id: rootId,
    // type: '@kc/mk/market-page',
    type: defaultPageLayoutType,
    theme: '@kc/mk/theme-xmas',
    scene: '@kc/mk/scene-market',
    sceneProps: {
      taskCode: '',
    },
  },
  zones: {},
  locales: {},
}
/**
 * 对初始数据，查询出更多的信息，填充到 state 中
 * @returns
 */
export function handleInitState(flatComps: IComponentItemWithConsequenceId[]) {
  const state = deepClone(initState)
  const rootComp = flatComps.find((item) => item.name === defaultPageLayoutType)
  state.root = {
    ...state.root,
    ...rootComp,
  }
  console.log('handleInitState->', state)
  // 处理propss
  // 通过 @kc/lego-mk-ui/PlHeroTop 拿到其他元信息
  // 已经在 allComps 里面有，直接查找就行
  // const allComps = getAllComponents() // TODO 异步数据获取
  // const item = allComps.find((item) => item.name === '@kc/lego-mk-ui/PlHeroTop')
  // if (typeof pageLayout.slots === 'undefined') {
  //   state.root.slots = []
  // } else if (typeof pageLayout.slots === 'boolean') {
  //   if (pageLayout.slots) {
  //     state.root.slots = ['children']
  //   } else {
  //     state.root.slots = []
  //   }
  // } else if (Array.isArray(pageLayout.slots)) {
  //   state.root.slots = (pageLayout.slots || []).map((item) => {
  //     if (typeof item === 'string') {
  //       return item
  //     }
  //     if ('name' in item && typeof item.name === 'string') {
  //       return item.name
  //     }
  //     console.error('invalid slot name', item)
  //     return 'error-slot-name'
  //   })
  // }
  // 处理zones
  // ;(state.root.slots as string[]).forEach((slot) => {
  //   state.zones[`${rootId}:${slot}`] = []
  // })
  return state
}
