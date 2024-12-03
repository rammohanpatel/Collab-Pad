import { Editor } from '@/components/ui/editor/Editor'
import React from 'react'
import Header from '@/components/Header'
import { UserButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'

const page = () => {
  return (
    <div>
      <Header  >
        <div>
            Share
        </div>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </Header>
      <Editor />
    </div>
  )
}

export default page
