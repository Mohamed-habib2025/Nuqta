import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { HiChevronRight } from "react-icons/hi";
import LocationPicker from './LocationPicker';
import ChangePasswordprofile from './ChangePasswordprofile';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { updateOrg } from '../rtk/slices/orgid';
import ChangePasswordprofileorg from './ChangePasswordprofileorg';

function EditProfileorg({ setIsEditing, setOpenDialog, scope }) {

  const { org } = useSelector(state => state.orgid);

  const dispatch = useDispatch();

  const [userData, setuserData] = useState(org);
  const [isEditlocation, setIsEditlocation] = useState(false);
  const [isEditpassword, setIsEditpassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [phoneChanged, setPhoneChanged] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);

  useEffect(() => {
    setIsChanged(
      userData.orgName !== org.orgName ||
      userData.phoneNumber !== org.phoneNumber ||
      userData.conservatism !== org.conservatism ||
      userData.city !== org.city
    );
  }, [userData, org]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    setuserData(prev => ({ ...prev, phoneNumber: e.target.value }));
    setPhoneChanged(true);
    setPhoneConfirm(false);
  };

  const confirmPhoneChange = () => {

    if (userData.phoneNumber === org.phoneNumber) {
      setPhoneConfirm(false);
      setPhoneChanged(false);
      return;
    }
    setPhoneConfirm(true);
    setPhoneChanged(false);
    setIsChanged(true);
    setIsUpdating(false);
  };

  const cancelPhoneChange = () => {
    setPhoneConfirm(false);
    setPhoneChanged(false);
  };

  const isFormValid = () => {
    if (!userData.orgName || !userData.phoneNumber) {
      toast.warning("Please make sure to complete your data.", {
        autoClose: 1500,
        hideProgressBar: true,
        className: "text-red-500 font-bold"
      });
      return false;
    }

    if (userData.phoneNumber.length !== 11) {
      toast.warning("Phone number must be 11 digits.", {
        autoClose: 1500,
        hideProgressBar: true,
        className: "text-red-500 font-bold"
      });
      return false;
    }

    if (phoneChanged && !phoneConfirm) {
      toast.warning("Please confirm your phone number change.", {
        autoClose: 1500,
        hideProgressBar: true,
        className: "text-red-500 font-bold"
      });
      return false;
    }

    return true;
  }

  // const isupdate = () => {
  //   if (isFormValid()) {
  //     setIsUpdating(true);
  //     dispatch(updateOrg(userData)).unwrap()
  //       .then(() => {
  //         setIsUpdating(false);
  //         setIsEditing(false);
  //       })
  //       .catch((error) => {
  //         console.error("Update failed:", error);
  //         setIsUpdating(false);
  //       });
  //   } else {
  //     setIsEditing(true);
  //   }
  // };

  const handleSubmitorg = async (e) => {
    e.preventDefault();

    if (!isChanged) {
      toast.info("No changes detected to update.", {
        autoClose: 1500,
        hideProgressBar: true,
        className: "text-blue-500 font-bold"
      });
      return;
    }

    if (isFormValid()) {
      setIsUpdating(true);
      try {
        const res = await dispatch(updateOrg(userData)).unwrap();
        toast.success("Profile updated successfully!", {
          autoClose: 1500,
          className: "text-green-500 font-bold"
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Update failed:", error);
        toast.error(error || "Something went wrong", {
          autoClose: 1500,
          className: "text-red-500 font-bold"
        });
      }
    }
  };



  return (
    <div>
      <form onSubmit={handleSubmitorg} className='w-full space-y-3 h-screen'>
        {
          isEditlocation ? (
            <LocationPicker
              handleSubmitorg={handleSubmitorg}
              scope={scope}
              userData={userData}
              setuserData={setuserData}
              setIsEditing={setIsEditing}
              setIsEditlocation={setIsEditlocation}
              onClose={() => setIsEditlocation(false)}
            />
          ) : (
            isEditpassword ? (<ChangePasswordprofileorg
              setOpenDialog={setOpenDialog}
              setIsEditing={setIsEditing}
              setIsEditpassword={setIsEditpassword}
              onClose={() => setIsEditpassword(false)}
            />) : (
              <div>
                {/* header edit profile */}
                <div className="sm:px-4 py-10 flex items-center justify-between">
                  <div className='flex items-center gap-3'>
                    <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditing(false)} />
                    <span className='text-xl'>Edit Profile</span>
                  </div>
                  <button type="submit" disabled={!isChanged} >
                    <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
                  </button>
                </div>

                {isUpdating && (
                  <p className="text-green-500 mb-2">Updating profile...</p>
                )}

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input type="text" name="email" disabled value={userData.email} className='w-3/4 py-2 text-gray-400 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                  <span className='text-gray-500 text-sm'> Email</span>
                </div>

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input autoComplete="off" type="text" name="orgName" value={userData.orgName} onChange={handleChange} className=' py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                  <span className='text-gray-500 text-sm'>User Name</span>
                </div>

                <div
                  onClick={() => setIsEditpassword(true)}
                  className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300 cursor-pointer'>
                  <div className='w-[50%] ml-2 py-2 border-none bg-transparent font-normal text-[10px]'>●●●●●●●●●●●●●●●●</div>
                  <div className=' flex items-center gap-1'>
                    <span className='text-gray-500 text-sm'>Change Password</span>
                    <HiChevronRight className='text-lg text-gray-500' />
                  </div>
                </div>

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input autoComplete="off" type="text" name="phoneNumber" maxLength='11' value={userData.phoneNumber} onChange={handlePhoneChange} className=' w-[50%] p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                  <span className='text-gray-500 text-sm'>phone number</span>
                </div>

                {phoneChanged && !phoneConfirm && (
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-xs w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Are you sure you want to change your phone number?
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        onClick={confirmPhoneChange}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={cancelPhoneChange}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                )}

                <div
                  onClick={() => setIsEditlocation(true)}
                  className=' w-full flex items-center justify-between mb-4 border-b-[1px] border-gray-300 cursor-pointer'>
                  <div className='w-full flex items-center'>
                    <input style={{ width: `${userData.conservatism.length + 1}ch` }} disabled type="text" name="conservatism" value={userData.conservatism} onChange={handleChange} className=' p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />-
                    <input disabled type="text" name="city" value={userData.city} onChange={handleChange} className=' w-36 p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
                  </div>
                  <div className=' flex items-center gap-1'>
                    <span className='text-gray-500 text-sm'>Location</span>
                    <HiChevronRight className='text-lg text-gray-500' />
                  </div>
                </div>

              </div>
            )
          )
        }
      </form>
    </div>
  )
}

export default EditProfileorg
