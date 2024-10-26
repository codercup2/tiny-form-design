import { FC } from 'react'
import {} from '../../data-source/helper'
import {
  ICategoryComponent,
  IComponentWithConsequenceId,
} from '../../data-source/typing'
import SingleLevel from './SingleLevel'
import TwoLevel from './TwoLevel'

const isSingleLevel = (items: IComponentWithConsequenceId[]) => {
  return items.length > 0 && !('list' in items[0])
}

const isMultipleLevel = (items: ICategoryComponent[]) => {
  return items.length > 0 && 'list' in items[0]
}

const Left: FC<{
  items: ICategoryComponent[] | IComponentWithConsequenceId[]
}> = ({ items }) => {
  if (isSingleLevel(items as IComponentWithConsequenceId[])) {
    // console.log('isSingleLevel')
    return <SingleLevel items={items as IComponentWithConsequenceId[]} />
  } else if (isMultipleLevel(items as ICategoryComponent[])) {
    // console.log('isMultipleLevel')
    return <TwoLevel items={items as ICategoryComponent[]} />
  } else {
    // 处理未知类型的情况
    return <div>Unknown items type</div>
  }
}

export default Left
