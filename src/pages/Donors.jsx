import { acceptRequest, deleteRequest, fetchRequests } from '../rtk/slices/Requests';
import { useDispatch, useSelector } from 'react-redux';
import quantity from '../Images/quantity blood .png';
import { IoLocationOutline } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import { fetchUserid } from '../rtk/slices/userid';
import { MdBloodtype } from 'react-icons/md';
import orgimg from "../Images/Hospital.png";
import male from '../Images/male.jpg';
import { HiOutlineCheckCircle } from "react-icons/hi2";
import female from "../Images/female.png";
import { SyncLoader } from 'react-spinners';
import Donorsorg from './Donorsorg';
import Swal from 'sweetalert2';
import { RiAlarmWarningFill, RiAlarmWarningLine } from "react-icons/ri";
import { ImNotification } from "react-icons/im";
import { BiDonateBlood } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";

function Donors() {

  const dispatch = useDispatch();
  const scope = useSelector((state) => state.userType.scope);

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  const { requests, loading } = useSelector(state => state.Requests);

  const [allrequests, setallrequests] = useState([]);
  const [filterType, setFilterType] = useState("all");

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
            dispatch(fetchUserid(userId));
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
            dispatch(fetchUserid(userId));
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

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,_minmax(600px,_1fr))] justify-center items-center gap-3">
              {
                filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div key={request.id} className=" bg-white md:max-w-[400px] lg:max-w-[550px] xl:max-w-[650px] border border-gray-200 rounded-2xl shadow-md p-4 flex items-center justify-around flex-wrap gap-6 hover:shadow-lg transition-all duration-300">
                      <img src={request.organization ? orgimg : request.user.gender === "MALE" ? male : female} alt="Donor" className="w-16 h-16 md:w-20 md:h-20 rounded-full border" />

                      <div className=' space-y-1'>
                        <p className="flex items-center justify-center text-xl font-semibold text-red-600">{request.organization ? request.organization?.orgName : request.user?.username}</p>
                        <p className="flex items-center text-[16px] text-gray-600"><IoLocationOutline className="mr-2 text-2xl" />{request.conservatism} - {request.city}</p>
                        <div className='flex items-center justify-center space-x-5'>
                          <div className="flex items-center gap-1 text-lg font-semibold ">
                            <MdBloodtype className="text-2xl text-red-600" />
                            <span className="">{request.blood_type_needed}</span>
                          </div>
                          <p className="flex items-center font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} ml</p>
                        </div>
                      </div>

                      <div className=' flex xl:flex-col items-center gap-2 sm:gap-4 lg:gap-6 xl:justify-center xl:gap-1'>
                        <p className="flex items-center space-x-1 sm:mr-0 "><BiCalendarAlt className="text-xl" /><span className='font-medium text-gray-500'>{request.request_date}</span></p>

                        {
                          request.status === "OPEN" ?
                            <div>
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
                            <p className="flex items-center gap-2 text-green-500">
                              <HiOutlineCheckCircle className='text-2xl' /> <span className="font-bold ">Completed</span>
                            </p>

                        }

                        <div className='flex items-center gap-2 '>
                          {user?.donation.confirmDonateReqId === request.id ? (
                            user?.donation.confirmDonate === true ? null : (
                              <button
                                onClick={() => handleCancelDonation(request.id)}
                                className="px-3 py-1 text-[16px] bg-red-600 text-white rounded-lg hover:bg-red-800 transition"
                              >
                                Cancel
                              </button>
                            )
                          ) : (
                            user?.donation?.status === 'VALID' && user?.donation.confirmDonateReqId === 0 && request.status === "OPEN" && (
                              <button
                                onClick={() => handeleaccept(request.id)}
                                className="px-2 py-1 flex items-center gap-2 bg-red-600 text-[16px] text-white rounded-lg hover:bg-red-800 transition"
                              >
                                <BiDonateBlood className='text-xl' /> <span>Donate</span>
                              </button>
                            )
                          )}
                        </div>
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