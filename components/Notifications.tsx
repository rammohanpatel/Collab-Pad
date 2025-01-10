'use client'
import React, { ReactNode } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Image from 'next/image'
import { useInboxNotifications, useUnreadInboxNotificationsCount } from '@liveblocks/react/suspense'
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from '@liveblocks/react-ui'
  

const Notifications = () => {
    const {inboxNotifications} = useInboxNotifications();
    const {count} = useUnreadInboxNotificationsCount();

    const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt);

  return (
    <div>
    <Popover>
        <PopoverTrigger className='relative flex size-10 items-center justify-center rounded-lg'>
            <Image 
                src="/assets/icons/bell.svg"
                alt="inbox"
                width={24}
                height={24}
            />
            {count > 0 && (
                <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-red-500"></div>
            )}
        </PopoverTrigger>
        <PopoverContent align='end' className='w-[25rem] p-1 rounded-full '>
            <LiveblocksUIConfig 
               overrides={{
                INBOX_NOTIFICATION_TEXT_MENTION : (user:ReactNode)=>(
                    <>{user} mentioned you.</>
                )
               }}
            >
                <InboxNotificationList className='bg-slate-950 rounded-full'>
                    {unreadNotifications.length <=0 && (<p>No new notifications</p>)}
                    {unreadNotifications.length>0 && unreadNotifications.map((notification)=>(
                        <InboxNotification
                            key={notification.id}
                            inboxNotification={notification}
                            className=' text-white'
                            href={`/documents/${notification.roomId}`}
                            showActions={false}
                            kinds={{
                                thread: (props)=>(
                                    <InboxNotification.Thread {...props}
                                      showActions={false}
                                      showRoomName={false}
                                      />
                                ),
                                textMention: (props)=>(
                                    <InboxNotification.TextMention {...props}
                                      showRoomName={false}
                                      />
                                ),
                                $documentAccess: (props)=>(
                                    <InboxNotification.Custom {...props}
                                     title={props.inboxNotification.activities[0].data.title}
                                     className='bg-transparent text-white'
                                     aside={<InboxNotification.Icon className='bg-transparent'>
                                        <Image 
                                          src={props.inboxNotification.activities[0].data.avatar as string || ''}
                                          width={36}
                                          height={36}
                                          alt='avatar'
                                          className='rounded-full'
                                        />     
                                     </InboxNotification.Icon>}>
                                     {props.children}
                                     </InboxNotification.Custom>
                                )
                            }}
                        />
                    ))}
                </InboxNotificationList>
            </LiveblocksUIConfig>
        </PopoverContent>
    </Popover>

    </div>
  )
}

export default Notifications
