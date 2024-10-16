import { FC } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { seeds } from './initData'
import Left from './Left'
import Mid from './Mid'
const Index: FC = () => {
  const onDragEnd = () => {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='form-design flex gap-4 p-4'>
        <Left items={seeds} />
        <Mid />
        {/* <Right callback={updateConfig} /> */}
      </div>
    </DragDropContext>
  )
}
export default Index
