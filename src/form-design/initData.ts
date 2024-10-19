export enum IFormItemType {
  input = 'input',
  textarea = 'textarea',
  radio = 'radio',
  upload = 'upload',
}

export const seeds: ISeed[] = [
  {
    id: 'a1',
    category: '头图类',
    max: 10,
    current: 0,
    list: [
      {
        id: 'A-1',
        name: '头图样式1',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
      {
        id: 'A-2',
        name: '头图样式2',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
      {
        id: 'A-2',
        name: '有一个slot',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
        slot: {
          default: [],
        },
      },
    ],
  },
  {
    id: 'b2',
    category: '文本类',
    max: 10,
    current: 0,
    list: [
      {
        id: 'B-1',
        name: '一排一',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
      {
        id: 'B-2',
        name: '一排二',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
    ],
  },
  {
    id: 'c3',
    category: '图文类',
    max: 5,
    current: 0,
    list: [
      {
        id: 'C-1',
        name: '单图',
        max: 10,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
    ],
  },
  {
    id: 'd4',
    category: '任务发奖组件',
    max: 1,
    current: 0,
    list: [
      {
        id: 'D-1',
        name: '任务&直发1',
        max: 1,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
      {
        id: 'D-2',
        name: '任务&直发2',
        max: 1,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
      {
        id: 'D-3',
        name: '任务&直发3',
        max: 1,
        current: 0,
        preview: 'https://via.placeholder.com/400x200.png/3c9cff/fff',
      },
    ],
  },
]

// 处理gragdableId的连续性
let idCount = 100
/** 已经处理后的seed数据 */
export const handledSeeds = ((seeds: ISeed[]): ISeed[] => {
  return seeds.map((seed) => ({
    ...seed,
    list: seed.list.map((item) => ({
      ...item,
      id: `G${idCount++}`,
    })),
  }))
})(seeds)
console.log(handledSeeds)

/** 从 seeds 里面获取所有的Item */
export const allItems: ICategoryItem[] = handledSeeds.reduce<ICategoryItem[]>(
  (acc, cur) => {
    return acc.concat(cur.list)
  },
  []
)
