
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { HiChevronRight } from "react-icons/hi";
import LocationPicker from './LocationPicker';
import ChangePasswordprofile from './ChangePasswordprofile';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';


function EditProfile({ setIsEditing }) {

  const { user } = useSelector(state => state.userid);

  const [formData, setFormData] = useState(user);
  const [isEditlocation, setIsEditlocation] = useState(false);
  const [isEditpassword, setIsEditpassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [phoneChanged, setPhoneChanged] = useState(false);
  const [phoneConfirm, setPhoneConfirm] = useState(false);


  useEffect(() => {
    setIsChanged(
      formData.username !== user.username ||
      formData.phoneNumber !== user.phoneNumber ||
      formData.donation.blood_type !== user.donation.blood_type
    );
  }, [formData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'blood_type') {
      setFormData((prevData) => ({
        ...prevData,
        donation: {
          ...prevData.donation,
          blood_type: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phoneNumber: e.target.value });
    setPhoneChanged(true);
    setPhoneConfirm(false);
  };

  const confirmPhoneChange = () => {
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
    if (!formData.username || !formData.phoneNumber) {
      toast.warning("Please make sure to complete your data.", {
        autoClose: 1500,
        hideProgressBar: true,
        className: "text-red-500 font-bold"
      });
      return false;
    }

    if (formData.phoneNumber.length !== 11) {
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
      return;
    }

    return true;
  }

  const isupdate = () => {

    if (isFormValid()) {
      setIsUpdating(true);
      setTimeout(() => {
        setIsUpdating(false)
        setIsEditing(false)
      }, 1000);
    } else {
      setIsEditing(true)
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditlocation(false);
  };

  return (
    <div className='px-6'>
      <div className='flex flex-col items-center'>
        <form onSubmit={handleSubmit} className='w-full space-y-3'>
          {
            isEditlocation ? (
              <LocationPicker
                handleSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                setIsEditing={setIsEditing}
                setIsEditlocation={setIsEditlocation}
                onClose={() => setIsEditlocation(false)}
              />
            ) : (
              isEditpassword ? (<ChangePasswordprofile
                handleSubmit={handleSubmit}
                formData={formData}
                // setUserData={setUserData}
                setFormData={setFormData}
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
                    <button type="submit" disabled={!isChanged} onClick={isupdate} >
                      <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
                    </button>
                  </div>

                  {isUpdating && (
                    <p className="text-green-500 mb-2">Updating profile...</p>
                  )}

                  <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                    <input type="text" name="email" disabled value={formData.email} className='w-3/4 py-2 text-gray-400 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                    <span className='text-gray-500 text-sm'> Email</span>
                  </div>

                  <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className=' py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                    <span className='text-gray-500 text-sm'>User Name</span>
                  </div>

                  <div
                    onClick={() => setIsEditpassword(true)}
                    className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300 cursor-pointer'>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className=' w-[50%] py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                    <div className=' flex items-center gap-1'>
                      <span className='text-gray-500 text-sm'>Change Password</span>
                      <HiChevronRight className='text-lg text-gray-500' />
                    </div>
                  </div>

                  <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                    <input type="text" name="phoneNumber" maxLength='11' value={formData.phoneNumber} onChange={handlePhoneChange} className=' w-[50%] p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
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

                  <div className='flex items-center justify-between mb-4 border-b-[1px] border-gray-300 cursor-pointer'>
                    <select name="blood_type" value={formData.donation.blood_type} onChange={handleChange}
                      className=" p-3 bg-transparent border-none outline-none  focus:ring-0 font-normal text-gray-700 cursor-pointer appearance-none" required
                    >
                      <option value="">Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    <span className='text-gray-500 text-sm'>blood Type</span>
                  </div>

                  <div
                    onClick={() => setIsEditlocation(true)}
                    className=' w-full flex items-center justify-between mb-4 border-b-[1px] border-gray-300 cursor-pointer'>
                    <div className='w-full flex items-center'>
                      <input disabled type="text" name="conservatism" value={formData.donation.conservatism} onChange={handleChange} className=' w-16 p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required /> -
                      <input disabled type="text" name="city" value={formData.donation.city} onChange={handleChange} className=' w-36 p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
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
    </div>
  )
}

export default EditProfile
