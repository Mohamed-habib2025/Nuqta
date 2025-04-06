
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { HiChevronRight } from "react-icons/hi";
import LocationPicker from './LocationPicker';
import ChangePasswordprofile from './ChangePasswordprofile';


function EditProfile({ userData, setUserData, setIsEditing }) {

  const [formData, setFormData] = useState(userData);
  const [isEditlocation, setIsEditlocation] = useState(false);
  const [isEditpassword, setIsEditpassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [phoneChanged, setPhoneChanged] = useState(false);  // State to track phone change
  const [phoneConfirm, setPhoneConfirm] = useState(false);  // State to confirm phone change


  useEffect(() => {
    setIsChanged(
      formData.name !== userData.name ||
      formData.phone !== userData.phone ||
      formData.bloodType !== userData.bloodType
    );
  }, [formData, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
    setPhoneChanged(true);
    setPhoneConfirm(false);
  };

  const confirmPhoneChange = () => {
    setPhoneConfirm(true);
    setPhoneChanged(false);
  };
  const cancelPhoneChange = () => {
    setPhoneConfirm(false);
    setPhoneChanged(false);
  };

  const isupdate = () => {
    if (phoneChanged && !phoneConfirm) {
      alert("Please confirm your phone number change.");
      return;
    }
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false)
      setIsEditing(false)
    }, 1000);
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
                setUserData={setUserData}
                setFormData={setFormData}
                setIsEditing={setIsEditing}
                setIsEditpassword={setIsEditpassword}
                onClose={() => setIsEditpassword(false)}
              />) : (
                <div>
                  {/* header edit profile */}
                  <div className="px-4 py-10 flex items-center justify-between">
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
                    <input type="text" name="name" disabled value={formData.email} className=' py-2 text-gray-400 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
                    <span className='text-gray-500 text-sm'> Email</span>
                  </div>

                  <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className=' py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' />
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
                    <input type="text" name="phone" minLength='13' maxLength='13' value={formData.phone} onChange={handlePhoneChange} className=' w-[50%] p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
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
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange}
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
                      <input disabled type="text" name="governorate" value={formData.governorate} onChange={handleChange} className=' w-16 p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required /> -
                      <input disabled type="text" name="city" value={formData.city} onChange={handleChange} className=' w-36 p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
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
