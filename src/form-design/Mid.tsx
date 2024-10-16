import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Modal } from 'antd'
import clxs from 'clsx'
import { FC, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

const Mid: FC = () => {
  /** 表单内容 */
  const [content, setContent] = useState<any[]>([1])
  const [form, setForm] = useState<any[]>([])
  /** 预览弹窗的显示状态 */
  const [visible, setVisible] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {}
  const PreviewBtn = () => {
    if (!content || !content.length) {
      return null
    }
    return <button onClick={() => setVisible(true)}>预览</button>
  }
  return (
    <div className='mid'>
      <PreviewBtn />
      <Droppable droppableId={'content'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clxs('content', {
                'is-dragging-over': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ProForm
                style={{ backgroundColor: '#FFF' }}
                onSubmitCapture={handleSubmit}
              >
                {content.map((item, i) => (
                  <ProFormText name='A' label='AA' key={i}></ProFormText>
                ))}
              </ProForm>
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
      <Modal
        title='表单预览'
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        destroyOnClose
        okText='模拟提交'
      >
        preview content
      </Modal>
    </div>
  )
}
export default Mid
