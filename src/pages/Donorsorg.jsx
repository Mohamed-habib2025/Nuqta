import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../rtk/slices/usersSlice';
import { fetchorgid } from '../rtk/slices/orgid';
import { SyncLoader } from 'react-spinners';

function Donorsorg() {

  const dispatch = useDispatch();

  const [orgaId] = useState(localStorage.getItem('orgaid'));
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  useEffect(() => {
    if (orgaId) {
      dispatch(fetchorgid(orgaId));
    }
  }, [dispatch, orgaId]);

  const { users } = useSelector((state) => state.users);
  const { org } = useSelector((state) => state.orgid);

  const [allusers, setallusers] = useState([]);

  const sortedusers = [...allusers].sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (users && users.length > 0) {
      setallusers(users);
    }
  }, [users]);



  const filteredusers = sortedusers.filter((user) => {
    if (filterType === "Conservatism") {
      return user.donation.conservatism === org.conservatism;
    } else if (filterType === "Conservatism_City") {
      return (
        user.donation.conservatism === org.conservatism &&
        user.donation.city === org.city
      );
    }
    return true;
  });

  if (!users) {
    return <div className=' h-lvh flex items-center justify-center '>
      <SyncLoader color="red" size={20} speedMultiplier={1} />
    </div>;
  }

  return (
    <div className='w-[85%] mx-auto pt-5'>
      <div className=' mx-3 flex flex-col lg:flex-row items-center justify-between '>
        <h2 className="text-3xl font-bold mb-2 text-red-700">Available Requests</h2>
        <div className="mb-6 mt-4 text-center space-y-2 md:space-y-0 ">
          <label className="text-xl font-semibold mr-2">Donors by location:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className=" p-2 rounded-lg w-[280px] cursor-pointer"
          >
            <option value="all">All Donors</option>
            <option value="Conservatism">Conservatism</option>
            <option value="Conservatism_City">Conservatism - City</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredusers.map((user) => (
          <div key={user.id} className="bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer">
            <p className="flex items-center text-lg font-semibold text-red-600">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Donorsorg;


{/* <img src={request.organization ? orgimg : request.user.gender === "MALE" ? male : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" /> */ }
{/* <p className="flex items-center text-lg"><IoLocationOutline className="mr-2" />{request.conservatism} - {request.city}</p> */ }
{/* <p className="flex items-center "><LuPhone className="mr-2" />{request.organization ? request.organization?.phoneNumber : user?.donation.status === 'VALID' ? request.user.phoneNumber : null}</p> */ }
{/* <p className="flex items-center text-lg">{request.request_date}</p> */ }
{/* <div className='flex items-center space-x-5'>
              <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                <MdBloodtype className="text-2xl text-red-600" />
                <span className="">{request.blood_type_needed}</span>
              </div>
              <p className="flex items-center  mt-2 font-bold"><img src={quantity} alt="Blood quantity" className="w-6 mr-1" />{request.amount} Kg</p>
            </div> */}
{/* {user.donation.status === 'VALID' && (
              <div className='flex items-center gap-2 mt-4'>
                <button
                  onClick={() => handeleaccept(request.id)}
                  disabled={donatedRequests.includes(request.id)}
                  className={`px-4 py-2 rounded-lg transition duration-200 ${donatedRequests.includes(request.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-800 text-white'}`}
                >
                  {donatedRequests.includes(request.id) ? 'Donated' : 'Donate'}
                </button>

                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  <BsChatDots className='text-xl' />
                  <span>Chat</span>
                </button>
              </div>
            )} */}
