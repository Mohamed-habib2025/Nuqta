import React, { useEffect } from 'react'
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import governorates from "../Data/egyptLocations"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../rtk/slices/userSlice";
import { setUserToken } from '../rtk/slices/userSlice'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ScaleLoader } from "react-spinners";
// import { fetchUsers } from '../rtk/slices/usersSlice';

function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scope } = useSelector((state) => state.userType);

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

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangeregister = (e) => {
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

  const handleChangelogin = (e) => {
    const { name, value } = e.target;

    if (name === "email" || name === "password") {
      setLoginData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!scope) {
      toast.error("Please select a user type first.");
      return;
    }

    const AllFormData = {
      ...formData,
      scope: scope,
    };
    try {
      const res = await dispatch(registerUser(AllFormData)).unwrap();
      toast.success("Registration Successful");
      setIsSignUp(false);
      setTimeout(() => {
        Swal.fire({
          title: "verify your email",
          html: `A verification email was sent to <span style="color: #007BFF; margin: 15px 0; font-weight: bold;">${AllFormData.email}</span>`,
          icon: "info"
        });
      }, 500)
    } catch (error) {
      toast.error("REGISTER failed. Please try again");
      // console.error("REGISTER ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await dispatch(
        loginUser({
          email: loginData.email,
          password: loginData.password,
        })
      ).unwrap();
      if (res?.token) {
        dispatch(setUserToken(res.token));
        localStorage.setItem("userToken", res.token);
        navigate("/");
        toast.success("LOGIN Successful", {
          duration: 3000,
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("Login failed, Make sure your data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={` w-full flex items-center justify-center sm:h-[720px]  ${isSignUp ? 'h-[700px]' : 'h-[550px] '}`}>
      <div className="relative w-[768px] sm:h-[70%] h-full bg-white rounded-3xl shadow-xl overflow-hidden mx-3">
        {/* Sign Up Form */}
        <div className={`absolute transition-all duration-700 bottom-0 sm:top-0 right-0 w-full sm:w-1/2 h-[70%] sm:h-full ${isSignUp ? 'opacity-100 ' : 'opacity-0 hidden'}`}>
          <form onSubmit={handleSubmitRegister} className="flex flex-col items-center justify-center h-full p-3 sm:p-8">
            <h1 className="text-2xl font-bold mt-4">Create Account</h1>
            <span className="text-[18px]">or use your email for registration</span>
            <div className="space-y-2 mt-2 w-full">
              <input type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChangeregister} className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              <div className="flex justify-between gap-2 w-full">
                <input type="date" name='birthDate' value={formData.birthDate} onChange={handleChangeregister} className=" rounded text-gray-500 bg-gray-200 border-none w-1/2 min-w-[140px] p-2 focus:ring-0" required />
                <input type="number" name='weight' placeholder='Weight' value={formData.donation.weight} onChange={handleChangeregister} className=" rounded bg-gray-200 border-none w-1/2 min-w-[140px] p-2 focus:ring-0" required />
              </div>
              <div className="flex items-center justify-between w-full space-x-2">
                <select name="governorate" value={formData.donation.conservatism} onChange={handleChangeregister} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value=""> Governorate</option>
                  {Object.keys(governorates).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                {formData.donation.conservatism && (
                  <select name="city" value={formData.donation.city} onChange={handleChangeregister} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                    <option value="">Select City</option>
                    {governorates[formData.donation.conservatism].map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className='flex items-center justify-between w-full space-x-2'>
                <select name="blood_type" value={formData.donation.blood_type} onChange={handleChangeregister} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Blood Type</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select name="gender" value={formData.gender} onChange={handleChangeregister} className=" w-full cursor-pointer  p-2 border-none rounded bg-gray-200 focus:ring-0 text-gray-500 focus:text-black" required>
                  <option value="">Gender</option>
                  {["Male", "Female"].map((type) => (
                    <option key={type} value={type.toUpperCase()}>{type}</option>
                  ))}
                </select>
              </div>
              <div className=' py-2 px-2 bg-gray-200 rounded-lg'>
                <input type='number' name='phoneNumber' placeholder="Phone nummber" value={formData.phoneNumber} onChange={handleChangeregister} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
              </div>
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChangeregister} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' value={formData.password} onChange={handleChangeregister} placeholder="Password" className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            {/* <button className="mt-3 bg-red-600 text-white rounded-lg px-10 py-2 hover:bg-red-800 duration-200">Sign Up</button> */}
            <button
              disabled={isLoading}
              className="my-4 bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-800 duration-200 flex items-center justify-center min-h-[42px]">
              {
                isLoading
                  ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} />
                  : "Sign Up"
              }
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute transition-all duration-700 top-0 left-0 w-full sm:w-1/2 h-[50%] sm:h-full ${isSignUp ? 'opacity-0 hidden' : 'opacity-100 '}`}>
          <form onSubmit={handleSubmitLogin} className="flex flex-col items-center justify-center sm:h-full p-5 md:p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-[18px] ">or use your email password</span>
            <div className="space-y-2 mt-2 w-full">
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder="Email" value={loginData.email} onChange={handleChangelogin} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' py-2 px-3 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' placeholder="Password" value={loginData.password} onChange={handleChangelogin} className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <Link to='/forgetpassword' className="text-[14px] hover:text-red-600 duration-200 text-gray-500 mt-2">Forget Your Password?</Link>
            <button
              disabled={isLoading}
              className="mt-3 bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-800 duration-200 flex items-center justify-center min-h-[42px]">
              {
                isLoading
                  ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} />
                  : "Sign In"
              }
            </button>
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

