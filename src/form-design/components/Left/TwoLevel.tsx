import clsx from 'clsx'
import { FC } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ICategoryComponentItem } from '../../data-source/helper'
import TwoLevelDrag from './TwoLevelDrag'

/** 两层结构的左侧物料区 */
const TwoLevel: FC<{ items: ICategoryComponentItem[] }> = ({ items }) => {
  return (
    <div className='left flex-basis-200px flex-shrink-0'>
      <h3>页面组件</h3>
      {/* <div className=''>{JSON.stringify(items)}</div> */}
      <Droppable droppableId={'left'} isDropDisabled={true}>
        {(provided, snapshot) => {
          return (
            <div
              className={clsx('flex flex-col gap-4 ', {
                'left-isDraggingOver': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item) => (
                <div key={item.name}>
                  <h4>{item.title}</h4>
                  <TwoLevelDrag list={item.list} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}
export default TwoLevel
