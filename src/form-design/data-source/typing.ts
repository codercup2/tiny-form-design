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
