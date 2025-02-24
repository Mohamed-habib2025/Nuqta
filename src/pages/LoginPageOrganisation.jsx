import React from 'react'
import { useState } from "react";


function LoginPageOrganisation() {

  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className='w-full mx-auto h-[670px] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200'>
      <div className="relative w-[768px] min-h-[70%] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Sign Up Form */}
        <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isSignUp ? 'opacity-100 z-10 ' : 'opacity-0 z-0 '}`}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center h-full p-10">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <span className="text-[18px]">or use your email for registration</span>
            <div className="space-y-2 mt-2 w-full">
              <input type="text" placeholder="Organization Name" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <input type="number" placeholder="License Number" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <input type="email" placeholder="Email" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <select className=" cursor-pointer text-gray-500 rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0">
                <option>Location</option>
              </select>
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
              <input type="email" placeholder="Email or License Number" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
              <input type="password" placeholder="Password" className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" />
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
