import React, { useState } from 'react'

function EditProfile({ userData, setUserData, setIsEditing }) {

  const [formData, setFormData] = useState(userData);

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
    <div className='p-8'>
      <div className='flex flex-col items-center'>
        <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
        <form onSubmit={handleSubmit} className='w-full space-y-3'>
          <div className='flex flex-col'>
            <label className='text-sm font-semibold'>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-semibold'>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-semibold'>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' required />
          </div>
          <div className='flex justify-between mt-4'>
            <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700'>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className='bg-gray-400 text-white px-4 py-2 rounded shadow-md hover:bg-gray-500'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
