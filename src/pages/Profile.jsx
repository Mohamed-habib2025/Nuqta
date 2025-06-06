import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
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
import { GrLanguage } from "react-icons/gr";
import Translate from '../components/Translate';
// import { setUserType } from '../rtk/slices/userTypeSlice';

function Profile({ setOpenDialog }) {

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scope = useSelector((state) => state.userType.scope);
  const { user, loadinguser } = useSelector(state => state.userid);
  const { users } = useSelector(state => state.users);

  const { org, loadingorg } = useSelector(state => state.orgid);
  const userId = localStorage.getItem('userid');
  const orgId = localStorage.getItem('orgaid');

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserid(userId));
  //   }
  // }, [dispatch, userId]);
  // useEffect(() => {
  //   if (orgId) {
  //     dispatch(fetchorgid(orgId));
  //   }
  // }, [dispatch, orgId]);

  useEffect(() => {
    if (scope === "USER" && userId) {
      dispatch(fetchUserid(userId));
    } else if (scope === "ORGANIZATION" && orgId) {
      dispatch(fetchorgid(orgId));
    }
  }, [dispatch, userId, orgId, scope]);

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
      localStorage.removeItem("scope")
      setOpenDialog(false);
      navigate("/");
      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
      });
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
    localStorage.removeItem("orgaid")
    localStorage.removeItem("organizationToken")
    localStorage.removeItem("userid")
    localStorage.removeItem("userToken")
  };


  if ((scope === 'USER' && (!user || loadinguser)) || (scope === 'ORGANIZATION' && (!org || loadingorg))) {
    return <div className=' h-lvh flex items-center justify-center '>
      <GridLoader size={20} color="red" />
    </div>;
  }

  return (
    <div>
      {
        !isEditing && !isChangingLanguage ? (
          <div className='w-full relative '>
            <div className="px-6 pt-4 flex items-center justify-between">
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
                <div className=' bg-white mt-16 flex flex-col items-center gap-5 rounded-t-[35px] h-screen'>
                  <div className=' px-4 w-full absolute flex flex-col items-center gap-1 top-[4rem] '>
                    <img
                      src={user.gender === "MALE" ? male : female}
                      className='w-28 h-28 rounded-full border'
                      alt="profile phote"
                    />
                    <div className='text-xl'>{user.username}</div>
                    <div className='text-gray-500'>{user.email}</div>

                    <div className="flex gap-2">
                      <span className={`rounded-xl py-1 px-5 ${user.donation.status === "VALID" ? "bg-green-400 text-white" : "bg-gray-200 text-gray-400"}`}>
                        Can donate
                      </span>
                      <span className={`rounded-xl py-1 px-5 ${user.donation.status !== "VALID" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-400"}`}>
                        Cannot donate
                      </span>
                    </div>

                    <div className='mt-1 flex items-center space-x-2'>
                      <p onClick={() => { navigate("/donors"); setOpenDialog(false); }} className={` w-24 sm:w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-xl sm:text-2xl'>{user.donation.acceptedRequests?.length}</span>
                        <span className='text-sm'>Donate</span>
                      </p>
                      <p className={` w-24 sm:w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-xl sm:text-2xl'>{user.donation.blood_type}</span>
                        <span className='text-sm'>Blood Type</span>
                      </p>
                      <p onClick={() => { navigate("/bloodRequest"); setOpenDialog(false); }} className={` w-24 sm:w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer ${user.donation.status === "VALID" ? " border-green-300 bg-green-200 text-green-500 hover:bg-green-300 duration-200" : "border-red-300 bg-red-200 text-red-500 hover:bg-red-300 duration-200"}`}>
                        <span className='text-xl sm:text-2xl'>{user.uploadedRequests?.length ?? 0}</span>
                        <span className='text-sm'>Requests</span>
                      </p>
                    </div>


                    <div className=' w-full flex flex-col gap-2 bg-gray-100 px-4 py-2 rounded-lg mt-1'>
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

                    <div onClick={() => setIsEditing(true)} className=' mt-1 w-full flex items-center justify-between gap-2 bg-gray-100 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200 duration-200'>
                      <div className='flex items-center space-x-2'>
                        <FiEdit />
                        <p>Edit Profile</p>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={() => setIsChangingLanguage(true)} className=' w-full flex items-center justify-between gap-2 bg-gray-100 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200 duration-200 mt-1'>
                      <div className='flex items-center space-x-2'>
                        <GrLanguage />
                        <p>Languages</p>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handlesignout} className=' bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer hover:text-red-600 duration-200 mt-1'>
                      <div className='flex items-center space-x-2'>
                        <PiSignOutBold className='text-2xl' />
                        <span >Logout</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handleDelete} className='bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer text-red-500 hover:text-red-700 duration-200 mb-4 mt-1'>
                      <div className='flex items-center space-x-2'>
                        <RiDeleteBin6Line className='text-xl' />
                        <span>Delete Account</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>



                  </div>

                </div>
              ) : (
                <div className='bg-white mt-16 flex flex-col items-center gap-5 rounded-t-[35px] h-screen'>
                  <div className=' px-4 w-full absolute flex flex-col items-center  top-[4rem]'>
                    <img
                      src={orga}
                      className='w-28 h-28 rounded-full border'
                      alt="Profile phote"
                    />
                    <p className={`text-xl text-blue-600`}>{org.orgName}</p>
                    <p className={`text-gray-500`}>{org.email}</p>
                    <div className='mt-2 flex items-center space-x-2'>
                      <p onClick={() => { navigate("/RequstOrganization"); setOpenDialog(false); }} s className='w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer border-blue-300 bg-blue-200 text-blue-500 hover:bg-blue-300'>
                        <span className='text-xl sm:text-2xl'>{org.uploadedRequests?.length ?? 0}</span>
                        <span >Requests</span>
                      </p>
                      <p className=' w-24 sm:w-28 p-2 flex flex-col items-center border-[2px] rounded-lg hover:cursor-pointer border-blue-300 bg-blue-200 text-blue-500 hover:bg-blue-300'>
                        <span className='text-xl sm:text-2xl'>{users.length}</span>
                        <span >Donors</span>
                      </p>
                    </div>

                    <div className=' w-full flex flex-col gap-2 bg-gray-100 px-4 py-2 rounded-lg mt-2'>
                      < div className='w-full flex items-center justify-between font-normal text-[17px] border-b-[1px] pb-2'>
                        <p>Phone Number</p>
                        <span className='text-lg'>{org.phoneNumber}</span>
                      </div>
                      <div className='w-full flex items-center justify-between font-normal text-[17px] pb-2'>
                        <p>Location</p>
                        <p><span>{org.conservatism}</span> - <span>{org.city}</span> </p>
                      </div>
                    </div>


                    <div onClick={() => setIsEditing(true)} className=' w-full flex items-center justify-between gap-2 bg-gray-100 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200 duration-200 mt-2'>
                      <div className='flex items-center space-x-2'>
                        <FiEdit />
                        <p>Edit Profile</p>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div className=' w-full flex items-center justify-between gap-2 bg-gray-100 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-200 duration-200 mt-1'>
                      <div className='flex items-center space-x-2'>
                        <GrLanguage />
                        <p>Languages</p>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handlesignout} className=' bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer hover:text-red-600 duration-200 mt-2'>
                      <div className='flex items-center space-x-2'>
                        <PiSignOutBold className='text-2xl' />
                        <span >Sign Out</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>

                    <div onClick={handleDelete} className='bg-gray-100 px-5 py-2 w-full rounded-lg flex items-center justify-between cursor-pointer text-red-500 hover:text-red-700 duration-200 mt-1 mb-4'>
                      <div className='flex items-center space-x-2'>
                        <RiDeleteBin6Line className='text-xl' />
                        <span>Delete Account</span>
                      </div>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>
                  </div>

                </div>
              )
            }

          </div>
        ) : isEditing ? (
          <EditProfile setIsEditing={setIsEditing} setOpenDialog={setOpenDialog} scope={scope} />
        ) : (
          <Translate setIsChangingLanguage={setIsChangingLanguage} setIsEditing={setIsEditing} />
        )
      }

    </div >

  )
}

export default Profile


//   < div onClick = {() => setIsEditing(true)} className = ' cursor-pointer text-2xl absolute bottom-4 left-1 w-7 h-7 flex items-center justify-center rounded-full bg-slate-200' >
//     <MdEdit className=' text-xl ' />
// </div >