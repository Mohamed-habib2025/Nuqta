import React, { useEffect, useState } from 'react'
import governorates from "../Data/egyptLocations";
import { GoCheck } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2';

function LocationPicker({ formData, setFormData, handleSubmit, setIsEditlocation }) {


  const [localData, setLocalData] = useState({
    governorate: formData.governorate || "",
    city: formData.city || "",
  });

  const handleSelectChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...localData,
    }));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Password updated successfully!",
      showConfirmButton: false,
      timer: 2000
    });

  };


  return (
    <div>
      {/* header edit location */}
      <div className="px-4 py-10 flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditlocation(false)} />
          <span className='text-xl'>Edit location</span>
        </div>
        <button onClick={handleSave}>
          <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
        </button>
      </div>

      <div onSubmit={handleSubmit}>
        <div className=' space-y-3'>
          <select name="governorate" value={localData.governorate} onChange={handleSelectChange}
            className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 " required
          >
            <option value="">Select Governorate</option>
            {Object.keys(governorates).map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}

          </select>

          {localData.governorate && (
            <select name="city" value={localData.city} onChange={handleSelectChange}
              className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" required
            >
              <option value="">Select City</option>
              {governorates[localData.governorate].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>

  )
}

export default LocationPicker
