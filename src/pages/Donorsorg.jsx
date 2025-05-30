import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../rtk/slices/usersSlice';
import { fetchorgid } from '../rtk/slices/orgid';
import { SyncLoader } from 'react-spinners';
import male from '../Images/male.jpg';
import female from "../Images/female.png";
import { IoLocationOutline } from 'react-icons/io5';
import { LuPhone } from 'react-icons/lu';
import { MdBloodtype } from 'react-icons/md';

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
    <div className='w-[85%] min-h-[500px] mx-auto pt-5'>
      <div className=' mx-3 flex flex-col lg:flex-row items-center justify-between '>
        <h2 className="text-3xl font-bold mb-2 text-red-700">Available Donors</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          filteredusers.length > 0 ? (
            filteredusers.map((user) => (
              <div key={user.id} className={` border ${user.donation.status === 'VALID' ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200"} shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer`}>
                <img src={user.gender === "MALE" ? male : female} alt="Donor" className="w-24 h-24 rounded-full mb-3" />
                <p className="flex items-center text-lg font-semibold text-red-600">{user.username}</p>
                <p className=" w-full flex items-center justify-center text-lg"><IoLocationOutline className="mr-2 text-2xl" /><span className='flex items-center flex-wrap'>{user.donation.conservatism} - {user.donation.city}</span></p>
                <p className="flex items-center text-lg"><LuPhone className="mr-2 text-xl" />{user.phoneNumber}</p>
                <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                  <MdBloodtype className="text-2xl text-red-600" />
                  <span className="">{user.donation.blood_type}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-2xl text-red-600 font-semibold py-10">
              No Donors for the specified location.
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Donorsorg;

