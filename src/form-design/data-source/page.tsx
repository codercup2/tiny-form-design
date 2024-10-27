import { deepClone } from '../utils'
import { metaInfo } from './init'
import { ISlot } from './typing'

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
export function handleInitState() {
  const { leftFlatComps } = metaInfo
  const rootComp = leftFlatComps.find(
    (item) => item.name === defaultPageLayoutType
  ) as any
  console.log('rootComp', rootComp)
  if (!rootComp) {
    console.error('root component not found')
    return
  }
  initState.slots = rootComp.slots
  initState.props = deepClone(rootComp.defaults || {})

  // 处理propss
  // 通过 state.root.type 即 defaultPageLayoutType 拿到其他元信息
  if (typeof rootComp.slots === 'undefined') {
    initState.slots = []
  } else if (typeof rootComp.slots === 'boolean') {
    if (rootComp.slots) {
      initState.slots = ['children'] as any
    } else {
      initState.slots = []
    }
  } else if (Array.isArray(rootComp.slots)) {
    initState.slots = rootComp.slots
  }
  // 处理zones
  ;(initState.slots as ISlot[]).forEach((slot) => {
    if (typeof slot === 'string') {
      initState[`slot:${slot}`] = []
    } else {
      initState[`slot:${slot.name}`] = []
    }
  })
  console.log('handleInitState->', initState)
}
