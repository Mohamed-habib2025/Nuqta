import React from 'react'
import Swal from 'sweetalert2'
import quantity from "../Images/quantity blood .png"
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdBloodtype } from "react-icons/md";
import male from "../Images/male.jpg";
import female from "../Images/female.png";

function RequestsList({ requests, setRequests, setFormData, setIsEditing , setShowForm}) {

  const removeRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter((request) => request.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const editRequest = (request) => {
    setFormData({ ...request });
    setIsEditing(true);
  };

  return (
    <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
      {requests.map((request) => (
        < div key={request.id} className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform " >
          <img src={request.image} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
          <p className="flex items-center text-lg font-semibold text-red-600">{request.name}</p>
          <p className="flex items-center text-lg"><IoLocationOutline className="mr-2" />{request.governorate} - {request.city}</p>
          <p className="flex items-center "><LuPhone className="mr-2" />+2{request.phone}</p>
          <div className='flex items-center space-x-5'>
            <div className="flex items-center gap-1 text-lg font-semibold mt-2">
              <MdBloodtype className="text-2xl text-red-600" />
              <span className="">{request.bloodType}</span>
            </div>
            <p className="flex items-center  mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.quantity} Kg</p>
          </div>
          < div className="flex justify-end space-x-3 text-sm sm:text-[15px] mt-3" >
            <button onClick={() => {editRequest(request); setShowForm(true)}} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200">Edit</button>
            <button onClick={() => removeRequest(request.id)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-200">Remove</button>
          </div >
        </div >
      ))}
    </div>
  )
}

export default RequestsList


