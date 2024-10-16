import { FC, useState } from 'react'
import { Modal,Form,FormItem } from 'antd'
import { Droppable } from 'react-beautiful-dnd'

const Mid: FC = () => {
  /** 表单内容 */
  const [content, setContent] = useState([])
  /** 预览弹窗的显示状态 */
  const [visible, setVisible] = useState(false)
  const PreviewBtn = () => {
    if (!content || !content.length) {
      return null
    }
    return <button onClick={() => setVisible(true)}>预览</button>
  }
  return (
    <div>
      <PreviewBtn />
      <Droppable droppableId={'content'}>
        {(provided, snapshot) => {
          return (
            <div
              className={clxs('content', { 'is-dragging-over': snapshot.isDraggingOver })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Form
                style={{ backgroundColor: '#FFF' }}
                layout={config.layout}
                labelAlign={config.labelAlign}
                onSubmit={this.handleSubmit}
              >
                {content.map((el, i) => (
                  <FormItem
                    key={el.id}
                    data={el}
                    index={i}
                    form={this.props.form}
                    layout={config.layout}
                    labelAlign={config.labelAlign}
                    size={config.size}
                  />
                ))}
              </Form>
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
      <Modal
        title='表单预览'
        visible={visible}
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
