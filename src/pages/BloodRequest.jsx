import React, { useEffect, useState } from 'react';
import male from "../Images/male.jpg";
import female from "../Images/female.png";
import governorates from "../Data/egyptLocations";
import RequestsList from '../components/RequestsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserid } from '../rtk/slices/userid';
import { addRequest, updateRequest } from '../rtk/slices/RequestsUser';
import { toast } from 'react-toastify';
import { ScaleLoader, SyncLoader } from "react-spinners";
import { useTranslation } from 'react-i18next';



function BloodRequest() {

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userid);
  const [userId] = useState(localStorage.getItem('userid'));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserid(userId));
    }
  }, [dispatch, userId]);


  const [requestsuser, setRequests] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    conservatism: "",
    city: "",
    amount: "",
    urgency_level: "",
    blood_type_needed: "",
    status: "OPEN",
    request_date: "",
    payment_available: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setRequests(user.uploadedRequests);
      if ((user.uploadedRequests || []).length === 0) {
        setShowForm(true);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    // if (e.target.name === "gender") {
    //   const selectedImage = e.target.value === "male" ? male : female;
    //   setFormData({ ...formData, gender: e.target.value, image: selectedImage });
    // } else {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestPayload = {
      amount: formData.amount,
      blood_type_needed: formData.blood_type_needed,
      request_date: `${new Date().toISOString().split("T")[0]}`,
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

        toast.success(t('updated request Successful'));
      } else {
        const newRequest = await dispatch(addRequest({
          ...requestPayload,
          userId: userId
        })).unwrap();
        setRequests(prev => [...prev, newRequest]);
        setShowForm(false);
        toast.success(t('Added request Successful'));
      }
      setFormData({
        conservatism: "", city: "", amount: "", urgency_level: "", blood_type_needed: "", status: 'OPEN', request_date: ""
      });

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className=' h-lvh flex items-center justify-center '>
      <SyncLoader color="red" size={20} speedMultiplier={1} />
    </div>;
  }

  return (
    <div className=" w-[90%] md:w-[85%] mx-auto mt-4 py-6 ">
      {requestsuser.length > 0 && (
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-2xl font-bold mb-4">{t('Your Requests')}</h3>
          <button onClick={() => {
            setShowForm(true);
            setFormData({ conservatism: "", city: "", amount: "", urgency_level: "", blood_type_needed: "", status: 'OPEN' });
          }}
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded mb-4">{t("New Request")}</button>
        </div>
      )}
      {showForm && (
        <div className='w-full md:w-[80%] lg:w-[60%] mx-auto'>
          <form
            onSubmit={handleSubmit}
            className=" mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-300 space-y-4"
          >
            <h2 className="text-xl font-semibold text-center text-gray-700">{t('Request Blood Donation')}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <input type="number" name="amount" min='1' max='50' placeholder={t('Blood Quantity')} value={formData.amount} onChange={handleChange}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px] placeholder:text-black" required
                />
                <select name="urgency_level" value={formData.urgency_level} onChange={handleChange}
                  className=" cursor-pointer w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
                >
                  <option value="">{t('Urgency')}</option>
                  <option value='HIGH'>{t('HIGH')}</option>
                  <option value='MEDIUM'>{t('MEDIUM')}</option>
                  <option value='Low'>{t('Low')}</option>
                </select>
              </div>

              <div className="flex gap-3">
                <select
                  name="conservatism"
                  value={formData.conservatism}
                  onChange={handleChange}
                  className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
                  required
                >
                  <option value="">{t('Governorate')}</option>
                  {Object.entries(governorates).map(([key, value]) => (
                    <option key={key} value={key}>{value.name[currentLang]}</option>
                  ))}

                </select>

                {formData.conservatism && (
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                  >
                    <option value="">{t('City')}</option>
                    {governorates[formData.conservatism].cities.map((city, index) => (
                      <option key={index} value={city.en}>{city[currentLang]}</option>
                    ))}
                  </select>
                )}
              </div>

              <select name="blood_type_needed" value={formData.blood_type_needed} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
              >
                <option value="">{t('Blood Type')}</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <div className="flex items-center justify-between gap-3">
                <button
                  disabled={isLoading}
                  className={`hover:bg-red-800 text-white text-sm text-nowrap sm:text-[16px] p-3 rounded-lg w-full sm:w-auto transition duration-300 ${isLoading ? "bg-red-500" : "bg-red-600"}`}
                >
                  {isLoading ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} /> : isEditing ?
                    (t('edit_request')) : (t('upload_request'))}
                </button>

                {requestsuser.length > 0 && (
                  <button onClick={() => setShowForm(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white text-sm sm:text-base py-3 px-6 sm:px-10 rounded-lg w-full sm:w-auto  transition duration-300"
                  >
                    {t("Close")}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
      <RequestsList requestsuser={requestsuser} setCurrentRequestId={setCurrentRequestId} setRequests={setRequests} formData={formData} setFormData={setFormData} setIsEditing={setIsEditing} setShowForm={setShowForm} />
    </div>
  );
}

export default BloodRequest;