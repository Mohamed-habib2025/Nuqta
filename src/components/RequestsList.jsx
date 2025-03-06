import React from 'react'
import Swal from 'sweetalert2'
import male from "../Images/male.jpg"
import female from "../Images/female.png"

function RequestsList({ requests, setRequests, setFormData, setIsEditing }) {

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
    <div>
      <h3 className="text-2xl font-bold mb-4">Your Requests</h3>
      {requests.map((request) => (
        <div key={request.id} className="border-[2px] border-black p-3 rounded mt-2 flex items-center space-x-4">
          <div>
            <img src={request.image} alt="image gender" className='w-[150px] h-[170px] rounded' />
          </div>
          <div className=' space-y-2'>
            <p className='font-bold'>Name: <span className='text-red-500 text-lg'>{request.name}</span></p>
            <p className='font-bold text-[18px]'>Location :<strong className='text-red-600'> {request.governorate} - <span>{request.city}</span></strong></p>
            <p className='font-bold'>Blood Type : <span className='text-red-500'>{request.bloodType}</span></p>
            <p className='font-bold'>Quantity : <span className='text-red-500'>{request.quantity}</span></p>
            <p className='font-bold'>Age : <span className='text-red-500'>{request.age}</span></p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => editRequest(request)} className="px-3 bg-blue-600 text-white p-1 rounded hover:bg-blue-800">Edit</button>
              <button onClick={() => removeRequest(request.id)} className="px-3 bg-red-600 text-white p-1 rounded hover:bg-red-800">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestsList
