import React, { useState } from 'react';

function RequstOrga() {
  const [formData, setFormData] = useState({
    bloodType: '',
    bagsRequired: '',
    urgency: '',
    neededDate: '',
    notes: '',
  });

  const [status, setStatus] = useState('Pending');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-500';
      case 'Donated':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-gray-400';
      default:
        return 'bg-blue-500';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API request
    console.log('Submitted data:', formData);
  };

  return (
    <div className=" w-[85%] lg:w-[60%] mx-auto mt-4 py-6">

      <form onSubmit={handleSubmit} className="mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-300 space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-700">Blood Donation Request</h2>
        <div className="flex flex-col gap-3">

          <div className='flex space-x-3'>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-1/2 text-gray-500 focus:text-black p-3 border border-gray-300 rounded-lg hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
              required
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <input type="number"
              name="bagsRequired"
              value={formData.bagsRequired}
              onChange={handleChange}
              placeholder='Number of Quantity Required'
              className="w-1/2 p-3 border border-gray-300 rounded-lg hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
              required
              min="1"
            />
          </div>

          <div className='flex space-x-3'>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-1/2 text-gray-500 hover:cursor-pointer focus:text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
              required
            >
              <option value="">Select urgency</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Very Urgent">Very Urgent</option>
            </select>

            <input type="date"
              name="neededDate"
              value={formData.neededDate}
              onChange={handleChange}
              className="w-1/2 text-gray-500 p-3 border border-gray-300 rounded-lg hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
              required
            />
          </div>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder='Additional Notes (Optional)'
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-red-600 focus:border-[2px]"
            rows="3"
          ></textarea>


          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-800 text-white text-sm sm:text-[16px] p-3 rounded-lg w-full sm:w-auto transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 text-center">
        <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default RequstOrga;
