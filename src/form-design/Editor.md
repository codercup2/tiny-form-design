# 乐高编辑器

左侧是 2 层的数据结构（包括类别和组件），中间是一个展示效果，右侧是属性。

左侧拖入中间的都是写好的，直接把东西导入进去就行，可以直接渲染出来。

## 数据结构

```ts
// 经过协商，改为如下树状数据结构 2024-10-26 周六 晚23点
const root = {
  /** 几个特别的根节点的属性 */
  // 多语言
  locales: {},
  // 页面主题
  theme: '',
  // 页面使用的业务场景
  scene: '@kc/mk/scene-market',
  // 业务场景属性需要的业务属性配置
  sceneProps: {
    taskCode: 'xxxx',
  },
  /** 下面是通用的 */
  id: 'root',
  name: '@kc/mk/market-page',
  props: {},
  slots: ['hero', 'children'],
  'slot:hero': [
    {
      id: 'hero',
      name: '@kc/mk/market-hero',
      props: {
        title: 'Christmas',
        description: 'Christmas',
      },
    },
  ],
  'slot:children': [
    {
      id: 'xxx',
      name: 'xxx',
      props: {},
      slots: ['children'],
      'slot:children': [
        {
          id: 'xxx',
          name: 'xxx',
          props: {},
          slots: [],
        },
      ],
    },
  ],
}
```

```ts
// 经过协商，改为如下树状数据结构 2024-10-26 周六 晚23点
const root = {
  /** 几个特别的根节点的属性 */
  // 多语言
  locales: {},
  // 页面主题
  theme: '',
  // 页面使用的业务场景
  scene: '@kc/mk/scene-market',
  // 业务场景属性需要的业务属性配置
  sceneProps: {
    taskCode: 'xxxx',
  },
  /** 下面是通用的 */
  id: 'root',
  name: '@kc/mk/market-page',
  props: {},
  slots: [
    {
      name: 'hero',
      children: [
        {
          id: 'hero',
          name: '@kc/mk/market-hero',
          props: {
            title: 'Christmas',
            description: 'Christmas',
          },
        },
      ],
    },
    {
      name: 'children',
      allow: ['@kc/mk/mk-card'],
      disallow: ['@kc/mk/mk-card-list'],
      max: 3,
      children: [
        {
          id: 'xxx',
          name: 'xxx',
          props: {},
          slots: [
            {
              name: 'children',
              children: [
                {
                  id: 'xxx',
                  name: 'xxx',
                  props: {},
                  slots: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```
