import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRuntime from 'react/jsx-runtime'
import 'systemjs' // # 若已在项目中引入 systemjs, 则无需再次引入
// 手动声明 react, react/jsx-runtime 和 react-dom 并注册到 System 中
System.addImportMap({
  imports: {
    react: 'app:react',
    'react/jsx-runtime': 'app:react-runtime',
    'react-dom': 'app:react-dom',
  },
})
System.set('app:react', { ...React, __useDefault: true })
System.set('app:react-dom', { ...ReactDom, __useDefault: true })
System.set('app:react-runtime', { ...ReactRuntime, __useDefault: true })

// 加载 组件库
const version = '0.0.1'
System.import('/mk-ui/${version}/index.system.js').then((lib) => {
  console.log(lib)
})
