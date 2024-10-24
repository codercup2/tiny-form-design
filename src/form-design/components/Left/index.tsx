import { FC } from 'react'
import {
  ICategoryComponentItem,
  IComponentItemWithConsequenceId,
} from '../../data-source/helper'
import SingleLevel from './SingleLevel'
import TwoLevel from './TwoLevel'

const isSingleLevel = (items: IComponentItemWithConsequenceId[]) => {
  return items.length > 0 && !('list' in items[0])
}

const isMultipleLevel = (items: ICategoryComponentItem[]) => {
  return items.length > 0 && 'list' in items[0]
}

const Left: FC<{
  items: ICategoryComponentItem[] | IComponentItemWithConsequenceId[]
}> = ({ items }) => {
  console.log('left items:', items)

  if (isSingleLevel(items as IComponentItemWithConsequenceId[])) {
    // console.log('isSingleLevel')
    return <SingleLevel items={items as IComponentItemWithConsequenceId[]} />
  } else if (isMultipleLevel(items as ICategoryComponentItem[])) {
    // console.log('isMultipleLevel')
    return <TwoLevel items={items as ICategoryComponentItem[]} />
  } else {
    // 处理未知类型的情况
    return <div>Unknown items type</div>
  }
}

export default Left
