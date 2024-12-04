
import React from 'react'

import CollaborativeRoom from '@/components/CollaborativeRoom'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { getDocument } from '@/lib/actions/room.actions';

const Document = async ({params:{id}}:SearchParamProps) => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const room = await getDocument({
      roomId : id,
      userId : clerkUser.emailAddresses[0].emailAddress,
  });

  return (
    <main className='flex w-full flex-col item-center'>

      <CollaborativeRoom 
       roomId={id} 
       roomMetadata={room.roomMetadata}
       />
    </main>
  )
}

export default Document;
