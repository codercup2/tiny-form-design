import React from 'react'
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import QuoteItem from './quote-item'
import { Quote } from './types'

export const grid: number = 8
export const borderRadius: number = 2

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return 'bg-red-100'
  }
  if (isDraggingFrom) {
    return 'bg-teal-100'
  }
  return 'bg-gray-100'
}

type Props = {
  listId?: string
  listType?: string
  quotes: Quote[]
  title?: string
  internalScroll?: boolean
  scrollContainerStyle?: React.CSSProperties
  isDropDisabled?: boolean
  isCombineEnabled?: boolean
  style?: React.CSSProperties
  ignoreContainerClipping?: boolean
  useClone?: boolean
}

type QuoteListProps = {
  quotes: Quote[]
}

const InnerQuoteList: React.FC<QuoteListProps> = React.memo(({ quotes }) => {
  return quotes.map((quote: Quote, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot
      ) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ))
})

type InnerListProps = {
  dropProvided: DroppableProvided
  quotes: Quote[]
  title?: string
}

const InnerList: React.FC<InnerListProps> = ({
  dropProvided,
  quotes,
  title,
}) => {
  const titleElement = title ? (
    <div className='text-lg font-bold'>{title}</div>
  ) : null

  return (
    <div>
      {titleElement}
      <div className='min-h-[250px] pb-4' ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </div>
    </div>
  )
}

const QuoteList: React.FC<Props> = (props) => {
  console.log(props)
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <QuoteItem
                quote={quotes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : undefined
      }
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <div
          className={`p-4 border-${grid}px pb-0 transition-all duration-200 ease-in-out w-64 ${
            dropSnapshot.isDraggingOver ? 'bg-red-100' : ''
          } ${isDropDisabled ? 'opacity-50' : ''} ${
            dropSnapshot.draggingFromThisWith ? 'bg-teal-100' : ''
          }`}
          style={style}
          {...dropProvided.droppableProps}
        >
          Droppable
          {internalScroll ? (
            <div
              className='overflow-x-hidden overflow-y-auto max-h-[250px]'
              style={scrollContainerStyle}
            >
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </div>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </div>
      )}
    </Droppable>
  )
}

export default QuoteList
