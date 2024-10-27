import { deepClone } from '../utils'
import { metaInfo } from './init'
import { ISlot } from './typing'

// 目前只有 '@kc/mk/market-page' 这种 pageLayout 组件
// export const defaultPageLayoutType = '@kc/mk/market-page'
export const defaultPageLayoutType = '@kc/lego-mk-ui/PlHeroTop'

export let initState = {
  // TODO: 如果不能左边拖拽过来，不需要放在左边，那么这个组件不需要有 G102 这样的id，那么是可以在这里指定一个的
  id: '-1',
  // type: '@kc/mk/market-page',
  type: defaultPageLayoutType,
  name: defaultPageLayoutType,
  theme: '@kc/mk/theme-xmas',
  title: '默认布局',
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
  const state = {
    ...initState,
    ...deepClone(rootComp), // 不能把基础数据搞乱了，要深拷贝一下
  }

  // 整理 slots, 只留下 ISlot 这样的类型
  if (typeof rootComp.slots === 'undefined') {
    state.slots = []
  } else if (typeof rootComp.slots === 'boolean') {
    if (rootComp.slots) {
      state.slots = [
        {
          name: 'children',
          children: [],
        },
      ] as any
    } else {
      state.slots = []
    }
  } else if (Array.isArray(rootComp.slots)) {
    state.slots = rootComp.slots.map((item: ISlot) => {
      if (typeof item === 'string') {
        return {
          name: 'children',
          children: [],
        }
      } else {
        return {
          ...item,
          children: [],
        }
      }
    })
  }
  // 处理 slot:{slotName}
  ;(state.slots as ISlot[]).forEach((slot) => {
    if (typeof slot === 'string') {
      state[`slot:${slot}`] = []
    } else {
      state[`slot:${slot.name}`] = []
    }
  })
  initState = deepClone(state)
  console.log('handleInitState->', initState)
}
