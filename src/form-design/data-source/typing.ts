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
  list: IComponentWithConsequenceId[]
}

export type IComponentWithConsequenceId = IComponent & {
  id: string
  sort: number
}
