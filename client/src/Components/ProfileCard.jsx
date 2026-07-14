import React from 'react'
import { FaWindowClose } from "react-icons/fa";

function ProfileCard() {
    return (
        <>
            <div className="absolute right-0 top-15 w-72 bg-gray-200 dark:bg-[#2b2b2b]  rounded-lg shadow-lg p-4 ">
                <h3 className="font-semibold text-lg">Profile</h3>
                <p>Developer</p>
                <button className="mt-3 w-full bg-red-500 text-white py-2 rounded">
                    Logout
                </button>
            </div>
        </>
    )
}

export default ProfileCard
