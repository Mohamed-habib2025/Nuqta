import React from 'react'
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import governorates from "../Data/egyptLocations"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {

  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    governorate: "",
    city: "",
    bloodType: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });


  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setIsSignUp(false);
  }
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate('/')
  }



  return (
    <div className={` w-full flex items-center justify-center sm:h-[720px]  ${isSignUp ? 'h-[650px]' : 'h-[550px] '}`}>
      <div className="relative w-[768px] sm:h-[70%] h-full bg-white rounded-3xl shadow-xl overflow-hidden mx-5">
        {/* Sign Up Form */}
        <div className={`absolute transition-all duration-700 bottom-0 sm:top-0 right-0 w-full sm:w-1/2 h-[70%] sm:h-full ${isSignUp ? 'opacity-100 ' : 'opacity-0 '}`}>
          <form onSubmit={handleSubmitRegister} className="flex flex-col items-center justify-center h-full p-5 sm:p-8">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <span className="text-[18px]">or use your email for registration</span>
            <div className="space-y-2 mt-2 w-full">
              <input type="text" placeholder="Username" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              <div className="flex justify-between w-full">

                <input type="date" className=" rounded-lg text-gray-500 bg-gray-200 border-none w-[49%] p-2 focus:ring-0" required />
                <input type="number" placeholder='Weight' className=" rounded-lg bg-gray-200 border-none w-[49%] p-2 focus:ring-0" required />
              </div>
              <div className="flex justify-between w-full">
                <select name="governorate" value={formData.governorate} onChange={handleChange} className=" cursor-pointer w-[49%] p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value=""> Governorate</option>
                  {Object.keys(governorates).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                <select name="bloodType" value={formData.bloodType} onChange={handleChange} className=" cursor-pointer w-[49%] p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Blood Type</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {formData.governorate && (
                <select name="city" value={formData.city} onChange={handleChange} className="cursor-pointer w-full p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Select City</option>
                  {governorates[formData.governorate].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" placeholder="Email" className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} placeholder="Password" className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute transition-all duration-700 top-0 left-0 w-full sm:w-1/2 h-[50%] sm:h-full ${isSignUp ? 'opacity-0 ' : 'opacity-100'}`}>
          <form onSubmit={handleSubmitLogin} className="flex flex-col items-center justify-center sm:h-full p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-[18px]">or use your email password</span>
            <div className="space-y-2 mt-2 w-full">
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" placeholder="Email" className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' py-2 px-3 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} placeholder="Password" className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <Link to='/forgetpassword' className="text-[14px] hover:text-red-600 duration-200 text-gray-500 mt-2">Forget Your Password?</Link>
            <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute transition-all duration-700 transform ${isSignUp ?
          ' -translate-y-full sm:-translate-y-0 sm:-translate-x-full w-full sm:w-1/2 h-[30%] sm:h-full sm:left-1/2 top-[30%] sm:top-0'
          : ' translate-y-full sm:-translate-y-0 w-full sm:w-1/2 h-[30%] sm:h-full bottom-[30%] sm:top-0 sm:right-0'}`}>
          <div className={`bg-red-600 text-white flex flex-col items-center justify-center h-full px-10 text-center transition-all duration-500 ease-in-out ${isSignUp ? ' rounded-b-[100px] sm:rounded-none sm:rounded-r-[150px]' : ' rounded-t-[100px] sm:rounded-none sm:rounded-l-[150px]'}`}>
            <h1 className="text-2xl font-bold">{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
            <p className="text-sm mt-2">{isSignUp ? 'Enter your details to use all features' : 'Register with your details to use all features'}</p>
            <button onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 px-6 py-2 border border-white rounded-full hover:border-black hover:bg-white hover:text-black transition-all duration-300"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

