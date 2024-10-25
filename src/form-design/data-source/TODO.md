# TODO

- flatComps 优化：
  - 原来的 flatComps 改为名 flatLeftComps；新增 flatMidComps；也可以再加一个 flatComps 包括 flatLeftComps + flatMidComps。
  - 左边移动组件到中间，使用 flatLeftComps 查找；中间 DropZone 之间和 DropZone 内部移动，使用 flatMidComps 查找。（也可以直接使用 flatComps 查找）
  - 在判断 allow+disallow 时可以方便查找对应的信息
- ~~增加 idSlotOfParent 信息，下一级查找 slots 时，可以减少一次查找( TODO check，是不是在渲染的时候就有这个数据了，就不需要额外处理这个了)~~
- 把 allow + disallow 反馈的信息放到 Droppable 里面，而不是 Draggable 自身里面，这样交互提交会更好。要实现这一点需要在 dragStart 时就把信息被拖拽者的信息就存起来，这时引入一个状态库会比较好（目前推荐 zustand）。
- 右侧的缩略图是不是应当做成树状的？（做与不做分别怎么做？）点击对应的区域可以选中该组件，右侧显示 configuration 信息。
- configuration 处理，数据怎么搞
- 与 外界交互的点
  - 确定除了 slots 以外的信息应当如何传递，目前只处理了 configuration, 是不是应该还有 Props, defaultProps，具体如何处理？
