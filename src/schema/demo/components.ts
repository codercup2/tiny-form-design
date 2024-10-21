/**
 * 组件描述 demo
 */
import type { IComponentMeta } from '../src'

//  meta.json
// 页面布局组件
export const pageLayout: IComponentMeta = {
  name: '@kc/mk/market-page',
  title: '活动页默认布局',
  description: '页面布局描述',
  // 组件类别
  category: 'page-layout',
  slots: [
    'children',
    {
      name: 'hero',
      // 仅支持拖入头图类的组件以及单图组件
      // 实际业务只允许拖入一个头图类组件 #hero
      allow: ['#hero', '@kc/mk/single-image'],
      // 最多只能有一个组件
      disallow: ['@kc/mk/carousel'],
      // 最多只能有一个组件
      max: 1,
    }
  ],
  // title 和 description 为页面根节点组件的属性, 但被隐藏
  //  配置项描述中则不会有其配置描述
  configurations: [
    {
      name: 'hideFooter',
      type: 'boolean',
      title: '是否隐藏页脚',
      description: '开启后, 隐藏页脚',
      // 必填
      required: true
    },
  ],
  // 默认配置
  defaults: {
    hideFooter: false
  }
}

// 单图组件
export const singleImage: IComponentMeta = {
  name: '@kc/mk/single-image',
  title: '单图',
  description: '单图描述',
  category: 'image-text',
  configurations: [
    {
      name: 'src',
      type: 'string',
      component: 'image',
      title: '图片地址',
      description: '图片宽高比为 16:9',
      required: true
    },
    {
      name: 'href',
      type: 'string',
      component: 'link',
      title: '跳转链接',
      description: '点击图片跳转链接',
      required: true
    },
    {
      name: 'size',
      type: 'string',
      title: '图片尺寸',
      description: '图片尺寸xxx',
      options: ['small', 'medium', 'large'],
      required: false
    }
  ],
  defaults: {
    size: 'medium',
  }
}

// 轮播图组件
export const carousel: IComponentMeta = {
  name: '@kc/mk/carousel',
  title: '轮播图',
  description: '轮播图描述',
  category: 'image-text',
  configurations: [
    {
      name: 'autoplay',
      type: 'boolean',
      title: '自动播放',
      description: '开启后, 自动播放',
      required: false,
    },
    // 该属性被隐藏, 不在配置面板中展示, 也不会导出
    // {
    //   name: 'direction',
    //   type: 'string',
    //   title: '播放方向',
    //   options: ['horizontal', 'vertical'],
    // },
    {
      name: 'images',
      type: 'array',
      title: '轮播图片',
      description: '轮播图片, 最多5张',
      required: true,
      // 限制最大5张
      max: 5,
      items: [
        {
          // 数组成员为对象, name 为占位符, 无实际意义
          name: '_',
          type: 'object',
          // 对象折叠起来时的标题, 使用模版语法描述, $index 为数组下标
          title: '图片 ${$index} ${title}',
          items: [
            {
              name: 'src',
              type: 'string',
              component: 'image',
              title: '图片地址',
              required: true
            },
            {
              name: 'href',
              type: 'string',
              component: 'link',
              title: '跳转链接',
              required: true
            }
          ]
        }
      ]
    }
  ],
  // 默认配置
  defaults: {
    direction: 'horizontal',
  },
  // 变体配置
  variants: [
    {
      name: '@kc/mk/carousel~vertical',
      title: '垂直轮播',
      description: '垂直轮播描述',
      defaults: {
        direction: 'vertical'
      }
    }
  ]
}

export const marketTask: IComponentMeta = {
  name: '@kc/mk/market-task',
  title: '任务发奖',
  description: '任务发奖描述',
  category: 'task',
  // 不同业务场景下的默认值
  scene: {
    // 业务场景名
    '@kc/mk/scene-market': {
      // _bind 为 true, 表示该属性需要绑定业务场景 context
      _bind: true,
      // key 为组件属性名 , value 为业务场 context 中提供值的 keyPath
      taskStartAt: 'state.taskStartAt',
      taskStatus: 'state.taskStatus'
    }
  },
  configurations: [
    {
      name: 'title',
      type: 'string',
      // 纯文本翻译输入框, 需要处理属性 $ 后缀问题
      component: 'i18n-text',
      title: '标题',
      description: '任务标题',
      // 参数分组
      group: '活动任务配置',
      max: 20,
      required: true
    },
    {
      name: 'description',
      type: 'string',
      title: '描述',
      component: 'i18n-text',
      max: 200,
      description: '任务描述',
      group: '活动任务配置',
      required: true,
      // 额外配置, 用于设置文本行数
      extra: {
        lines: 5
      }
    },
    {
      name: 'taskCode',
      type: 'string',
      title: '任务代码',
      group: '活动任务配置',
      // 自定义控件, 该控件有副作用, 需要更新业务场景属性
      description: '业务场景属性 需要使用的  taskCode',
      component: 'market-task-code',
      required: true
    },
    {
      name: 'taskItems',
      type: 'array',
      title: '任务列表',
      description: '任务列表, 仅前端UI相关配置, 奖池配置等直接保存至后端',
      group: '活动任务配置',
      items: [
        {
          // 数组成员为对象, name 为占位符, 无实际意义
          name: '_',
          type: 'object',
          title: '任务 ${$index} ${title}',
          items: [
            {
              name: 'title',
              type: 'string',
              title: '标题',
              required: true
            },
            // 更多属性不赘述
          ]
        }
      ],
    },
    {
      name: 'taskPools',
      type: 'boolean',
      title: '奖池配置',
      description: '奖池配置, 因与前端无关, 此处为配置的副作用',
      group: '奖品直发配置',
      component: 'market-task-pools',
      required: true
    }
  ],
}

// 头图组件
export const marketHero: IComponentMeta = {
  name: '@kc/mk/market-hero',
  title: '头图',
  description: '头图描述',
  category: 'hero',
  configurations: [
    {
      name: 'title',
      type: 'string',
      // 纯文本翻译输入框, 因其有副作用(需要更新页面级标题), 所以使用特殊组件
      component: 'i18n-page-title',
      title: '标题',
      description: '头图标题',
      max: 20,
      required: true
    },
    {
      name: 'description',
      type: 'string',
      title: '描述',
      // 富文本翻译输入框,  因其有副作用(需要更新页面级描述), 所以使用特殊组件
      component: 'i18n-page-description-richtext',
      max: 200,
      description: '头图描述',
      required: true,
      extra: {
        lines: 8
      }
    }
  ]
}

// 主题
export const xmasTheme: IComponentMeta = {
  name: '@kc/mk/theme-xmas',
  title: '圣诞主题',
  description: '圣诞主题描述',
  category: 'theme',
  // 产品需求暂无主题配置, 仅作示例
  configurations: [
    {
      name: 'santaPosition',
      type: 'string',
      options: ['left', 'right', 'top', 'bottom'],
      title: '圣诞老人位置',
      description: '主题背景色',
      required: true
    },
  ],
  defaults: {
    santaPosition: 'right'
  }
}

// 业务场景组件
export const normalMarket: IComponentMeta = {
  name: '@kc/mk/scene-market',
  title: '普通活动场景',
  description: '普通市场场景描述',
  category: 'busi-scene',
  configurations: [
    {
      name: 'taskCode',
      type: 'string',
      title: '任务代码',
      description: '业务场景属性 需要使用的  taskCode',
      required: true
    }
  ]
}