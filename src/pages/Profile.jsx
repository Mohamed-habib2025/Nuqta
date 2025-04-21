import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import male from "../Images/male.jpg";
import EditProfile from '../components/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../rtk/slices/userSlice';
import { deleteUserById, fetchUserid } from '../rtk/slices/userid';
import { MdDeleteForever } from "react-icons/md";

function Profile({ setOpenDialog }) {

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(state => state.userid);

  const [userId] = useState(localStorage.getItem('userid'));
  useEffect(() => {
    if (!user && userId) {
      dispatch(fetchUserid(userId));
    }
  }, [dispatch, userId , user]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      dispatch(deleteUserById(userId)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          alert('User deleted successfully');
          setOpenDialog(false);
          navigate("/loginpage");
        } else {
          alert('Failed to delete user: ' + res.payload);
        }
      });
    }
  };

  if (loading || !user) {
    return <p className=' p-10 text-green-400 text-lg'>Loading profile...</p>;
  }

  if (error) {
    return <p className='text-red-500'>Error: {error}</p>;
  }

  return (
    <div className='w-full h-screen relative sm:h-[95%] '>
      {
        !isEditing ? (
          <div>
            <div className="px-6 py-8 flex items-center justify-between">
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

              <p className='text-xl text-blue-600 font-bold'>{user.username}</p>

              <div className='flex items-center gap-2'>
                <IoLocationOutline className='text-3xl text-red-600' />
                <p className='text-lg'><span>{user.donation.conservatism}</span> - <span>{user.donation.city}</span> </p>
              </div>

              <div className='flex items-center gap-2'>
                <LuPhone className='text-2xl text-red-600' />
                <span className='text-lg'>{user.phoneNumber}</span>
              </div>

              <div className='mt-2 flex items-center space-x-2'>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Donate</span>
                  <span>0</span>
                </p>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Blood Type</span>
                  <span>{user.donation.blood_type}</span>
                </p>
                <p className=' w-28 p-2 text-red-500 flex flex-col items-center bg-red-200 border-[2px] border-red-300 rounded-lg'>
                  <span>Requests</span>
                  <span>0</span>
                </p>
              </div>
              <div>

              </div>
            </div>

            <div
              className=' w-full flex items-center justify-between absolute bottom-8 sm:-bottom-1 left-0 px-4 text-red-600'>
              <div onClick={() => {
                dispatch(logoutUser());
                navigate("/loginpage");
                setOpenDialog(false);
              }}
                className='flex items-center space-x-2 cursor-pointer hover:translate-x-1 duration-300'>
                <PiSignOutBold className='text-2xl' />
                <span >Sign Out</span>
              </div>
              <div
                onClick={handleDelete}
                className='flex items-center space-x-2 cursor-pointer hover:-translate-x-1 duration-300'>
                <MdDeleteForever className='text-2xl' />
                <span>Delete Account</span>
              </div>
            </div>

          </div>
        ) : (
          <EditProfile setIsEditing={setIsEditing} setOpenDialog={setOpenDialog} />
        )
      }


    </div>

  )
}

export default Profile
