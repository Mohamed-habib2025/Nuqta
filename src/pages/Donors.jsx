import React, { useEffect, useState } from 'react';
import quantity from '../Images/quantity blood .png';
import { IoLocationOutline } from 'react-icons/io5';
import { LuPhone } from 'react-icons/lu';
import { MdBloodtype } from 'react-icons/md';
// import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest, deleteRequest, fetchRequests } from '../rtk/slices/Requests';
import orgimg from "../Images/Hospital.png";
import male from '../Images/male.jpg';
import female from "../Images/female.png";
import { fetchUserid } from '../rtk/slices/userid';
import { SyncLoader } from 'react-spinners';
import Donorsorg from './Donorsorg';
import Swal from 'sweetalert2';

function Donors() {

  const dispatch = useDispatch();
  const scope = useSelector((state) => state.userType.scope);

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  const { requests, loading } = useSelector(state => state.Requests);

  const [allrequests, setallrequests] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [activeDonationId, setActiveDonationId] = useState(0);

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

  const filteredRequests = sortedRequests.filter((req) => {

    const MyRequest = user?.uploadedRequests?.some((uploadedReq) => uploadedReq.id === req.id);
    if (MyRequest) return false;


    if (filterType === "Conservatism") {
      return req.conservatism === user?.donation.conservatism;
    } else if (filterType === "Conservatism_City") {
      return (
        req.conservatism === user?.donation.conservatism &&
        req.city === user.donation.city
      );
    }
    return true;
  });

  const handeleaccept = (reqid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo unless you cancel the donation later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, I want to donate.",
      cancelButtonText: "cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(acceptRequest({ donationId: userId, requestId: reqid }))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Successfully",
              text: "Thank you for your donation.",
              icon: "success"
            });
            setActiveDonationId(reqid);
            localStorage.setItem("activeDonationId", reqid);
          })
          .catch(() => {
            Swal.fire({
              title: "Falid",
              text: "An error occurred. Try again.",
              icon: "error"
            });
          });
      }
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("activeDonationId");
    if (saved) {
      setActiveDonationId(Number(saved));
    }
  }, []);

  const handleCancelDonation = (reqid) => {
    Swal.fire({
      title: "Do you want to cancel the donation?",
      text: "You may withdraw your donation to this request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRequest({ donationId: userId, requestId: reqid }))
          .unwrap()
          .then(() => {
            setActiveDonationId(0);
            localStorage.removeItem("activeDonationId");
            Swal.fire("Cancelled", "Your donation has been successfully cancelled.", "success");
          })
          .catch((error) => {
            console.log(error)
            Swal.fire("failed", "An error occurred while canceling the donation.", "error");
          });
      }
    });
  };

  if (loading) {
    return <div className=' h-lvh flex items-center justify-center '>
      <SyncLoader color="red" size={20} speedMultiplier={1} />
    </div>;
  }

  return (
    <>
      {
        scope === "USER" ?
          <div className=" w-[90%] lg:w-[85%] mx-auto pt-5 min-h-[400px]">
            <div className=' mx-3 flex flex-col lg:flex-row items-center justify-between '>
              <h2 className="text-3xl font-bold mb-2 text-red-700">Available Requests</h2>
              <div className="mb-6 mt-4 text-center space-y-2 md:space-y-0 ">
                <label className="text-xl font-semibold mr-2">Requests by location:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className=" p-2 rounded-lg w-[280px] cursor-pointer"
                >
                  <option value="all">All locations</option>
                  <option value="Conservatism">Conservatism</option>
                  <option value="Conservatism_City">Conservatism - City</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
              {
                filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div key={request.id} className=" bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col gap-1 justify-center items-center text-center transition-transform hover:scale-105 cursor-pointer">
                      <img src={request.organization ? orgimg : request.user.gender === "MALE" ? male : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
                      <p className="flex items-center text-xl font-semibold text-red-600">{request.organization ? request.organization?.orgName : request.user?.username}</p>
                      <p className="flex items-center text-lg"><IoLocationOutline className="mr-2 text-2xl" />{request.conservatism} - {request.city}</p>
                      {/* <p className="flex items-center text-xl"><LuPhone className="mr-2 text-xl" />{request.organization ? request.organization?.phoneNumber : request.user?.phoneNumber}</p> */}
                      <div className='flex items-center space-x-5'>
                        <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                          <MdBloodtype className="text-2xl text-red-600" />
                          <span className="">{request.blood_type_needed}</span>
                        </div>
                        <p className="flex items-center  mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} ml</p>
                      </div>
                      <div className='flex items-center gap-2 mt-4'>
                        {activeDonationId === request.id ? (
                          user?.donation.confirmDonate === true ? null : (
                            <button
                              onClick={() => handleCancelDonation(request.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                              Cancel Donation
                            </button>
                          )
                        ) : (
                          user?.donation?.status === 'VALID' && activeDonationId === 0 && (
                            <button
                              onClick={() => handeleaccept(request.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition"
                            >
                              Donate
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-2xl text-red-600 font-semibold py-10">
                    No requests for the specified location.
                  </div>
                )
              }

            </div>
          </div> : <Donorsorg />


      }
    </>

  );
}

export default Donors;

// const formatPhoneNumber = (phone) => {
//   if (phone.startsWith("0")) {
//     return `2${phone}`;
//   }
//   return phone;
// };