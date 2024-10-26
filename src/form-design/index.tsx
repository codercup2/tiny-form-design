import { FC, useEffect, useState } from 'react'
import Editor from './Editor'
import { loadLibs } from './data-source/init'

const Index: FC = () => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    loadLibs().then(() => {
      setReady(true)
    })
  }, [])
  if (!ready) {
    return <div>loading</div>
  }
  return <Editor />
}
export default Index
