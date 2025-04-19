import React, { useEffect } from 'react'
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import governorates from "../Data/egyptLocations"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../rtk/slices/userSlice";
import { fetchUsers } from '../rtk/slices/usersSlice';
import { setUserToken } from '../rtk/slices/userSlice'

function LoginPage() {

  const navigate = useNavigate()


  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
    phoneNumber: "",
    gender: "",
    fcmToken: "abc123xyz",
    donation: {
      blood_type: "",
      donation_date: "",
      last_donation: "",
      amount: 0.5,
      payment_offered: true,
      status: null,
      weight: '',
      city: "",
      conservatism: ""
    },
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

    if (["blood_type", "donation_date", "last_donation", "amount", "payment_offered", "status", "weight", "city", "governorate"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        donation: {
          ...prev.donation,
          [name === 'governorate' ? 'conservatism' : name]: value,
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      console.log("🚀 Users from API:", users);
    }
  }, [users]);

  const { scope } = useSelector((state) => state.userType);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const AllFormData = {
      ...formData,
      scope: scope.toUpperCase(),
    };
    try {
      const res = await dispatch(registerUser(AllFormData)).unwrap();
      console.log("REGISTER SUCCESS:", res);
      setIsSignUp(false);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      if (res?.token) {
        dispatch(setUserToken(res.token));
        localStorage.setItem("userToken", res.token);
        navigate("/");
        console.log("LOGIN SUCCESS:", res);
      } else {
        console.error("Login failed, no token received.");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "An unknown error occurred.";
      console.error("LOGIN ERROR:", errorMessage);
    }
  };

  return (
    <div className={` w-full flex items-center justify-center sm:h-[720px]  ${isSignUp ? 'h-[650px]' : 'h-[550px] '}`}>
      <div className="relative w-[768px] sm:h-[70%] h-full bg-white rounded-3xl shadow-xl overflow-hidden mx-5">
        {/* Sign Up Form */}
        <div className={`absolute transition-all duration-700 bottom-0 sm:top-0 right-0 w-full sm:w-1/2 h-[70%] sm:h-full ${isSignUp ? 'opacity-100 ' : 'opacity-0 '}`}>
          <form onSubmit={handleSubmitRegister} className="flex flex-col items-center justify-center h-full p-5 sm:p-8">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <span className="text-[18px]">or use your email for registration</span>
            <div className="space-y-2 mt-2 w-full">
              <input type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChange} className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              <div className="flex justify-between w-full">
                <input type="date" name='birthDate' value={formData.birthDate} onChange={handleChange} className=" rounded text-gray-500 bg-gray-200 border-none w-[49%] p-2 focus:ring-0" required />
                <input type="number" name='weight' placeholder='Weight' value={formData.donation.weight} onChange={handleChange} className=" rounded bg-gray-200 border-none w-[49%] p-2 focus:ring-0" required />
              </div>
              <div className="flex items-center justify-between w-full space-x-2">
                <select name="governorate" value={formData.donation.conservatism} onChange={handleChange} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value=""> Governorate</option>
                  {Object.keys(governorates).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                {formData.donation.conservatism && (
                  <select name="city" value={formData.donation.city} onChange={handleChange} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                    <option value="">Select City</option>
                    {governorates[formData.donation.conservatism].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className='flex items-center justify-between w-full space-x-2'>
                <select name="blood_type" value={formData.donation.blood_type} onChange={handleChange} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Blood Type</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select name="gender" value={formData.gender} onChange={handleChange} className=" w-full cursor-pointer  p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Gender</option>
                  {["Male", "Female"].map((type) => (
                    <option key={type} value={type.toUpperCase()}>{type}</option>
                  ))}
                </select>
              </div>
              <div className=' py-2 px-2 bg-gray-200 rounded-lg'>
                <input type='number' name='phoneNumber' placeholder="Phone nummber" value={formData.phoneNumber} onChange={handleChange} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
              </div>
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} placeholder="Password" className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign Up</button>
            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute transition-all duration-700 top-0 left-0 w-full sm:w-1/2 h-[50%] sm:h-full ${isSignUp ? 'opacity-0 ' : 'opacity-100'}`}>
          <form onSubmit={handleSubmitLogin} className="flex flex-col items-center justify-center sm:h-full p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-[18px]">or use your email password</span>
            <div className="space-y-2 mt-2 w-full">
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' py-2 px-3 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' placeholder="Password" value={formData.password} onChange={handleChange} className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
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

