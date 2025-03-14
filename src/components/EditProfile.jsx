import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { HiChevronRight } from "react-icons/hi";
import LocationPicker from './LocationPicker';


function EditProfile({ userData, setUserData, setIsEditing }) {

  const [formData, setFormData] = useState(userData);
  const [isEditlocation, setIsEditlocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
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
                setIsEditlocation={setIsEditlocation}
                onClose={() => setIsEditlocation(false)}
              />
            ) : (
              <div>
                {/* header edit profile */}
                <div className="px-4 py-10 flex items-center justify-between">
                  <div className='flex items-center gap-3'>
                    <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditing(false)} />
                    <span className='text-xl'>Edit Profile</span>
                  </div>
                  <button type="submit">
                    <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
                  </button>
                </div>

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className=' py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
                  <span className='text-gray-500 text-sm'>Email</span>
                </div>

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input type="text" name="username" value={formData.name} onChange={handleChange} className=' py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
                  <span className='text-gray-500 text-sm'>User Name</span>
                </div>

                <div className=' flex items-center justify-between mb-4 border-b-[1px] border-gray-300'>
                  <input type="text" name="phone" minLength='13' maxLength='13' value={formData.phone} onChange={handleChange} className=' p-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none' required />
                  <span className='text-gray-500 text-sm'>phone number</span>
                </div>

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
          }

        </form>
      </div>
    </div>
  )
}

export default EditProfile
