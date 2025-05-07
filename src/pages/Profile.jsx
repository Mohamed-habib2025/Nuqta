import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import male from "../Images/male.jpg";
import female from "../Images/female.png";
import orga from "../Images/Hospital.png";
import EditProfile from '../components/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../rtk/slices/userSlice';
import { deleteUserById, fetchUserid } from '../rtk/slices/userid';
import { MdDeleteForever } from "react-icons/md";
import { deleteorgById, fetchorgid } from '../rtk/slices/orgid';
import { logoutOrg } from '../rtk/slices/orgSlice';
import Swal from "sweetalert2";
import { GridLoader  } from "react-spinners";
// import { setUserType } from '../rtk/slices/userTypeSlice';

function Profile({ setOpenDialog }) {

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scope = useSelector((state) => state.userType.scope);
  const { user, loadinguser } = useSelector(state => state.userid);

  // console.log(user.uploadedRequests)
  const { org, loadingorg } = useSelector(state => state.orgid);
  const [userId] = useState(localStorage.getItem('userid'));
  const [orgId] = useState(localStorage.getItem('orgaid')); 

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserid(userId));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    if (orgId) {
      dispatch(fetchorgid(orgId));
    }
  }, [dispatch, orgId]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete the account?",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      if (scope === "USER") {
        await dispatch(deleteUserById(userId)).unwrap();
        localStorage.removeItem("userid")
        localStorage.removeItem("userToken")
      } else {
        await dispatch(deleteorgById(orgId)).unwrap();
        localStorage.removeItem("orgaid")
        localStorage.removeItem("organizationToken")
      }

      localStorage.removeItem("scope")
      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
      });

      setOpenDialog(false);
      navigate("/");
    } catch (error) {
      await Swal.fire({
        title: "Failed!",
        text: `Failed to delete user: ${error?.message || error}`,
        icon: "error",
      });
    }
  };

  const handlesignout = () => {
    scope === 'USER' ? dispatch(logoutUser()) : dispatch(logoutOrg())
    setOpenDialog(false);
    navigate("/");
    localStorage.removeItem("scope");
  };


  if ((scope === 'USER' && (!user || loadinguser)) || (scope === 'ORGANIZATION' && (!org || loadingorg))) {
    return <div className=' h-full flex items-center justify-center '>
      <GridLoader  size={20} color="red" />
    </div>;
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

            {
              scope === "USER" ? (
                <div className='flex flex-col items-center justify-center gap-5'>
                  <div className=' relative'>
                    <div onClick={() => setIsEditing(true)} className=' cursor-pointer text-2xl absolute bottom-4 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200'>
                      <MdEdit className=' text-2xl ' />
                    </div>
                    <img
                      src={user.gender === "MALE" ? male : female}
                      className={`w-44 h-44 rounded-full border-[4px] ${user.donation.status === "VALID" ? " border-green-400" : "border-red-500"}`}
                      alt="Profile phote"
                    />
                  </div>

                  <p className={`text-xl text-blue-600 font-bold ${user.donation.status === "VALID" ? "text-green-500" : " text-red-500"} `}>{user.username}</p>

                  <div className='flex items-center gap-2'>
                    <IoLocationOutline className={`text-3xl ${user.donation.status === "VALID" ? "text-green-500" : " text-red-500"}`} />
                    <p className='text-lg'><span>{user.donation.conservatism}</span> - <span>{user.donation.city}</span> </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <LuPhone className={`text-2xl ${user.donation.status === "VALID" ? "text-green-500" : " text-red-500"}`} />
                    <span className='text-lg'>{user.phoneNumber}</span>
                  </div>

                  <div className='mt-2 flex items-center space-x-2'>
                    <p className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                      <span>Donate</span>
                      <span>0</span>
                    </p>
                    <p className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                      <span>Blood Type</span>
                      <span>{user.donation.blood_type}</span>
                    </p>
                    <p onClick={() => { navigate("/bloodRequest"); setOpenDialog(false); }} className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                      <span>Requests</span>
                      <span>{user.uploadedRequests?.length ?? 0}</span>
                      {/* <span>{user.uploadedRequests.length}</span> */}
                      {/* <span>0</span> */}
                    </p>
                  </div>

                  <div className="mt-8 px-6 flex flex-col items-center gap-4 text-lg">
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 bg-green-400 rounded-full border border-green-700"></span>
                      <span className="text-gray-700">Valid - Eligible to donate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 bg-red-400 rounded-full border border-red-700"></span>
                      <span className="text-gray-700">Not Valid - Cannot donate</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center gap-5'>
                  <div className=' relative'>
                    <div onClick={() => setIsEditing(true)} className=' cursor-pointer text-2xl absolute bottom-4 left-1 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200'>
                      <MdEdit className=' text-2xl ' />
                    </div>
                    <img
                      src={orga}
                      className='w-44 h-44 rounded-full border'
                      alt="Profile phote"
                    />
                  </div>

                  <p className={`text-xl text-blue-600 font-bold`}>{org.orgName}</p>

                  <div className='flex items-center gap-2'>
                    <IoLocationOutline className='text-3xl text-blue-500' />
                    <p className='text-lg'><span>{org.conservatism}</span> - <span>{org.city}</span> </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <LuPhone className='text-2xl text-blue-500' />
                    <span className='text-lg'>{org.phoneNumber}</span>
                  </div>

                  <div className='mt-2 flex items-center space-x-2'>
                    <p onClick={() => { navigate("/RequstOrganization"); setOpenDialog(false); }} s className='w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer border-blue-300 bg-blue-200 text-blue-500 hover:bg-blue-300'>
                      <span>Requests</span>
                      <span>{org.uploadedRequests?.length ?? 0}</span>
                    </p>
                    <p className='w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer border-blue-300 bg-blue-200 text-blue-500 hover:bg-blue-300'>
                      <span>Donate</span>
                      <span>0</span>
                    </p>
                  </div>
                </div>
              )
            }

            <div
              className=' w-full flex items-center justify-between absolute bottom-8 sm:-bottom-1 left-0 px-4 text-red-600'>
              <div onClick={handlesignout}
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
          <EditProfile setIsEditing={setIsEditing} setOpenDialog={setOpenDialog} scope={scope} />
        )
      }


    </div>

  )
}

export default Profile
