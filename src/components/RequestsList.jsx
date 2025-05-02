import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import quantity from "../Images/quantity blood .png"
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdBloodtype } from "react-icons/md";
import male from "../Images/male.jpg";
import female from "../Images/female.png";
import orgimg from "../Images/Hospital.png";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserid } from '../rtk/slices/userid';
import { deleteRequest } from '../rtk/slices/RequestsUser';

function RequestsList({ requestsuser, setRequests, setCurrentRequestId, setFormData, setIsEditing, setShowForm }) {

  const dispatch = useDispatch();
  const scope = localStorage.getItem("scope");
  const { user } = useSelector(state => state.userid);
  const { org } = useSelector(state => state.orgid);

  const removeRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          await dispatch(deleteRequest(id)).unwrap();
          const updated = requestsuser.filter(req => req.id !== id);
          setRequests(updated);
          if (updated.length === 0) setShowForm(true);

          return true;
        } catch (error) {
          Swal.showValidationMessage("Failed to delete. Try again.");
          return false;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success"
        });
      }
    });
  };

  const editRequest = (request) => {
    setCurrentRequestId(request.id)
    setFormData({ ...request });
    setIsEditing(true);
    setShowForm(true)
  };

  const sortedRequests = [...requestsuser].sort((a, b) => a.id - b.id);

  return (
    <div className='h-fit'>
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {sortedRequests.map((request) => (
          <div key={request.id} className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform">
            {
              scope === "USER" ?
                <div className='text-center flex flex-col items-center'>
                  <img src={user.gender === "MALE" ? male : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
                  <p className="flex items-center text-lg font-semibold text-red-600">{user.username}</p>
                  <p className="flex items-center text-lg"><LuPhone className="mr-2" />{user.phoneNumber}</p>
                </div>
                :
                <div className='text-center flex flex-col items-center'>
                  <img src={orgimg} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
                  <p className="flex items-center text-lg font-semibold text-blue-600">{org.orgName}</p>
                  <p className="flex items-center text-lg"><LuPhone className="mr-2" />{org.phoneNumber}</p>
                </div>
            }

            <p className="flex items-center text-lg"><IoLocationOutline className="mr-2 text-xl" />{request.conservatism} - {request.city}</p>
            <div className='flex items-center space-x-5'>
              <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                <MdBloodtype className="text-2xl text-red-600" />
                <span>{request.blood_type_needed}</span>
              </div>
              <p className="flex items-center mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} Kg</p>
            </div>
            <div className="flex justify-end space-x-3 text-sm sm:text-[15px] mt-3">
              <button onClick={() => editRequest(request)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200">Edit</button>
              <button onClick={() => removeRequest(request.id)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-200">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequestsList


