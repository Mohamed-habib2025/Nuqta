import React, { useEffect, useState } from 'react';
import male from '../Images/male.jpg';
import quantity from '../Images/quantity blood .png';
import { IoLocationOutline } from 'react-icons/io5';
import { LuPhone } from 'react-icons/lu';
import { MdBloodtype } from 'react-icons/md';
import { BsChatDots } from "react-icons/bs";
// import { IoCallOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../rtk/slices/Requests';
import orgimg from "../Images/Hospital.png";
import male1 from "../Images/male.jpg";
import female from "../Images/female.png";
import { fetchUserid } from '../rtk/slices/userid';
import { SyncLoader } from 'react-spinners';


function Donors() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  const { requests } = useSelector(state => state.Requests);

  const [allrequests, setallrequests] = useState([]);

  const sortedRequests = [...allrequests].sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (requests && requests.length > 0) {
      setallrequests(requests);
    }
  }, [requests]);

  const { user } = useSelector(state => state.userid);
  const [userId] = useState(localStorage.getItem('userid'));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserid(userId));
    }
  }, [dispatch, userId]);

  if (!user) {
    return <div className=' h-lvh flex items-center justify-center '>
      <SyncLoader color="red" size={20} speedMultiplier={1} />
    </div>;
  }


  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-700">Available Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedRequests.map((request) => (
          <div key={request.id} className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer">
            <img src={request.organization ? orgimg : request.user.gender === "MALE" ? male1 : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
            <p className="flex items-center text-lg font-semibold text-red-600">{request.organization ? request.organization?.orgName : request.user?.username}</p>
            <p className="flex items-center text-lg"><IoLocationOutline className="mr-2" />{request.conservatism} - {request.city}</p>
            <p className="flex items-center "><LuPhone className="mr-2" />{request.organization ? request.organization?.phoneNumber : request.user?.phoneNumber}</p>
            <p className="flex items-center text-lg">{request.request_date}</p>
            <div className='flex items-center space-x-5'>
              <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                <MdBloodtype className="text-2xl text-red-600" />
                <span className="">{request.blood_type_needed}</span>
              </div>
              <p className="flex items-center  mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} Kg</p>
            </div>
            {user.donation.status === 'VALID' && (
              <div className='flex items-center gap-2 mt-4'>
                <button
                  onClick={() => handleApprove(request)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-200"
                >
                  Donate
                </button>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  <BsChatDots className='text-xl' />
                  <span>Chat</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* {selectedRequest && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-center">Upload Blood Test</h3>
            <form onSubmit={handleUploadTest} className="space-y-4">
              <input type="file" required className="border p-2 w-full rounded-lg" />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-800 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

    </div>
  );
}

export default Donors;

