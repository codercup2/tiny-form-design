/**
 * 编辑器中的页面数据结构 schema
 */

/**
 * 页面 schema
 */
export interface IPage {
  /**
   * 页面组件自身信息
   */
  root: IPageNode
  /**
   * 页面根节点下的直接成员
   */
  content: INode[];
  /**
   * 插槽下的组件列表
   * key: ${nodeID}:${slotName}
   */
  zones: Record<string, INode[]>;
  /**
   * 组件配置中多语言配置
   * * key: 多语言的 key
   * * value: 多语言的 value(中文)
   */
  locales: Record<string, string>;
}


/**
 * 页面节点 schema
 */
export interface IPageNode extends INode {
  /**
   * 页面使用的业务场景, 对应组件类型为 busi-scene 的组件名
   */
  scene?: string;
  /**
   * 业务场景属性需要的配置
   */
  sceneProps?: Record<string, any>;
  /**
   * 页面主题, 对应组件类型为 theme 的组件名
   */
  theme?: string;
  /**
   * 页面使用布局 page-layout
   */
  type: string
}

/**
 * 组件实例 schema
 */
export interface INode {
  /**
   * 组件实例ID
   */
  id: string;
  /**
   * 组件名, Page, Carousel, List, LotteryBox, ...
   * - @kc/ui/button
   */
  type: string;
  /**
   * 插槽属性名, 例如: ['header', 'footer', 'children']
   * * children: 默认插槽
   */
  slots?: string[];
  /**
   * 组件属性
   * * key: 属性名
   *  * * `:` 开头的属性名, 表示其值为表达式, 需要解析处理
   *  * * `$` 结尾的属性名, 表示其值为纯文本多语言 key, 需要翻译, value 格式为 `${nodeID}.${propName}`
   *  * * `$html` 结尾的属性名, 表示其值为html多语言 key, 需要翻译, 注意 xss 问题, value 格式为 `${nodeID}.${propName}`
   * * value: 属性值
   */
  props?: Record<string, any>;
}



/**
 * 组合组件 schema
 */
export interface IComposedComponent extends INode {
  /**
   * 组件成员
   */
  items?: (IComposedComponent | string)[];
}

