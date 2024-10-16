import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Modal } from 'antd'
import clxs, { clsx } from 'clsx'
import { FC, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
  formItems: IFormItem[]
}
const Mid: FC<Props> = ({ formItems }) => {
  /** 表单内容 */
  /** 预览弹窗的显示状态 */
  const [visible, setVisible] = useState(false)
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {}

  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <button onClick={() => setVisible(true)}>预览</button>
      <Droppable droppableId={'content'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clxs('content flex-1', {
                'is-dragging-over': snapshot.isDraggingOver,
              })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ProForm
                style={{ backgroundColor: '#FFF' }}
                onSubmitCapture={handleSubmit}
                submitter={false}
              >
                {formItems.map((item, index) => (
                  <Draggable
                    draggableId={item.name}
                    index={index}
                    key={item.name}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={clsx('seed', {
                          'seed-dragging': snapshot.isDragging,
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ProFormText
                          name={item.name}
                          label={item.label}
                          disabled
                        ></ProFormText>
                      </div>
                    )}
                  </Draggable>
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
        <ProForm
          style={{ backgroundColor: '#FFF' }}
          onSubmitCapture={handleSubmit}
          submitter={false}
        >
          {formItems.map((item, index) => (
            <ProFormText
              name={item.name}
              label={item.label}
              disabled
              key={index}
            ></ProFormText>
          ))}
        </ProForm>
      </Modal>
    </div>
  )
}
export default Mid
