'use client'
import { ClientSideSuspense } from '@liveblocks/react/suspense'
import { RoomProvider } from '@liveblocks/react'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { Editor } from './ui/editor/Editor'
import Header from './Header'
import ActiveCollaborators from './ActiveCollaborators'

const CollaborativeRoom = ({roomId,roomMetadata}:CollaborativeRoomProps) => {
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div className='collaborative-room'>
                    <Header>
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <p className='document-title'>Share</p>
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborators />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom
