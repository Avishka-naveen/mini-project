import React, { useContext } from 'react';
import { MdCancel, MdDelete, MdNotificationsNone } from 'react-icons/md';
import { LuRefreshCcw } from "react-icons/lu";
import { AppContext } from '../../Context/Appcontext';
import { VscVerifiedFilled } from "react-icons/vsc";
import axios from 'axios';

function NotificationBar({ handleSeenMsg,setOpenNotificationBar, unseenCount }) {
  const { backendUrl, customerNotifications, setCustomerNotifications, fetchCustomerNotifications } = useContext(AppContext);

  // Delete a single notification
  const handleDelete = async (idToRemove) => {
    console.log("Notification ID:", idToRemove);

    try {
      const response = await axios.post(backendUrl + "/api/customer/deleteNotifications", { notificationId: idToRemove });

      if (response.data.success) {
        fetchCustomerNotifications();
        // console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }

    } catch (error) {
      console.error("Delete notification failed:", error);
    }
  };

  const handleRefresh = async () => {
    await fetchCustomerNotifications();
    await handleSeenMsg();
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">

      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MdNotificationsNone className="text-xl text-blue-600 dark:text-purple-400" />
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Notifications
          </h2>
          {customerNotifications.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-purple-900/50 text-blue-700 dark:text-purple-300 font-medium">
              {customerNotifications.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {customerNotifications.length > 0 && (
            <button
              onClick={handleRefresh}
              className="text-xs px-2 py-1 rounded-md text-gray-500 dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-purple-400
                         transition-colors"
            >
              <LuRefreshCcw />
            </button>
          )}
          <button
            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 text-xl
                       hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400
                       transition-colors"
            onClick={() => {
              setOpenNotificationBar(false)
              unseenCount = 0
            }}
            aria-label="Close notifications"
          >
            <MdCancel />
          </button>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto p-4">
        {customerNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <MdNotificationsNone className="text-5xl text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              No notifications yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              You're all caught up!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {customerNotifications.map((notification, index) => (
              <li
                key={notification._id}
                className={`
  group relative rounded-lg border
  border-gray-200 dark:border-gray-700
  bg-gray-50 dark:bg-gray-800/60
  p-3 pr-10
  transition-all duration-200

  ${notification.senderRole === "admin"
                    ? "border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/30 dark:border-l-red-500"
                    : "hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm"}

  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  dark:focus-visible:ring-offset-gray-900
`}
              >
                <div className='flex  gap-2'>
                  <p className='text-blue-600 dark:text-purple-600'><VscVerifiedFilled /></p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words leading-relaxed">
                    {notification.message}
                  </p>
                </div>



                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                  {new Date(notification.createdAt).toLocaleString('en-LK', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>


                <button
                  onClick={() => handleDelete(notification._id)}
                  className="absolute top-2 right-2 p-1.5 rounded-md text-gray-400
                             
                             hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
                             transition-all duration-200"
                  aria-label="Delete notification"
                  title="Delete"
                >
                  <MdDelete className="text-base" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationBar;