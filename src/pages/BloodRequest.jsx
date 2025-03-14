import React, { useState } from 'react';
import male from "../Images/male.jpg";
import female from "../Images/female.png";
import governorates from "../Data/egyptLocations";
import RequestsList from '../components/RequestsList';

function BloodRequest() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    id: null, name: "", governorate: "", city: "", phone: "", quantity: "", age: "", gender: "", urgency: "normal", bloodType: "", status: 'Open', image: null
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "gender") {
      const selectedImage = e.target.value === "male" ? male : female;
      setFormData({ ...formData, gender: e.target.value, image: selectedImage });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRequests(requests.map((req) => (req.id === formData.id ? { ...formData } : req)));
      setIsEditing(false);
    } else {
      setRequests([...requests, { ...formData, id: Date.now(), image: formData.image }]);
      setShowForm(false);
    }
    setFormData({ id: null, name: "", governorate: "", city: "", gender: "", phone: "", quantity: "", age: "", urgency: "normal", bloodType: "", status: 'Open', image: null });
  };

  return (
    <div className="w-[85%] mx-auto mt-4 py-6 ">
      {!showForm && requests.length > 0 && (
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-2xl font-bold mb-4">Your Requests</h3>
          <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded mb-4">New Request</button>
        </div>
      )}
      {showForm && (
        <div className='w-full md:w-[80%] lg:w-[60%] mx-auto'>
          <form
            onSubmit={handleSubmit}
            className=" mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-300 space-y-4"
          >
            <h2 className="text-xl font-semibold text-center text-gray-700">Request Blood Donation</h2>

            <div className="flex flex-col gap-3">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
                className="w-full p-3 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px] " required
              />

              <div className="flex gap-3">
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                />
              </div>

              <div className="flex gap-3">
                <input type="number" name="quantity" placeholder="Blood Quantity" value={formData.quantity} onChange={handleChange}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                />
                <select name="urgency" value={formData.urgency} onChange={handleChange}
                  className=" cursor-pointer w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
                >
                  <option value="">Urgency</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Not Urgent">Not Urgent</option>
                </select>
              </div>

              <div className="flex gap-3">
                <select name="gender" value={formData.gender} onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <select name="bloodType" value={formData.bloodType} onChange={handleChange}
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
                <select name="governorate" value={formData.governorate} onChange={handleChange}
                  className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                >
                  <option value="">Select Governorate</option>
                  {Object.keys(governorates).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}

                </select>

                {formData.governorate && (
                  <select name="city" value={formData.city} onChange={handleChange}
                    className=" cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]" required
                  >
                    <option value="">Select City</option>
                    {governorates[formData.governorate].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  className="bg-red-600 hover:bg-red-800 text-white text-sm text-nowrap sm:text-[16px] p-3 rounded-lg w-full sm:w-auto transition duration-300"
                >
                  {isEditing ? 'Update Request' : 'Upload Request'}
                </button>

                {requests.length > 0 && (
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
      <RequestsList requests={requests} setRequests={setRequests} setFormData={setFormData} setIsEditing={setIsEditing} setShowForm={setShowForm} />
    </div>
  );
}

export default BloodRequest;