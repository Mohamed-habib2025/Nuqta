import React from 'react'
import Swal from 'sweetalert2'


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
        <div key={request.id} className="border-2 bg-red-50 p-3 rounded mt-2">
          <p className='font-bold'>Governorate / city: <span className='text-red-500'>{request.governorate}</span> / <span className='text-red-500'>{request.city}</span></p>
          {/* <p className='font-bold'>City: <span className='text-red-500'>{request.city}</span></p> */}
          <p className='font-bold'>Blood Type: <span className='text-red-500'>{request.bloodType}</span></p>
          <p className='font-bold'>Quantity: <span className='text-red-500'>{request.quantity}</span></p>
          <p className='font-bold'>Age: <span className='text-red-500'>{request.age}</span></p>
          <div className="flex space-x-2 mt-2">
            <button onClick={() => editRequest(request)} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-800">Edit</button>
            <button onClick={() => removeRequest(request.id)} className="bg-red-600 text-white p-1 rounded hover:bg-red-800">Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestsList
