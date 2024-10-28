import clsx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'
import { LIB_PREFIX_VERSION } from '../../data-source/init'
import { ICategoryComponentFlat } from '../../data-source/typing'

/** 方便CloneItem时一起使用 */
const RenderItem = ({ item }: { item: ICategoryComponentFlat }) => {
  const { id, name, title, thumbnail } = item

  return (
    <div className='seed border-rounded text-center leading-loose'>
      <img
        src={LIB_PREFIX_VERSION + thumbnail}
        alt='Thumbnail'
        width={'100%'}
      />
      <div>
        <div>id:{id}</div>
        <div>name:{name}</div>
        <div>title:{title}</div>
      </div>
    </div>
  )
}

export default function TwoLevelDrag({
  //   parentIdx,
  list,
}: {
  //   parentIdx: number
  list: ICategoryComponentFlat[]
}) {
  if (!list.length) {
    return <div>暂无数据</div>
  }
  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          {/* 这里使用index会报错，自己生成一个连续的 sort 来使用 */}
          <Draggable index={item.sort} draggableId={item.id} key={item.id}>
            {(provided, snapshot) => (
              <>
                <div
                  className={clsx('', {
                    '!translate-x-0 !translate-y-0': !snapshot.isDragging,
                  })}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <RenderItem item={item} />
                </div>
                {/* 通过clone一个元素来解决拖拽时，物料元素不见了的问题 */}
                {snapshot.isDragging && <RenderItem item={item} />}
              </>
            )}
          </Draggable>
          <div>
            {item.id} - {item.title}
          </div>
        </div>
      ))}
    </div>
  )
}
