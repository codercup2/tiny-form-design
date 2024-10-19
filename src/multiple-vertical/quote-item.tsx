import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Quote } from './types'

export const grid: number = 8
export const borderRadius: number = 2

type Props = {
  quote: Quote
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: React.CSSProperties
  index?: number
}

const getBackgroundColor = (isDragging: boolean, isGroupedOver: boolean) => {
  if (isDragging) {
    return 'yellow'
  }

  if (isGroupedOver) {
    // return colors.N30
    return 'red'
  }

  //   return colors.N0
  return 'blue'
}

const imageSize: number = 40

const getStyle = (
  provided: DraggableProvided,
  style: React.CSSProperties | undefined
) => {
  if (!style) {
    return provided.draggableProps.style
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  }
}

const QuoteItem: React.FC<Props> = (props) => {
  const { quote, isDragging, isGroupedOver, provided, style, isClone, index } =
    props

  return (
    <div
      className={`rounded-${borderRadius} border-2 border-transparent bg-${getBackgroundColor(
        isDragging,
        !!isGroupedOver
      )} shadow-none box-border p-${grid} min-h-${imageSize} mb-${grid} select-none text-gray-900 focus:outline-none focus:border-${2} focus:shadow-none ${
        isDragging ? 'shadow-[2px_2px_1px_rgba(0,0,0,0.42)]' : ''
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
    >
      {isClone && (
        <div className='bg-gray-100 absolute bottom-4 border-2 border-gray-200 rounded-full box-border text-xs w-10 h-10 flex items-center justify-center transform rotate-40 right--13 top--13'>
          Clone
        </div>
      )}
      <div className='flex-grow flex flex-col flex-basis-100%'>
        <div className='relative'>
          <span className='absolute top-0 left-0 text-2xl'>&ldquo;</span>
          <span className='absolute bottom-0 right-0 text-2xl'>&rdquo;</span>
          {quote.content}
        </div>
        <div className={`flex mt-${grid} items-center`}>
          <small className='flex-grow-1 flex-shrink-1 text-right text-ellipsis font-normal'>
            id:{quote.id}
          </small>
        </div>
      </div>
    </div>
  )
}

export default React.memo(QuoteItem)
