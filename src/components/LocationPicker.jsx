import React, { useState } from 'react'
import governorates from "../Data/egyptLocations";
import { GoCheck } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";

function LocationPicker({ userData, setuserData, handleSubmituser, handleSubmitorg , setIsEditlocation, scope }) {

  const [localData, setLocalData] = useState(() => {

    if (scope === "USER") {
      return {
        conservatism: userData?.donation?.conservatism || "",
        city: userData?.donation?.city || "",
      };
    } else {
      return {
        conservatism: userData?.conservatism || "",
        city: userData?.city || "",
      };
    }
  });

  const handleSelectChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {

    if (scope === "USER") {
      setuserData((prevData) => ({
        ...prevData,
        donation: {
          ...prevData.donation,
          conservatism: localData.conservatism,
          city: localData.city,
        },
      }));
    } else {
      setuserData((prevData) => ({
        ...prevData,
        conservatism: localData.conservatism,
        city: localData.city,
      }));
    }
    setIsEditlocation(false);
  };

  return (
    <div>
      {/* header edit location */}
      <div className="sm:px-4 py-10 flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditlocation(false)} />
          <span className='text-xl'>Edit location</span>
        </div>
        <button onClick={handleSave}>
          <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
        </button>
      </div>

      {
        scope === "USER" ?
          <div onSubmit={handleSubmituser}>
            <div className=' space-y-3'>
              <select name="conservatism" value={localData.conservatism} onChange={handleSelectChange}
                className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 " required
              >
                <option value="">Select Governorate</option>
                {Object.keys(governorates).map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}

              </select>

              {localData.conservatism && (
                <select name="city" value={localData.city} onChange={handleSelectChange}
                  className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" required
                >
                  <option value="">Select City</option>
                  {governorates[localData.conservatism]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
            </div>
          </div> :

          <div onSubmit={handleSubmitorg}>
            <div className=' space-y-3'>
              <select name="conservatism" value={localData.conservatism} onChange={handleSelectChange}
                className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 " required
              >
                <option value="">Select Governorate</option>
                {Object.keys(governorates).map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}

              </select>

              {localData.conservatism && (
                <select name="city" value={localData.city} onChange={handleSelectChange}
                  className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0" required
                >
                  <option value="">Select City</option>
                  {governorates[localData.conservatism]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
      }

    </div>

  )
}

export default LocationPicker
