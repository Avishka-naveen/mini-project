import React from 'react'
import { MdCancel } from "react-icons/md";
function NotificationBar({ setOpenNotificationBar }) {
    return (
        <>
            <div className=' h-full bg-white dark:bg-gray-900 shadow-xl animate-slide-in break-words'>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-800 dark:text-white">Notifications</h2>
                    <button className='text-xl text-red-600 cursor-pointer' onClick={() => setOpenNotificationBar(false)}><MdCancel /></button>
                </div>
                <div className="p-4  overflow-y-auto h-[calc(100vh-80px)]">

                   notificaions will be shown here
                </div>
            </div>
        </>
    )
}

export default NotificationBar
