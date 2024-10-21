/**
 * 组件索引列表 demo
 */
import type { IComponentList } from '../typing/index'

// 组件列表, 全量所有会被渲染的组件
// 这几类组件不在组件列表中呈现: page-layout(页面布局), busi-scene(业务场景), theme(主题)
export const components: IComponentList = [
  {
    name: '@kc/mk/market-page',
    title: '活动页默认布局',
    description: '页面布局描述',
    category: 'page-layout',
    slots: [
      'children',
      {
        name: 'hero',
        // 仅支持拖入头图类的组件以及单图组件
        // 实际业务只允许拖入一个头图类组件 #hero
        allow: ['#hero', '@kc/mk/single-image', '@kc/mk/carousel'],
        // 最多只能有一个组件
        max: 1,
      },
    ],
  },
  {
    name: '@kc/mk/single-image',
    title: '单图',
    description: '单图描述',
    category: 'hero',
    // 隐藏, 不在组件列表中展示
    // hidden: true,
  },
  {
    name: '@kc/mk/carousel',
    title: '轮播图',
    description: '轮播图描述',
    category: 'image-text',
  },
  {
    name: '@kc/mk/market-task',
    title: '任务发奖',
    description: '任务发奖描述',
    category: 'task',
  },
  {
    name: '@kc/mk/theme-xmas',
    title: '圣诞主题',
    description: '圣诞主题描述',
    category: 'theme',
  },
  {
    name: '@kc/mk/scene-market',
    title: '市场场景',
    description: '市场场景描述',
    category: 'busi-scene',
  },
]
