import React, { useState } from 'react'

function Donors() {

  const [requests, setRequests] = useState([
    { location: "Cairo", bloodType: "A+", status: "Open", phone: "0123456789", age: "" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApprove = (request) => {
    setSelectedRequest(request);
  };

  const handleUploadTest = (e) => {
    e.preventDefault();
    setRequests(requests.map((req) => (req.id === selectedRequest.id ? { ...req, status: "Pending Approval" } : req)));
    setSelectedRequest(null);
  };


  return (
    <div className=''>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Available Requests</h2>
        {requests.map((request) => (
          <div key={request.id} className="border p-3 rounded mt-2">
            <p><strong>Location:</strong> {request.location}</p>
            <p><strong>Blood Type:</strong> {request.bloodType}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Age:</strong> {request.age}</p>
            {request.status === "Open" && (
              <button onClick={() => handleApprove(request)} className="mt-2 bg-red-600 text-white p-1 rounded hover:bg-red-800 duration-200">Approve</button>
            )}
          </div>
        ))}

        {/* Upload Test Form */}
        {selectedRequest && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded">
              <h3 className="text-xl font-semibold">Upload Blood Test</h3>
              <form onSubmit={handleUploadTest} className="space-y-2">
                <input type="file" required className="border p-2 w-full" />
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setSelectedRequest(null)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 duration-200">Cancel</button>
                  <button type="submit" className="bg-red-600 text-white p-2 rounded hover:bg-red-800 duration-200">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Donors
