import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import male from "../Images/male.jpg"
import EditProfile from '../components/EditProfile'

function Profile({ setOpenDialog }) {

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: "MohamedHabib@gmail.com",
    name: "Mohamed Habib",
    phone: "+201255663325",
    governorate: "Cairo",
    city: "Zamalek",
    bloodType: "A+",
    donateCount: 10,
    requests: 2
  });

  const navigate = useNavigate();

  return (
    <div className='w-full h-screen relative sm:h-[95%]'>
      {
        !isEditing ? (
          <div>
            <div className="px-6 py-10 flex items-center justify-between">
              <span className='text-xl'>My Profile</span>
              <FaArrowRight
                onClick={() => setOpenDialog ? setOpenDialog(false) : navigate(-1)}
                className=' text-lg block sm:hidden cursor-pointer text-[#212245] '
              />
              <IoClose
                onClick={() => setOpenDialog ? setOpenDialog(false) : navigate(-1)}
                className=' hidden sm:block cursor-pointer text-3xl text-[#212245] '
              />
            </div>

            <div className='flex flex-col items-center justify-center gap-5'>
              <div className=' relative'>
                <div onClick={() => setIsEditing(true)} className=' cursor-pointer text-2xl absolute bottom-4 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200'>
                  <MdEdit className=' text-2xl ' />
                </div>
                <img src={male} alt="Profile phote" className='w-44 h-44 rounded-full' />
              </div>

              <p className='text-xl text-blue-600 font-bold'>{userData.name}</p>

              <div className='flex items-center gap-2'>
                <IoLocationOutline className='text-3xl text-red-600' />
                <p className='text-lg'><span>{userData.governorate}</span> - <span>{userData.city}</span> </p>
              </div>

              <div className='flex items-center gap-2'>
                <LuPhone className='text-2xl text-red-600' />
                <span className='text-lg'>{userData.phone}</span>
              </div>

              <div className='mt-2 flex items-center space-x-2'>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Donate</span>
                  <span>{userData.donateCount}</span>
                </p>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Blood Type</span>
                  <span>{userData.bloodType}</span>
                </p>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Requests</span>
                  <span>{userData.requests}</span>
                </p>
              </div>
              <div>

              </div>
            </div>
          </div>
        ) : (
          <EditProfile userData={userData} setUserData={setUserData} setIsEditing={setIsEditing} />
        )
      }

      <div className=' absolute bottom-10 sm:bottom-0 left-0 px-4 flex items-center space-x-2 text-red-600 cursor-pointer hover:translate-x-1 duration-300'>
        <PiSignOutBold className='text-2xl' />
        <span >Sign Out</span>
      </div>

    </div>

  )
}

export default Profile
