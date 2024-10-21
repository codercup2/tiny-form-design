import { FC } from 'react'
import SingleLevel from './SingleLevel'
import TwoLevel from './TwoLevel'

const isICategoryItemArray = (items: any[]): items is ICategoryItem[] => {
  return items.length > 0 && !('list' in items[0])
}

const isISeedArray = (items: any[]): items is ISeed[] => {
  return items.length > 0 && 'list' in items[0]
}
const Left: FC<{ items: ISeed[] | ICategoryItem[] }> = ({ items }) => {
  if (isICategoryItemArray(items)) {
    return <SingleLevel items={items} />
  } else if (isISeedArray(items)) {
    return <TwoLevel items={items} />
  } else {
    // 处理未知类型的情况
    return <div>Unknown items type</div>
  }
}
export default Left
