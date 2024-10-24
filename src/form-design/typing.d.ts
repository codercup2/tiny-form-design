type ICategoryItem = {
  id: string
  name: string
  max: number
  current: number
  preview: string
  slot?: {
    default: any[]
  }
}
type ISeed = {
  id: string
  category: string
  max: number
  current: number
  list: ICategoryItem[]
}

type IItem = {
  uuid: string
} & ICategoryItem

declare const System: any
