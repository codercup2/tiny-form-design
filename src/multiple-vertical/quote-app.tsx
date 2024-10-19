import React, { useState } from 'react'
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd'
import QuoteList from './quote-list'
import { reorderQuoteMap, ReorderQuoteMapResult } from './reorder'
import { QuoteMap } from './types'

interface Props {
  initial: QuoteMap
}

const Root =
  'bg-[#B200] box-border p-[16px] min-h-screen flex justify-center items-start'
const Column = 'm-0 p-[16px]'
// const HorizontalScrollContainer =
//   'flex justify-start items-start bg-[rgba(0,0,0,0.1)] p-[16px] max-w-[400px] overflow-auto'
// const VerticalScrollContainer =
//   'flex flex-col justify-start items-start bg-[rgba(0,0,0,0.1)] p-[16px] max-h-[800px] overflow-auto'

const QuoteApp: React.FC<Props> = ({ initial }) => {
  const [quoteMap, setQuoteMap] = useState<ReorderQuoteMapResult>({
    quoteMap: initial,
  })

  const onDragEnd = (result: DropResult) => {
    console.log(result)
    if (!result.destination) {
      return
    }

    const source: DraggableLocation = result.source
    const destination: DraggableLocation = result.destination

    setQuoteMap(
      reorderQuoteMap({
        quoteMap: quoteMap.quoteMap,
        source,
        destination,
      })
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={Root}>
        {/* <div className={HorizontalScrollContainer}>
          <div className={Column}>
            <QuoteList
              title='alpha'
              listId='alpha'
              listType='card'
              quotes={quoteMap.quoteMap.alpha}
            />
          </div>
          <div className={Column}>
            <QuoteList
              title='beta'
              listId='beta'
              listType='card'
              quotes={quoteMap.quoteMap.beta}
            />
          </div>
          <div className={Column}>
            <QuoteList
              title='gamma'
              listId='gamma'
              listType='card'
              quotes={quoteMap.quoteMap.gamma}
            />
          </div>
        </div> */}
        <div className={Column}>
          <QuoteList
            title='delta'
            listId='delta'
            listType='card'
            quotes={quoteMap.quoteMap.delta}
          />
          <QuoteList
            title='epsilon'
            listId='epsilon'
            listType='card'
            internalScroll
            quotes={quoteMap.quoteMap.epsilon}
          />
        </div>
        {/* <div className={VerticalScrollContainer}>
          <div className={Column}>
            <QuoteList
              title='zeta'
              listId='zeta'
              listType='card'
              quotes={quoteMap.quoteMap.zeta}
            />
          </div>
          <div className={Column}>
            <QuoteList
              title='eta'
              listId='eta'
              listType='card'
              quotes={quoteMap.quoteMap.eta}
            />
          </div>
          <div className={Column}>
            <QuoteList
              title='theta'
              listId='theta'
              listType='card'
              quotes={quoteMap.quoteMap.theta}
            />
          </div>
        </div>
        <div className={Column}>
          <QuoteList
            title='iota'
            listId='iota'
            listType='card'
            quotes={quoteMap.quoteMap.iota}
          />
        </div>
        <div className={Column}>
          <QuoteList
            title='kappa'
            listId='kappa'
            listType='card'
            internalScroll
            quotes={quoteMap.quoteMap.kappa}
          />
        </div> */}
      </div>
    </DragDropContext>
  )
}

export default QuoteApp
