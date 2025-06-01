import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import quantity from "../Images/quantity blood .png"
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { MdBloodtype } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { ImNotification } from "react-icons/im";
import { BiCalendarAlt } from "react-icons/bi";
import male from "../Images/male.jpg";
import female from "../Images/female.png";
import orgimg from "../Images/Hospital.png";
import { useDispatch, useSelector } from 'react-redux';
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
      <div className='mt-5 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(450px,_1fr))] justify-center items-center gap-3'>
        {sortedRequests.map((request) => (

          <div key={request.id} className="bg-white md:max-w-[400px] lg:max-w-[550px] xl:max-w-[650px] border border-gray-200 rounded-2xl shadow-md p-5 flex items-center justify-around flex-wrap gap-6 hover:shadow-lg transition-all duration-300">
            <img
              src={scope === "USER" ? (user.gender === "MALE" ? male : female) : orgimg}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border"
            />

            <div className="flex flex-col items-center space-y-2">
              <h2 className={`text-lg font-bold ml-2 md:ml-0 md:text-center ${ scope === "USER" ? "text-red-500" : "text-blue-500"}`}>
                {scope === "USER" ? user.username : org.orgName}
              </h2>
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-xl " />
                <p className='text-gray-600 text-[16px] flex flex-wrap gap-2'>{request.conservatism} - {request.city}</p>
              </div>
              <div className="flex items-center gap-6 ">
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <MdBloodtype className="text-2xl" />
                  <span>{request.blood_type_needed}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-800 font-semibold">
                  <img src={quantity} alt="Quantity" className="w-6" />
                  <span>{request.amount} ml</span>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row items-center justify-around lg:justify-between lg:flex-col lg:items-start lg:gap-1 lg:w-fit'>
              <p className="flex items-center gap-2 ">
                <BiCalendarAlt className='text-xl' /> <span className="font-medium text-gray-500">{request.request_date}</span>
              </p>

              {
                request.status === "OPEN" ? <div>
                  {
                    request.urgency_level === "HIGH" && (
                      <p className="flex items-center gap-2 text-red-700">
                        <RiAlarmWarningFill className='text-xl' />
                        <span className="font-medium">High</span>
                      </p>
                    )
                  }

                  {request.urgency_level === "MEDIUM" && (
                    <p className="flex items-center gap-2 text-orange-500">
                      <RiAlarmWarningLine className='text-xl' />
                      <span className="font-medium">Medium</span>
                    </p>
                  )}

                  {request.urgency_level === "LOW" && (
                    <p className="flex items-center gap-2 text-orange-400">
                      <ImNotification className='text-lg' />
                      <span className="font-medium">Low</span>
                    </p>
                  )}
                </div> :
                  <p className="flex items-center gap-2 mt-2 text-green-700">
                    <HiOutlineCheckCircle className='text-xl' /> <span className="font-medium ">Completed</span>
                  </p>

              }


              <div className="flex gap-3">
                <button onClick={() => editRequest(request)} className="text-blue-600 hover:text-blue-800 text-xl transition">
                  <FiEdit />
                </button>
                <button onClick={() => removeRequest(request.id)} className="text-red-600 hover:text-red-800 text-xl transition">
                  <RiDeleteBin6Line />
                </button>
              </div>

            </div>

          </div>

        ))}
      </div>
    </div>
  )
}

export default RequestsList

{/* <p className="flex items-center text-gray-600"><LuPhone className="mr-2" />{scope === "USER" ? user.phoneNumber : org.phoneNumber}</p> */ }

// <div key={request.id} className=" bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform">
//   {
//     scope === "USER" ?
//       <div className='text-center flex flex-col items-center'>
//         <img src={user.gender === "MALE" ? male : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
//         <p className="flex items-center text-lg font-semibold text-red-600">{user.username}</p>
//         <p className="flex items-center text-lg"><LuPhone className="mr-2" />{user.phoneNumber}</p>
//       </div>
//       :
//       <div className='text-center flex flex-col items-center'>
//         <img src={orgimg} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
//         <p className="flex items-center text-lg font-semibold text-blue-600">{org.orgName}</p>
//         <p className="flex items-center text-lg"><LuPhone className="mr-2" />{org.phoneNumber}</p>
//       </div>
//   }

//   <p className=" w-fit flex items-center justify-center text-lg"><IoLocationOutline className="mr-2 text-2xl" />{request.conservatism} - {request.city}</p>
//   <div className='flex items-center space-x-5'>
//     <div className="flex items-center gap-1 text-lg font-semibold mt-2">
//       <MdBloodtype className="text-2xl text-red-600" />
//       <span>{request.blood_type_needed}</span>
//     </div>
//     <p className="flex items-center mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} ml</p>
//   </div>
//   <div className="flex justify-end space-x-3 text-sm sm:text-[15px] mt-3">
//     <button onClick={() => editRequest(request)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200">Edit</button>
//     <button onClick={() => removeRequest(request.id)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-200">Remove</button>
//   </div>
// </div>

