import React from 'react'
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import governorates from "../Data/egyptLocations"

function LoginPageOrganisation() {

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    governorate: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='w-full mx-auto h-[670px] flex items-center justify-center '>
      <div className="relative w-[768px] min-h-[70%] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Sign Up Form */}
        <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isSignUp ? 'opacity-100 z-10 ' : 'opacity-0 z-0 '}`}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full p-10">
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <span className="text-[17px] font-bold text-gray-800">or use your email for registration</span>
            <div className="space-y-2 mt-5 w-full">
              <input type="text" placeholder="Organization Name" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <input type="number" placeholder="License Number" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <div className=' relative'>
                <input type="email" placeholder="Email" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
                <MdOutlineMail className=' absolute text-[20px] text-gray-500 top-3 right-3' />
              </div>
              <div className=' relative'>
                <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
                <RiLockPasswordLine className='absolute text-[20px] text-gray-500 top-3 right-3' />
              </div>
              <select name="governorate" value={formData.governorate} onChange={handleChange} className=" cursor-pointer w-full p-2 border-none rounded bg-gray-200 focus:ring-0" required>
                <option value=""> Governorate</option>
                {Object.keys(governorates).map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              {formData.governorate && (
                <select name="city" value={formData.city} onChange={handleChange} className=" cursor-pointer w-full p-2 border rounded bg-gray-200" required>
                  <option value="">Select City</option>
                  {governorates[formData.governorate].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
            </div>
            <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isSignUp ? 'opacity-0 z-0 ' : 'opacity-100 z-10 '}`}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-[18px]">or use your email password</span>
            <div className="space-y-2 mt-2 w-full">
              <div className=' relative'>
                <input type="email" placeholder="Email or License Number" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
                <MdOutlineMail className=' absolute text-[20px] text-gray-500 top-3 right-3' />
              </div>
              <div className=' relative'>
                <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
                <RiLockPasswordLine className='absolute text-[20px] text-gray-500 top-3 right-3' />
              </div>
            </div>
            <a href="#" className="text-[14px] hover:text-red-600 duration-200 text-gray-500 mt-2">Forget Your Password?</a>
            <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 transition-all duration-700 h-full ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-red-600 text-white flex flex-col items-center justify-center h-full px-10 text-center ${isSignUp ? 'rounded-r-[150px]' : 'rounded-l-[150px]'}`}>
            <h1 className="text-2xl font-bold">{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
            <p className="text-sm mt-2">{isSignUp ? 'Enter your details to use all features' : 'Register with your details to use all features'}</p>
            <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 px-6 py-2 border border-white rounded-full hover:border-black duration-300">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPageOrganisation

// <div className='w-full mx-auto h-[670px] flex items-center justify-center'>
//   <div className="relative w-[768px] min-h-[70%] bg-white rounded-3xl shadow-xl overflow-hidden">
//     {/* Sign Up Form */}
//     <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isSignUp ? 'opacity-100 z-10 ' : 'opacity-0 z-0 '}`}>
//       <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full p-10">
//         <h1 className="text-2xl font-bold">Create Account</h1>
//         <span className="text-[18px]">or use your email for registration</span>
//         <div className="space-y-2 mt-2 w-full">
//           <input type="text" placeholder="Username" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
//           <div className="flex justify-between w-full">
//             {/* <select className=" cursor-pointer rounded-lg bg-gray-200 border-none w-[48%] p-2 focus:ring-0">
//               <option>Birth Date</option>
//             </select> */}
//             <input type="date" className=" text-gray-500 rounded-lg bg-gray-200 border-none w-[48%] p-2 focus:ring-0" />
//             <input type="number" placeholder='Weight' className=" rounded-lg bg-gray-200 border-none w-[48%] p-2 focus:ring-0" />
//           </div>
//           <div className="flex justify-between w-full">
//             <select name="governorate" value={formData.governorate} onChange={handleChange} className=" cursor-pointer w-[48%] p-2 border-none rounded bg-gray-200 focus:ring-0" required>
//               <option value=""> Governorate</option>
//               {Object.keys(governorates).map((gov) => (
//                 <option key={gov} value={gov}>{gov}</option>
//               ))}
//             </select>
//             <select name="bloodType" value={formData.bloodType} onChange={handleChange} className=" cursor-pointer w-[48%] p-2 border-none rounded bg-gray-200 focus:ring-0" required>
//               <option value="">Blood Type</option>
//               {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           {formData.governorate && (
//             <select name="city" value={formData.city} onChange={handleChange} className=" cursor-pointer w-full p-2 border rounded bg-gray-200" required>
//               <option value="">Select City</option>
//               {governorates[formData.governorate].map((city) => (
//                 <option key={city} value={city}>{city}</option>
//               ))}
//             </select>
//           )}
//           <div className=' relative'>
//             <input type="email" placeholder="Email" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
//             <MdOutlineMail className=' absolute text-[20px] text-gray-500 top-3 right-3' />
//           </div>
//           <div className=' relative'>
//             <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
//             <RiLockPasswordLine className='absolute text-[20px] text-gray-500 top-3 right-3' />
//           </div>
//         </div>
//         <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign Up</button>
//       </form>
//     </div>

//     {/* Sign In Form */}
//     <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isSignUp ? 'opacity-0 z-0 ' : 'opacity-100 z-10 '}`}>
//       <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full p-10">
//         <h1 className="text-2xl font-bold">Sign In</h1>
//         <span className="text-[18px]">or use your email password</span>
//         <div className="space-y-2 mt-2 w-full">
//           <div className=' relative'>
//             <input type="email" placeholder="Email" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
//             <MdOutlineMail className=' absolute text-[20px] text-gray-500 top-3 right-3' />
//           </div>
//           <div className=' relative'>
//             <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
//             <RiLockPasswordLine className='absolute text-[20px] text-gray-500 top-3 right-3' />
//           </div>
//         </div>
//         <a href="#" className="text-[14px] hover:text-red-600 duration-200 text-gray-500 mt-2">Forget Your Password?</a>
//         <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign In</button>
//       </form>
//     </div>

//     {/* Toggle Container */}
//     <div className={`absolute top-0 left-1/2 w-1/2 transition-all duration-700 h-full ${isSignUp ? '-translate-x-full' : ''}`}>
//       <div className={`bg-red-600 text-white flex flex-col items-center justify-center h-full px-10 text-center ${isSignUp ? 'rounded-r-[150px]' : 'rounded-l-[150px]'}`}>
//         <h1 className="text-2xl font-bold">{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
//         <p className="text-sm mt-2">{isSignUp ? 'Enter your details to use all features' : 'Register with your details to use all features'}</p>
//         <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 px-6 py-2 border border-white rounded-full hover:border-black duration-300">
//           {isSignUp ? 'Sign In' : 'Sign Up'}
//         </button>
//       </div>
//     </div>
//   </div>
// </div>