import React, { useState } from 'react';
import male from "../Images/male.jpg"
import female from "../Images/female.png"
// Data
import governorates from "../Data/egyptLocations"
import RequestsList from '../components/RequestsList';

function BloodRequest() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    governorate: "",
    city: "",
    phone: "",
    quantity: "",
    age: "",
    gender:"",
    urgency: "normal",
    bloodType: "",
    status: 'Open',
    image: null
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {

    if(e.target.name === "gender"){
      const selectedImage = e.target.value === "male" ? male : female;
      setFormData({ ...formData, gender: e.target.value, image: selectedImage });
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      setRequests(requests.map((req) => (req.id === formData.id ? { ...formData } : req)));
      setIsEditing(false);
    } else {
      setRequests([...requests, { ...formData, id: Date.now() , image: formData.image }]);
    }

    setFormData({ id: null, name: "", governorate: "", city: "", gender:"" , phone: "", quantity: "", age: "", urgency: "normal", bloodType: "", status: 'Open',image: null });
  };

  return (
    <div className=" w-[85%] mx-auto mt-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-7 ">
      <div>
        <h2 className="text-2xl font-bold mb-4">Request Blood</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="quantity" placeholder="Blood Quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" required />

          <select name="governorate" value={formData.governorate} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Governorate</option>
            {Object.keys(governorates).map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>

          {formData.governorate && (
            <select name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select City</option>
              {governorates[formData.governorate].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}

          <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Urgency</option>
            <option value="Urgent">Urgent</option>
            <option value="Not Urgent">Not Urgent</option>
          </select>

          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <button type="submit" className="bg-red-600 hover:bg-red-800 text-white p-2 rounded">{isEditing ? 'Update Request' : 'Upload Request'}</button>
        </form>
      </div>

      {/* Requests List */}

      <RequestsList requests={requests} setRequests={setRequests} setFormData={setFormData} setIsEditing={setIsEditing} />
      
    </div>
  );
}

export default BloodRequest;