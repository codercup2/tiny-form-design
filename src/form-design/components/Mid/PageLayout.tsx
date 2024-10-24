import { ReactNode } from 'react'

type IProps = {
  children: ReactNode
  hero: ReactNode
  hideFooter: boolean
}

export default function PageLayout({ children, hero, hideFooter }: IProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        头图区域
        <div className='hero-slot'>{hero}</div>
      </div>
      <div className='flex flex-col gap-2'>
        children区域
        <div className='children-slot'>{children}</div>
      </div>
      {!hideFooter && <div className='flex flex-col gap-2'>页脚区域</div>}
    </div>
  )
}
