import { Editor } from '@/components/ui/editor/Editor'
import React from 'react'
import Header from '@/components/Header'

const page = () => {
  return (
    <div>
      <Header  >
        <div>
            This is document title
        </div>
      </Header>
      <Editor />
    </div>
  )
}

export default page
