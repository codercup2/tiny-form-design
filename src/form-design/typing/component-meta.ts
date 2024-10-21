/**
 * 组件描述相关类型定义
 */

/**
 * 组件索引
 * 隐藏的组件不在此列表中
 */
export type IComponentList = IComponentItem[]

export interface IComponentItem {
  /**
   * 组件名(唯一标识, 用于代码中引用), 此处名称为完整的组件名, 如: @kc/market-ui/tab.TabContent
   */
  name: string
  /**
   * 组件中文标题
   */
  title: string
  /**
   * 组件描述
   */
  description: string
  /**
   * 组件类别
   */
  category: string
  /**
   * 是否隐藏组件, 即不在组件列表中展示
   */
  hidden?: true
  /**
   * 插槽配置, 方便在编辑器中直接使用(不必从组件描述信息中异步获取)
   */
  slots?: IComponentBaseMeta['slots']
}

export interface IComponentItemWithConsequenceId extends IComponentItem {
  id: string
}
/**
 * 组件分类
 */
export type IComponentCategory =
  // 普通布局组件
  | 'layout'
  // 业务场景组件
  | 'busi-scene'
  // 页眉
  | 'header'
  // 普通UI元素, 默认类型
  | 'element'
  // 页面布局
  | 'page-layout'
  // 图文组件
  | 'image-text'
  // 任务发奖组件
  | 'task'
  // 主题
  | 'theme'
  // 头图
  | 'hero'

/**
 * 组件元信息描述
 */
export interface IComponentMeta extends IComponentBaseMeta {
  /**
   * 组件构成类型
   * code: 代码构成, 默认
   * composed: 组合构成, 通过组合其他组件构成(JSON)
   */
  compositionType?: 'code' | 'composed'
  /**
   * 组件类型
   */
  category: IComponentCategory
  /**
   * 是否隐藏组件, 即不在组件列表中展示
   * * variants 中的组件不受此属性影响, 只要有变体组件, 就会显示
   */
  hidden?: boolean
  /**
   * 组件业务场景
   *  * key: 业务场景名, 如: 活动抽奖
   *  * value: 该场景下的属性配置默认值
   */
  scene?: Record<string, Record<string, any>>
  /**
   * 相关的子组件
   */
  associated?: IComponentBaseMeta[]
  /**
   * 变体组件
   */
  variants?: IVariantComponent[]
}

/**
 * 页面场景组件元信息描述
 */
export interface IPageSceneComponentMeta extends IComponentMeta {
  /**
   * 组件类型数量限制
   * * key: 组件类型名, 如: header, hero
   * * value: 该类型组件数量最大限制
   */
  categoryAmountLimit?: Record<string, number>
}

export interface ISlotMeta {
  /**
   * 拥有插槽的属性名
   * * children 为默认插槽
   * * 其他插槽名, 为具名插槽, 比如: header, footer 等
   */
  name: string

  /**
   * 插槽标题
   */
  title?: string

  /**
   * 插槽描述
   */
  description?: string

  /**
   * 插槽允许拖入的组件(类型)列表, 组件类型使用 # 前缀
   * #hero, @kc/ui/button
   */
  allow?: string[]

  /**
   * 插槽不允许拖入的组件(类型)列表, 组件类型使用 # 前缀
   */
  disallow?: string[]
  /** 下述属性暂时可不实现 */
  /**
   * 插槽最多可拖入组件数量
   */
  max?: number
  /**
   * 插槽需要使用的容器组件
   * * 若不填, 则不使用容器组件
   * * 若提供, 则默认查找当前组件的子组件中是否有该组件, 有则使用作为包裹容器, 没有则全局查找该组件
   * * 如 Flex 组件, 则使用 Item 作为包裹容器
   */
  component?: string
}

export interface IComponentBaseMeta {
  /**
   * 组件名(唯一标识, 用于代码中引用) TabContent
   * * 若是子组件, 则name在当前组件的子组件中唯一即可
   * * 子组件使用 . 与组件名分割, 如 @kc/market-ui/tab.TabContent
   */
  name: string
  /**
   * 组件中文标题
   */
  title: string
  /**
   * 组件描述
   */
  description?: string
  /**
   * 组件属性配置项目
   */
  configurations?: IConfigurationItem[]
  /**
   * 组件默认属性
   */
  defaults?: any
  /**
   * 插槽描述
   * * 若为 true, 则表示有默认插槽且不使用额外容器包裹
   * * 若为字符串数组, 则为拥有具名插槽的属性名, 且不使用额外容器包裹
   * * 若为 ISlotMeta 数组, 则为具名插槽的描述
   * * 若为 false, 则表示没有插槽
   */
  slots?: boolean | (string | ISlotMeta)[]
}

export interface IVariantComponent {
  /**
   * 变体组件名(唯一标识, 在此组件的变体中唯一即可, 不需要前缀, 缩略图亦使用此名称) vertical
   * * 变体与组件名使用 ~ 分割: @kc/market-ui/tab~vertical
   */
  name: string
  /**
   * 变体组件中文标题
   */
  title: string
  /**
   * 变体组件描述
   */
  description?: string
  /**
   * 组件属性配置项目
   */
  defaults: any
}

export interface IConfigurationItem {
  /**
   * 属性名(唯一标识, 用于代码中引用)
   */
  name: string
  /**
   * 属性中文标题
   */
  title: string
  /**
   * 属性分组中文名, 同一名称即显示在同一分组
   */
  group?: string
  /**
   * 属性描述
   */
  description?: string
  /**
   * 自定义渲染组件的配置表单组件名, 该表单组件需在编辑器中注册
   */
  component?: string
  /**
   * 属性类型
   * string: 字符串
   * number: 数字
   * boolean: 布尔
   * object: 对象
   * array: 数组
   */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  /**
   * 对象和数组成员属性, 仅当 type 为 object 或 array 且 components 及 options 未提供时有效
   * 若 type 为 object, 则为对象属性配置
   * 若 type 为 array, 则为数组元素配置, 理论上数组成员可以有多种类型, 但目前只支持一种
   */
  items?: IConfigurationItem[]
  /**
   * 枚举值, 若有该属性, 则使用下拉选框或者单选框渲染
   * 若为字面量数组, 则为 label 和 value 相同
   */
  options?: { value: any; label: string }[] | string[] | number[]
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 最小值, 仅当 type 为 number / string / array 时有效
   * number: 数字最小值
   * string: 字符串最小长度
   * array: 数组最小长度
   */
  min?: number
  /**
   * 最大值, 仅当 type 为 number / string / array 时有效
   * number: 数字最大值
   * string: 字符串最大长度
   * array: 数组最大长度
   */
  max?: number
  /**
   * 额外属性, 非校验相关的其他影响表单控件渲染的属性
   */
  extra?: any
}

/**
 * 页面布局组件基础属性
 */
export interface IPageLayoutBaseProps {
  /**
   * 页面标题, seo 标题
   * 在运营活动中, 该属由头图组件中的标题属性设置, 故运营活动中的页面标题需要 @hidden
   */
  title: string
  /**
   * 页面描述, seo 描述
   * 在运营活动中, 该属由头图组件中的描述属性设置, 故运营活动中的页面描述需要 @hidden
   */
  description: string
}
