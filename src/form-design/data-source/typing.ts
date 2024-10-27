/* eslint-disable @typescript-eslint/no-namespace */
export type ISlot = string | ISlotMore
export type ISlotMore =
  | {
      name: string
      allow?: string[]
    }
  | {
      name: string
      disallow?: string[]
    }

export interface ICategory {
  name: string
  title: string
}

export interface IComponent {
  name: string
  title: string
  category: string
  meta: string
  thumbnail: string
}

export interface IBaseMeta {
  name: string
  version: string
  format: string
  entry: string
  style: string
  categories: ICategory[]
  components: IComponent[]
}

export type ICategoryComponent = {
  id: number
  name: string
  title: string
  list: ICategoryComponentFlat[]
}

export type ICategoryComponentFlat = IComponent & {
  /** id: G100，比sort多一个 G 字母 */
  id: string
  /** sort: 100，用在DraggableId*/
  sort: number
  /** 组件的实例 */
  instance: any
}

export namespace RootNs {
  // 定义基本的组件接口
  export interface IComponent {
    id: string
    name: string
    props: Record<string, any>
    slots: string[]
    [key: `slot:${string}`]: IComponent[]
  }

  // 定义根节点的接口
  export interface IRoot extends IComponent {
    locales: Record<string, string>
    theme: string
    scene: string
    sceneProps: Record<string, any>
  }
}
