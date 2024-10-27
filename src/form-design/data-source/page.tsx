import { deepClone } from '../utils'
import { ICategoryComponentFlat, ISlot } from './typing'

// 目前只有 '@kc/mk/market-page' 这种 pageLayout 组件
// export const defaultPageLayoutType = '@kc/mk/market-page'
export const defaultPageLayoutType = '@kc/lego-mk-ui/PlHeroTop'

export const initState = {
  // TODO: 如果不能左边拖拽过来，不需要放在左边，那么这个组件不需要有 G102 这样的id，那么是可以在这里指定一个的
  id: '-1',
  // type: '@kc/mk/market-page',
  type: defaultPageLayoutType,
  name: defaultPageLayoutType,
  theme: '@kc/mk/theme-xmas',
  scene: '@kc/mk/scene-market',
  sceneProps: {
    taskCode: '',
  },
  zones: {} as Record<string, any>,
  locales: {} as Record<string, string>,
  slots: [],
  props: {},
}
/**
 * 对初始数据，查询出更多的信息，填充到 state 中
 * @returns
 */
export function handleInitState(flatComps: ICategoryComponentFlat[]) {
  const state = initState
  const rootComp = flatComps.find(
    (item) => item.name === defaultPageLayoutType
  ) as any
  if (!rootComp) {
    console.error('root component not found')
    return state
  }
  state.root = {
    ...state.root,
    ...deepClone(rootComp),
    // 默认把defaults 放到 props
    props: deepClone(rootComp.defaults || {}),
  }

  // 处理propss
  // 通过 state.root.type 即 defaultPageLayoutType 拿到其他元信息
  if (typeof rootComp.slots === 'undefined') {
    state.root.slots = []
  } else if (typeof rootComp.slots === 'boolean') {
    if (rootComp.slots) {
      state.root.slots = ['children'] as any
    } else {
      state.root.slots = []
    }
  } else if (Array.isArray(rootComp.slots)) {
    state.root.slots = rootComp.slots
  }
  // 处理zones
  ;(state.root.slots as ISlot[]).forEach((slot) => {
    const rootId = state.root.id // 经过上面的处理，这里已经不是最开始的
    if (typeof slot === 'string') {
      state.zones[`${rootId}:${slot}`] = []
    } else {
      state.zones[`${rootId}:${slot.name}`] = []
    }
  })
  console.log('handleInitState->', state)
}
