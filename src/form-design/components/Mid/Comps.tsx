/**
 * 演示简单的 React 组件，不带 Slot
 */
export const SimpleComp: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  return (
    <div>
      <div>简单组件，不带插槽</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
/**
 * 演示复杂的 React 组件，带 Slot
 */
export const ComplexComp: React.FC<{
  title: string
  description: string
  children: React.ReactNode
}> = ({ title, description, children }) => {
  return (
    <div>
      <div>复杂组件，带插槽</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>下面是插槽</p>
      <div>{children}</div>
    </div>
  )
}
