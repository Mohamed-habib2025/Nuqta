import React, { useEffect, useState } from 'react';
import governorates from "../Data/egyptLocations";
import RequestsList from '../components/RequestsList';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, updateRequest } from '../rtk/slices/RequestsUser';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { fetchorgid } from '../rtk/slices/orgid';
import { ScaleLoader, ClockLoader, SyncLoader } from "react-spinners";

function RequstOrga() {

  const dispatch = useDispatch();
  const { org } = useSelector(state => state.orgid);
  const [orgaid] = useState(localStorage.getItem('orgaid'));

  useEffect(() => {
    if (orgaid) {
      dispatch(fetchorgid(orgaid));
    }
  }, [dispatch, orgaid]);

  const [requestsorg, setRequests] = useState([]);

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    conservatism: "",
    city: "",
    amount: "",
    urgency_level: "",
    blood_type_needed: "",
    status: "OPEN",
    request_date: "2024-12-01",
    payment_available: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (org) {
      setRequests(org.uploadedRequests);
    }
  }, [org]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestPayload = {
      amount: formData.amount,
      blood_type_needed: formData.blood_type_needed,
      request_date: "2024-12-01",
      urgency_level: formData.urgency_level,
      status: formData.status,
      payment_available: formData.payment_available,
      city: formData.city,
      conservatism: formData.conservatism,
    };

    try {
      if (isEditing) {
        const updatedRequest = await dispatch(updateRequest({
          ...requestPayload,
          id: currentRequestId
        })).unwrap();

        setRequests(prev => prev.map(request =>
          request.id === currentRequestId ? updatedRequest : request
        ));

        setShowForm(false);
        setIsEditing(false);
        setCurrentRequestId(null);

        toast.success("updated request Successful");
      } else {
        const newRequest = await dispatch(addRequest({
          ...requestPayload,
          orgId: orgaid
        })).unwrap();
        setRequests(prev => [...prev, newRequest]);
        setShowForm(false);
        toast.success("Added request Successful");
      }
      setFormData({
        conservatism: "", city: "", amount: "", urgency_level: "", blood_type_needed: "", status: 'OPEN', request_date: "2024-12-01"
      });

    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!org) {
    return <div className=' h-96 flex items-center justify-center'>
      <SyncLoader color="red" size={20} speedMultiplier={1}  />
    </div>;
  }

  return (
    <div className="w-[85%] mx-auto mt-4 py-6 ">
      {!showForm && (
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-2xl font-bold mb-4">Your Requests</h3>
          <button onClick={() => {
            setShowForm(true);
            setFormData({ conservatism: "", city: "", amount: "", urgency_level: "", blood_type_needed: "", status: 'OPEN' });
          }}
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded mb-4">New Request</button>
        </div>
      )}
      {requestsorg.length == 0 && (
        <div className='w-full md:w-[80%] lg:w-[60%] mx-auto'>
          <form
            onSubmit={handleSubmit}
            className=" mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-300 space-y-4"
          >
            <h2 className="text-xl font-semibold text-center text-gray-700">Request Blood Donation</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <input type="number" name="amount" min='100' max='500' placeholder="Blood Quantity" value={formData.amount} onChange={handleChange}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                />
                <select name="urgency_level" value={formData.urgency_level} onChange={handleChange}
                  className=" cursor-pointer w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
                >
                  <option value="">Urgency</option>
                  <option value="HIGH">HIGH</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <div className="flex gap-3">

                <select name="blood_type_needed" value={formData.blood_type_needed} onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                >
                  <option value="">Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="flex gap-3">
                <select name="conservatism" value={formData.conservatism} onChange={handleChange}
                  className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                >
                  <option value="">Select Governorate</option>
                  {Object.keys(governorates).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}

                </select>

                {formData.conservatism && (
                  <select name="city" value={formData.city} onChange={handleChange}
                    className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                  >
                    <option value="">Select City</option>
                    {governorates[formData.conservatism].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  disabled={isLoading}
                  className={`hover:bg-red-800 text-white text-sm text-nowrap sm:text-[16px] p-3 rounded-lg w-full sm:w-auto transition duration-300 ${isLoading ? "bg-red-500" : "bg-red-600"}`}
                >
                  {isLoading ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} /> : isEditing ?
                    'Edit Request' : 'Upload Request'}
                </button>

                {requestsorg.length > 0 && (
                  <button onClick={() => setShowForm(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white text-sm sm:text-base py-3 px-6 sm:px-10 rounded-lg w-full sm:w-auto  transition duration-300"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
      <RequestsList requestsuser={requestsorg} setCurrentRequestId={setCurrentRequestId} setRequests={setRequests} formData={formData} setFormData={setFormData} setIsEditing={setIsEditing} setShowForm={setShowForm} />
    </div>
  );
};

export default RequstOrga;
