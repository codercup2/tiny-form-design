import {
  ComponentType,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { importComponent } from '../../data-source/init'
import { IPage } from '../../typing/app-schema'
import DropZone from './DropZone'

type Props = {
  state: IPage
  setState: Dispatch<SetStateAction<IPage>>
}

/** 中间内容 */
const Mid: FC<Props> = ({ state, setState }) => {
  const { slots = [], configurations = [], id: rootId } = state.root
  const [Comp, setComp] = useState<ComponentType<any> | null>(null)

  const props: any = {
    // TODO check 是否需要增加这2个
    title: '根节点 title',
    description: '根节点 description',
  }
  // configurations 配置项的东西展示出来
  configurations.forEach((conf) => {
    const name = conf.name
    // 要先判断 $$, 再判断 $,顺序不能反
    // $$ 或 $ 的要去 locales 里面查找，其他的直接看 props 的值
    if (name.endsWith('$$')) {
      const realName = name.slice(0, -2)
      props[realName] = state.locales[`${rootId}:${name}`]
    } else if (name.endsWith('$')) {
      const realName = name.slice(0, -1)
      props[realName] = state.locales[`${rootId}:${name}`]
    } else {
      props[conf.name] = conf.value
    }
  })
  slots.forEach((slot) => {
    if (typeof slot === 'string') {
      props[slot] = (
        <DropZone
          state={state}
          setState={setState}
          id={rootId}
          slotName={slot}
        />
      )
    }

    props[slot.name] = (
      <DropZone
        state={state}
        setState={setState}
        id={rootId}
        slotName={slot.name}
        allow={slot.allow}
        disallow={slot.disallow}
      />
    )
  })
  useEffect(() => {
    importComponent(state.root.type).then((FC) => {
      setComp(() => FC)
    })
  }, [state.root.type])

  const RenderComp = () => {
    if (!Comp) {
      return <div>默认的</div>
    }
    // TODO: 通过配置文件得到组件的props, 生成组件
    return <Comp {...props} />
  }

  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>Payout</h3>
      </div>

      <RenderComp />
    </div>
  )
}
export default Mid
