import { FC } from 'react'
import {} from '../../data-source/helper'
import {
  ICategoryComponent,
  ICategoryComponentFlat,
} from '../../data-source/typing'
import SingleLevel from './SingleLevel'
import TwoLevel from './TwoLevel'

const isSingleLevel = (items: ICategoryComponentFlat[]) => {
  return items.length > 0 && !('list' in items[0])
}

const isMultipleLevel = (items: ICategoryComponent[]) => {
  return items.length > 0 && 'list' in items[0]
}

const Left: FC<{
  items: ICategoryComponent[] | ICategoryComponentFlat[]
}> = ({ items }) => {
  if (isSingleLevel(items as ICategoryComponentFlat[])) {
    // console.log('isSingleLevel')
    return <SingleLevel items={items as ICategoryComponentFlat[]} />
  } else if (isMultipleLevel(items as ICategoryComponent[])) {
    // console.log('isMultipleLevel')
    return <TwoLevel items={items as ICategoryComponent[]} />
  } else {
    // 处理未知类型的情况
    return <div>Unknown items type</div>
  }
}

export default Left
