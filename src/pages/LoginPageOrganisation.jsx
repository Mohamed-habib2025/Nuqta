import React, { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import governorates from "../Data/egyptLocations"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerOrg, loginOrg, setorgToken } from '../rtk/slices/orgSlice';
import { toast } from 'react-toastify';
import { ScaleLoader } from "react-spinners";
import Swal from 'sweetalert2';

function LoginPageOrganisation() {

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { scope } = useSelector((state) => state.userType);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    city: '',
    conservatism: '',
    phoneNumber: '',
    licenseNumber: '',
    scope: '',
    fcmToken: "abc123xyz"
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

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

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


  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        text: 'The phone number must be 11 digits long and start with 010, 011, 012, 015 etc.',
      });
      return;
    }

    if (!scope) {
      toast.error("Please select a user type first.");
      return;
    }

    setIsLoading(true);

    const AllFormData = {
      ...formData,
      scope: scope.toUpperCase(),
    };

    try {
      const res = await dispatch(registerOrg(AllFormData)).unwrap();
      toast.success("Registration Successful");
      console.log("REGISTER SUCCESS:", res);
      setIsSignUp(false);
      setTimeout(() => {
        Swal.fire({
          title: "verify your email",
          html: `A verification email was sent to <span style="color: #007BFF; font-weight: bold;">${AllFormData.email}</span>`,
          icon: "info"
        });
      }, 500)
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await dispatch(loginOrg({
        email: loginData.email,
        password: loginData.password
      })).unwrap();
      if (res?.token) {
        dispatch(setorgToken(res.token));
        localStorage.setItem("organizationToken", res.token);
        Navigate("/");
        toast.success("LOGIN Successful", {
          duration: 3000,
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={` w-full flex items-center justify-center sm:h-[720px] ${isSignUp ? 'h-[700px]' : 'h-[550px] '}`}>
      <div className="relative w-[768px] sm:h-[70%] h-full bg-white rounded-3xl shadow-xl overflow-hidden mx-3 mt-4 md:mt-0">
        {/* Sign Up Form */}
        <div className={`absolute transition-all duration-700 bottom-0 sm:top-0 right-0 w-full sm:w-1/2 h-[70%] sm:h-full ${isSignUp ? 'opacity-100 ' : 'opacity-0 hidden'}`}>
          <form onSubmit={handleSubmitSignUp} className="flex flex-col items-center justify-center h-full px-5 sm:px-8">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <span className="text-[17px] font-bold text-gray-800">or use your email for registration</span>
            <div className="space-y-2 mt-3 w-full">
              <input type="text" name='orgName' placeholder="Organization Name" value={formData.orgName} onChange={handleChangeregister} className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              <input type="number" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChangeregister} className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChangeregister} className="rounded-lg bg-gray-200 border-none w-full p-2 focus:ring-0" required />

              <select name="conservatism" value={formData.conservatism} onChange={handleChangeregister} className=" cursor-pointer w-full p-2 border-none rounded bg-gray-200 focus:ring-0 focus:text-black" required>
                <option value=""> conservatism</option>
                {Object.keys(governorates).map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              {formData.conservatism && (
                <select name="city" value={formData.city} onChange={handleChangeregister} className=" cursor-pointer w-full p-2 border-none rounded bg-gray-200 focus:ring-0 focus:text-black" required>
                  <option value="">Select City</option>
                  {governorates[formData.conservatism].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              )}
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChangeregister} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChangeregister} className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="mt-3 bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-800 duration-200 flex items-center justify-center min-h-[42px]">
              {
                isLoading
                  ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} />
                  : "Sign Up"
              }
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute transition-all duration-700 top-0 left-0 w-full sm:w-1/2 h-[50%] sm:h-full ${isSignUp ? 'opacity-0 hidden' : 'opacity-100'}`}>
          <form onSubmit={handleSubmitSignIn} className="flex flex-col items-center justify-center mt-10 md:mt-0 sm:h-full p-5 md:p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-[18px]">or use your email password</span>
            <div className="space-y-2 mt-2 w-full  ">
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChangelogin} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name="password" value={loginData.password} onChange={handleChangelogin} placeholder="Password" className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
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

export default LoginPageOrganisation;