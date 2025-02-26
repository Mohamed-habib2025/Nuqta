import React, { useState } from 'react';

const governorates = {
  "Cairo": ["Nasr City", "Heliopolis", "Maadi", "Zamalek", "Shubra"],
  "Alexandria": ["Sidi Gaber", "Miami", "Stanley", "Mansheya", "Borg El Arab"],
  "Giza": ["Dokki", "Mohandessin", "Haram", "6th of October", "Sheikh Zayed"],
  "Dakahlia": ["Mansoura", "Talkha", "Mit Ghamr", "Sherbin", "Belqas"],
  "Red Sea": ["Hurghada", "Safaga", "Marsa Alam", "Quseir", "Ras Ghareb"],
  "Beheira": ["Damanhour", "Kafr El Dawar", "Edku", "Rashid", "Kom Hamada"],
  "Fayoum": ["Fayoum", "Ibshaway", "Sinnuris", "Tamia", "Itsa"],
  "Gharbia": ["Tanta", "Mahalla", "Zefta", "Kafr El Zayat", "Basyoun"],
  "Ismailia": ["Ismailia", "Fayed", "Qantara East", "Qantara West", "Tell El Kebir"],
  "Menofia": ["Shebin El Kom", "Menouf", "Tala", "Ashmoun", "Quesna"],
  "Minya": ["Minya", "Mallawi", "Bani Mazar", "Samalut", "Maghagha"],
  "Qaliubiya": ["Banha", "Shibin El-Qanater" , "Shubra El Kheima", "Qalyub", "Khanka", "Toukh"],
  "New Valley": ["Kharga", "Dakhla", "Farafra", "Paris", "Balat"],
  "Suez": ["Suez", "Ain Sokhna", "Al-Adabiya", "Ataka", "Port Tawfiq"],
  "Aswan": ["Aswan", "Kom Ombo", "Edfu", "Drau", "Nasr El Nuba"],
  "Assiut": ["Assiut", "Dairut", "Manfalut", "Abnub", "Sahel Selim"],
  "Beni Suef": ["Beni Suef", "Biba", "Naser", "Al Wasta", "Al Fashn"],
  "Port Said": ["Port Said", "El Manakh", "El Arab", "El Dawahy", "El Sharq"],
  "Damietta": ["Damietta", "New Damietta", "Ras El Bar", "Ezbet El Borg", "Faraskour"],
  "Sharkia": ["Zagazig", "10th of Ramadan", "Belbeis", "Minya El Qamh", "Abu Hammad"],
  "South Sinai": ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine"],
  "Kafr El Sheikh": ["Kafr El Sheikh", "Desouk", "Balteem", "Sidi Salem", "Metobas"],
  "Matruh": ["Marsa Matruh", "El Alamein", "Siwa", "Sidi Barrani", "Dabaa"],
  "Luxor": ["Luxor", "Armant", "Esna", "Qurna", "El-Tod"],
  "Qena": ["Qena", "Nag Hammadi", "Dishna", "Abu Tesht", "Qus"],
  "North Sinai": ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd", "Nakhl"],
  "Sohag": ["Sohag", "Akhmim", "Gerga", "Tahta", "El Balyana"]
};

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
    urgency: "normal",
    bloodType: "",
    status: 'Open'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setRequests(requests.map((req) => (req.id === formData.id ? { ...formData } : req)));
      setIsEditing(false);
    } else {
      setRequests([...requests, { ...formData, id: Date.now() }]);
    }

    setFormData({ id: null, name: "", governorate: "", city: "", phone: "", quantity: "", age: "", urgency: "normal", bloodType: "", status: 'Open' });
  };

  const removeRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const editRequest = (request) => {
    setFormData({ ...request });
    setIsEditing(true);
  };

  return (
    <div className="mx-5 mt-4 p-6 grid grid-cols-1 md:grid-cols-2 gap-7">
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
      <div>
        <h3 className="text-2xl font-bold mb-4">Your Requests</h3>
        {requests.map((request) => (
          <div key={request.id} className="border-2 bg-red-50 p-3 rounded mt-2">
            <p className='font-bold'>Governorate: <span className='text-red-500'>{request.governorate}</span></p>
            <p className='font-bold'>City: <span className='text-red-500'>{request.city}</span></p>
            <p className='font-bold'>Blood Type: <span className='text-red-500'>{request.bloodType}</span></p>
            <p className='font-bold'>Quantity: <span className='text-red-500'>{request.quantity}</span></p>
            <p className='font-bold'>Age: <span className='text-red-500'>{request.age}</span></p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => editRequest(request)} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-800">Edit</button>
              <button onClick={() => removeRequest(request.id)} className="bg-red-600 text-white p-1 rounded hover:bg-red-800">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BloodRequest;