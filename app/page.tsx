import Header from '@/components/Header';
import { SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import AddDocumentBtn from '@/components/AddDocumentBtn';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDocuments } from '@/lib/actions/room.actions';
import Link from 'next/link';
import { dateConverter } from '@/lib/utils';
import { DeleteModal } from '@/components/DeleteModal';
import Notifications from '@/components/Notifications';

interface RoomDocument {
  id: string;
  metadata: {
    title?: string;
  };
  createdAt: string;
}

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments?.data?.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All Documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
            {roomDocuments.data.map(({ id, metadata, createdAt }: RoomDocument) => (
              <li key={id} className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                <Link href={`/documents/${id}`} className="flex flex-col p-4 h-full">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Image src="/assets/icons/doc.svg" alt="file" width={32} height={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {metadata?.title || 'Untitled'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created {dateConverter(createdAt)}
                      </p>
                    </div>
                  </div>
                  
                </Link>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteModal roomId={id} />
                  </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
