import type { IPage } from '../typing/index'
// page.json
// 页面 schema 示例
export const someMarketPage: IPage = {
  // 页面根节点组件描述
  root: {
    id: 'root-1',
    // 页面使用布局, 使用类型为 page-layout 的组件
    type: '@kc/mk/market-page',
    // 页面使用的业务场景, 对应组件类型为 busi-scene 的组件名
    scene: '@kc/mk/scene-market',
    // 业务场景属性需要的业务属性配置
    sceneProps: {
      taskCode: 'xxxx',
    },
    // 页面主题
    theme: '@kc/mk/theme-xmas',
    // 组件插槽属性名
    slots: ['hero', 'children'],
    // 页面组件自身属性配置
    props: {
      // hero-2
      title$: 'hero-2.title',
      description$$: 'hero-2.description',
      // 是否隐藏页脚, 仅作demo示例
      hideFooter: false,
    },
  },
  // 页面根节点下的直接成员,即 children 插槽下的组件
  content: [
    {
      id: 'content-1',
      type: '@kc/mk/single-image',
      props: {
        src: 'https://xxx.com/xxx.png',
        href: 'https://xxxxx.com',
        size: 'large',
      },
    },
    {
      id: 'content-2',
      type: '@kc/mk/carousel',
      props: {
        autoplay: true,
        images: [
          {
            src: 'https://xxx.com/xxx1.png',
            href: 'https://xxx1.com',
          },
          {
            src: 'https://xxx.com/xxx2.png',
            href: 'https://xxx2.com',
          },
        ],
      },
    },
    {
      id: 'market-task-1',
      // 任务发奖组件
      type: '@kc/mk/market-task',
      props: {
        title: 'market-task-1.title_',
        description$html: 'market-task-1.description',
        // 业务场景属性 需要使用的  taskCode
        taskCode: '_t(xxxx)',
        // 任务列表, 仅前端UI相关配置, 奖池配置等直接保存至后端
        taskItems: [
          {
            title: 'xxxx',
            description: 'xxxx',
            icon: 'https://xxx.com',
          },
        ],
        // 奖池配置, 因与前端无关, 此处为配置的副作用
        taskPools: true,
      },
    },
  ],
  zones: {
    // 页面根节点下的头图插槽内容
    'root-1:hero': [
      {
        id: 'hero-2',
        type: '@kc/lego-mk/market-hero',
        props: {
          title$: 'hero-2.title',
          description$html: 'hero-2.description',
        },
      },
    ],
  },
  locales: {
    'hero-2.title': '圣诞特辑',
    'hero-2.description': '圣诞xxxx',
    'market-task-1.title': '圣诞活动',
    'market-task-1.description': '最高可领取xxxx',
  },
}
