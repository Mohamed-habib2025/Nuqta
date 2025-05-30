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
import { deleteaccountuser, logoutUser } from '../rtk/slices/userSlice';
import { deleteUserById, fetchUserid } from '../rtk/slices/userid';
import { deleteorgById, fetchorgid } from '../rtk/slices/orgid';
import { deleteaccountorg, logoutOrg } from '../rtk/slices/orgSlice';
import Swal from "sweetalert2";
import { GridLoader } from "react-spinners";
import { HiChevronRight } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { setUserType } from '../rtk/slices/userTypeSlice';

function Profile({ setOpenDialog }) {

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scope = useSelector((state) => state.userType.scope);
  const { user, loadinguser } = useSelector(state => state.userid);
  const { users } = useSelector(state => state.users);

  const { org, loadingorg } = useSelector(state => state.orgid);
  const [userId] = useState(localStorage.getItem('userid'));
  const [orgId] = useState(localStorage.getItem('orgaid'));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserid(userId));
    }
  }, [dispatch, userId]);

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
        dispatch(deleteaccountuser());
      } else {
        await dispatch(deleteorgById(orgId)).unwrap();
        localStorage.removeItem("orgaid")
        localStorage.removeItem("organizationToken")
        dispatch(deleteaccountorg());
      }
      setOpenDialog(false);
      localStorage.removeItem("scope")

      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
      });

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
    return <div className=' h-lvh flex items-center justify-center '>
      <GridLoader size={20} color="red" />
    </div>;
  }

  return (
    <div >
      {
        !isEditing ? (
          <div className='w-full h-svh relative '>
            <div className="px-6 py-4 flex items-center justify-between">
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
                <div className=' mt-16 flex flex-col items-center gap-5 rounded-t-[35px] h-lvh bg-white'>
                  <div className=' px-5 w-full absolute flex flex-col items-center gap-2 top-[4rem] '>
                    <img
                      src={user.gender === "MALE" ? male : female}
                      // className={`w-28 h-28 rounded-full border-[3px] ${user.donation.status === "VALID" ? " border-green-400" : "border-red-500"}`}
                      className='w-28 h-28 rounded-full border'
                      alt="Profile phote"
                    />
                    <div className='text-xl'>{user.username}</div>
                    <div className='text-gray-500'>{user.email}</div>

                    <div className="flex gap-2">
                      <span className={`rounded-xl py-1 px-5 ${user.donation.status === "VALID" ? "bg-green-400 text-white" : "bg-gray-200 text-gray-400"}`}>
                        Eligible to donate
                      </span>
                      <span className={`rounded-xl py-1 px-5 ${user.donation.status !== "VALID" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-400"}`}>
                        Cannot donate
                      </span>
                    </div>

                    <div className='mt-2 flex items-center space-x-2'>
                      <p className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-2xl'>0</span>
                        <span className='text-sm'>Donate</span>
                      </p>
                      <p className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-2xl'>{user.donation.blood_type}</span>
                        <span className='text-sm'>Blood Type</span>
                      </p>
                      <p onClick={() => { navigate("/bloodRequest"); setOpenDialog(false); }} className={`w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-2xl'>{user.uploadedRequests?.length ?? 0}</span>
                        <span className='text-sm'>Requests</span>
                      </p>
                    </div>


                    <div className=' w-full flex flex-col gap-2 bg-gray-100 px-5 py-2 rounded-lg mt-2'>
                      < div className='w-full flex items-center justify-between font-normal text-[17px] border-b-[1px] pb-2'>
                        <p>Phone Number</p>
                        <span className='text-lg'>{user.phoneNumber}</span>
                      </div>
                      <div className='w-full flex items-center justify-between font-normal text-[17px] border-b-[1px] pb-2'>
                        <p>Location</p>
                        <p><span>{user.donation.conservatism}</span> - <span>{user.donation.city}</span> </p>
                      </div>

                      <div className='w-full flex items-center justify-between font-normal text-[17px] border-b-[1px] pb-2'>
                        <p>Age</p>
                        <span className='text-[16px]'>{user.age}</span>
                      </div>

                      <div className='w-full flex items-center justify-between font-normal text-[17px]'>
                        <p>Weight</p>
                        <span className='text-[16px]'>{user.donation.weight} Kg</span>
                      </div>
                    </div>

                    <div onClick={() => setIsEditing(true)} className=' w-full flex items-center justify-between gap-2 bg-gray-100 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200 duration-200'>
                      <p>Edit Profile</p>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handlesignout} className=' bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer hover:text-red-600 duration-200'>
                      <div className='flex items-center space-x-2'>
                        <PiSignOutBold className='text-2xl' />
                        <span >Sign Out</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handleDelete} className='bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer text-red-500 hover:text-red-700 duration-200 mt-2'>
                      <div className='flex items-center space-x-2'>
                        <RiDeleteBin6Line className='text-xl' />
                        <span>Delete Account</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>



                  </div>


                  {/* <div className="mt-2 px-6 flex flex-col items-center gap-4 text-lg">
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 bg-green-400 rounded-full border border-green-700"></span>
                      <span className="text-gray-700">Valid - Eligible to donate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block h-3 w-3 bg-red-400 rounded-full border border-red-700"></span>
                      <span className="text-gray-700">Not Valid - Cannot donate</span>
                    </div>
                  </div> */}
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
                      <span>Donors</span>
                      <span>{users.length}</span>
                    </p>
                  </div>
                </div>
              )
            }

          </div>
        ) : (
          <EditProfile setIsEditing={setIsEditing} setOpenDialog={setOpenDialog} scope={scope} />
        )
      }


    </div >

  )
}

export default Profile


//   < div onClick = {() => setIsEditing(true)} className = ' cursor-pointer text-2xl absolute bottom-4 left-1 w-7 h-7 flex items-center justify-center rounded-full bg-slate-200' >
//     <MdEdit className=' text-xl ' />
// </div >