import { getMetaInfo } from './init'

export type IComponentItem = {
  /** 类别：hero */
  category: string
  /** 组件名：@kc/lego-mk-ui/HeroV1 */
  name: string
  /** 中文名：HeroV1 component */
  title: string
  /** 缩略图：blob:http://localhost:5173/8321336d-d5bc-4b5c-abe0-95ac6c7b1cad */
  thumbnail: string
  meta: any
}
export type IComponentItemWithConsequenceId = IComponentItem & {
  id: string
}
// 处理gragdableId的连续性
let idCount = 100
/** 已经处理后的seed数据 */
export const handleComponents = async (): Promise<
  IComponentItemWithConsequenceId[]
> => {
  const { components } = await getMetaInfo()
  return components.map((item: IComponentItem) => ({
    ...item,
    id: `G${idCount++}`,
  }))
}
