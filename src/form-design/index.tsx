import { FC } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { seeds } from './initData'
import Left from './Left'
const Index: FC = () => {
  const onDragEnd = () => {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='form-design-panel'>
        <Left items={seeds} />
        {/* <Mid config={state.config} />
                <Right callback={updateConfig} /> */}
      </div>
    </DragDropContext>
  )
}
export default Index
