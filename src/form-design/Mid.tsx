import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components'
import { Modal } from 'antd'
import clxs, { clsx } from 'clsx'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { IFormItemType } from './initData'

type Props = {
  formItems: IFormItem[]
  setFormItems: Dispatch<SetStateAction<IFormItem[]>>
  currId: string
  setCurrId: (id: string) => void
}
const configs = {
  [IFormItemType.input]: ProFormText,
  [IFormItemType.textarea]: ProFormTextArea,
  [IFormItemType.radio]: ProFormRadio.Group,
  [IFormItemType.upload]: ProFormUploadDragger,
}
const Mid: FC<Props> = ({ formItems, setCurrId, currId, setFormItems }) => {
  /** 表单内容 */
  /** 预览弹窗的显示状态 */
  const [visible, setVisible] = useState(false)
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {}
  const deleteItem = (index: number) => {
    const newList = JSON.parse(JSON.stringify(formItems))
    newList.splice(index, 1)
    setFormItems(newList)
  }
  return (
    <div className='mid border-left border-right flex-1 px-4 flex flex-col'>
      <div className='text-center relative'>
        <h3>表单内容</h3>
        <button
          onClick={() => setVisible(true)}
          className='absolute top-2 right-2'
        >
          预览
        </button>
      </div>
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
                className='flex flex-col gap-4'
                onSubmitCapture={handleSubmit}
                submitter={false}
              >
                {formItems.map((item, index) => {
                  const RenderFormItemType = configs[item.type as IFormItemType]
                  return (
                    <Draggable
                      // 这里name是表单的name，是唯一的，`field-${Date.now()}` 的形式
                      draggableId={item.name}
                      index={index}
                      key={item.name}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={clsx(
                            'border-dashed border-base p-2 relative',
                            {
                              'bg-green-100': snapshot.isDragging,
                              'border-left-highlight': item.name === currId,
                            }
                          )}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() => setCurrId(item.name)}
                        >
                          {/* 数据结构设计的时候就是参照ProForm来的，所以直接喂给它就行 */}
                          <RenderFormItemType
                            key={index}
                            {...item}
                            disabled
                          ></RenderFormItemType>
                          {/* 右上角的关闭按钮，不需要二次确认 */}
                          <div
                            onClick={() => {
                              deleteItem(index)
                            }}
                            className='cursor-pointer absolute top-2 right-2 w-5 h-5 flex items-center justify-center border-rounded border-base border-dashed hover:border-solid'
                          >
                            X
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </ProForm>
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
      <Modal
        title='表单预览'
        width={800}
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <ProForm
          style={{ backgroundColor: '#FFF' }}
          onSubmitCapture={handleSubmit}
        >
          {formItems.map((item, index) => {
            const RenderFormItemType = configs[item.type as IFormItemType]
            return (
              // 数据结构设计的时候就是参照ProForm来的，所以直接喂给它就行
              <RenderFormItemType key={index} {...item}></RenderFormItemType>
            )
          })}
        </ProForm>
      </Modal>
    </div>
  )
}
export default Mid
