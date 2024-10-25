import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import {
  Draggable,
  Droppable,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import { PREFIX } from '../../data-source/init'
import { ISlot, ISlotMore } from '../../data-source/typing'
import { IPage } from '../../typing/app-schema'

const flatComps = [
  {
    name: '@kc/lego-mk-ui/HeroV1',
    title: 'HeroV1 component',
    category: 'hero',
    meta: 'components/hero-v1/meta.json',
    thumbnail: 'components/hero-v1/descriptive-res/thumbnails/index.png',
    configurations: [
      {
        required: true,
        name: 'title',
        type: 'string',
      },
      {
        required: true,
        name: 'description',
        type: 'string',
      },
      {
        required: true,
        name: 'image',
        type: 'string',
      },
      {
        required: true,
        name: 'activeButton',
        type: 'string',
      },
      {
        required: true,
        name: 'shareButton',
        type: 'string',
      },
    ],
    id: 'G100',
    sort: 100,
  },
  {
    name: '@kc/lego-mk-ui/CalendarV1',
    title: 'CalendarV1 component',
    category: 'image-text',
    meta: 'components/calendar-v1/meta.json',
    thumbnail: 'components/calendar-v1/descriptive-res/thumbnails/index.png',
    configurations: [
      {
        required: true,
        name: 'name',
        type: 'string',
      },
      {
        required: true,
        name: 'subtitle',
        type: 'string',
      },
      {
        required: true,
        name: 'title',
        type: 'string',
      },
      {
        required: true,
        name: 'content',
        type: 'string',
      },
    ],
    id: 'G101',
    sort: 101,
  },
  {
    name: '@kc/lego-mk-ui/PlHeroTop',
    title: '默认页面布局组件',
    category: 'page-layout',
    meta: 'components/pl-hero-top/meta.json',
    thumbnail: 'components/pl-hero-top/descriptive-res/thumbnails/index.png',
    configurations: [],
    slots: [
      {
        name: 'hero',
        title: '头图插槽',
        max: 1,
        allow: ['#hero'],
      },
      {
        name: 'children',
        disallow: ['#hero'],
      },
    ],
    id: 'G102',
    sort: 102,
  },
]
type Props = {
  // 所在的父级的Zone名称（比如 'root-1:children'）这样方便定位到具体的Zone
  // 如果pZone为'',则表示是根节点,在root里面查找slots信息
  // 否则去zones里面查找slots信息
  // 查找slots信息是为了确定该区域是否可以放某个类型的组件（allow+disallow)
  pZone: string
  id: string
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
  slotName: string
}

const checkAllowDisallow = () => {}
const handleCheckAllow = (
  pZone: string,
  slotName: string,
  snapshot: DroppableStateSnapshot,
  state: any
) => {
  // 只有拖进入区域才判断，没拖进来不需要判断
  if (!snapshot.isDraggingOver) {
    return true
  }
  // TODO: 这里需要判断拖拽的元素是否允许拖入到此区域，根据allow or disallow
  if (pZone === '') {
    const slots = state.root.slots || []
    const idx = slots.findIndex((item: ISlot) => {
      if (typeof item === 'string') {
        return item === slotName
      } else {
        return (item as ISlotMore).name === slotName
      }
    })
    if (idx === -1) {
      console.error('slotName not found in root slots')
      return false
    }
    const slotInfo = slots[idx]
    if (typeof slotInfo === 'string') {
      // 只有一个字符串，那就什么都可以放进去
      return true
    }
    // 得到比如 G100 这样的id
    const draggableId = snapshot.draggingOverWith
    // 再得到对应的组件的元信息
    const dragCompInfo = flatComps.find((item) => item.id === draggableId)
    if (!dragCompInfo) {
      console.error(`draggableId not found in flatComps: ${draggableId}`)
      return false
    }
    const judge = (item: string) => {
      // 以#开头的表示为某个类型
      if (item.startsWith('#')) {
        const allowCategory = item.slice(1)
        return allowCategory === dragCompInfo.category
      }
      // 组件名字对得上就可以
      return item === dragCompInfo.name
    }

    if (slotInfo.allow) {
      return slotInfo.allow.some(judge)
    }
    if (slotInfo.disallow) {
      return !slotInfo.disallow.some(judge)
    }
    return true
  }
}

const DropZone: FC<Props> = ({ pZone, id, state, setState, slotName }) => {
  const { zones } = state
  const dropzoneId = `${id}:${slotName}`
  const comps = zones[dropzoneId] || []

  return (
    <Droppable droppableId={dropzoneId}>
      {(provided, snapshot: DroppableStateSnapshot) => {
        const checkAllow = handleCheckAllow(pZone, slotName, snapshot, state)
        console.log(checkAllow)
        const getCls = () => {
          if (!snapshot.isDraggingOver) {
            return 'bg-green-200'
          }
          if (checkAllow) {
            return 'bg-green-300'
          }
          return 'bg-red-500 cursor-not-allowed'
        }
        return (
          <div
            className={clsx('content flex-1', getCls(), {
              'h-40': comps.length === 0,
              // 这里需要判断拖拽的元素是否允许拖入到此区域，根据allow or disallow
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              <div className='break-all'>
                Droppable snapshot:{JSON.stringify(snapshot)}
              </div>
              {comps.map((item, index) => {
                console.log(console.log(item))
                return (
                  <Draggable
                    // 这里 id是唯一的，`原本的Id_${Date.now()}` 的形式
                    draggableId={item.id}
                    index={index}
                    key={item.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={clsx(
                          'border-dashed border-base p-2 relative',
                          {
                            'bg-green-100': snapshot.isDragging,
                            'border-left-highlight': item.id === id,
                          }
                        )}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          src={PREFIX + item.thumbnail}
                          alt='Thumbnail'
                          width={'100%'}
                        />
                        {item.id} - {item.title}
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          </div>
        )
      }}
    </Droppable>
  )
}
export default DropZone
