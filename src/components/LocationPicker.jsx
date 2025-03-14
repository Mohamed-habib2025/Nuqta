import React from 'react'
import governorates from "../Data/egyptLocations";
import { GoCheck } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";


function LocationPicker({ formData, setFormData, setIsEditing, handleSubmit, setIsEditlocation }) {


  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">

      {/* header edit location */}
      <div className="px-4 py-10 flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditlocation(false)} />
          <span className='text-xl'>Edit location</span>
        </div>
        <button type="submit" onClick={() => setIsEditing(false)}>
          <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className=' space-y-3'>
          <select name="governorate" value={formData.governorate} onChange={handleSelectChange}
            className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 " required
          >
            <option value="">Select Governorate</option>
            {Object.keys(governorates).map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}

          </select>

          {formData.governorate && (
            <select name="city" value={formData.city} onChange={handleSelectChange}
              className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" required
            >
              <option value="">Select City</option>
              {governorates[formData.governorate].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>
      </form>
    </div>

  )
}

export default LocationPicker
