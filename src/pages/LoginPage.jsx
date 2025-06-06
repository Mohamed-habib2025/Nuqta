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
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

import Swal from 'sweetalert2';
import { ScaleLoader } from "react-spinners";

function LoginPage() {

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scope } = useSelector((state) => state.userType);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      status: "VALID",
      weight: '',
      city: "",
      conservatism: "",
      confirmDonate: false
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

  // const handleBirthDateChange = (selectedDates) => {
  //   const dateObj = selectedDates[0];
  //   if (!dateObj) return;

  //   const formattedDate = format(dateObj, 'yyyy-MM-dd');

  //   setFormData((prev) => ({
  //     ...prev,
  //     birthDate: formattedDate,
  //   }));
  // };

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

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        text: (t('The phone number must be ...')),
      });
      return;
    }

    if (!scope) {
      toast.error(t('Please select a user type first'));
      return;
    }

    setIsLoading(true);

    const AllFormData = {
      ...formData,
      username: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      scope: scope,
    };
    try {
      const res = await dispatch(registerUser(AllFormData)).unwrap();
      toast.success(t('Registration Successful'));
      setIsSignUp(false);
      setTimeout(() => {
        Swal.fire({
          title: t("verify your email"),
          html: `<span style="color: #007BFF; margin: 15px 0; font-weight: bold;">${AllFormData.email}</span>`,
          icon: "info"
        });
      }, 500)
    } catch (error) {
      toast.error(`${error}`);
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
        toast.success(t('LOGIN Successful'), {
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
    <div className={` w-full flex items-center justify-center sm:h-[720px]  ${isSignUp ? 'h-[700px]' : 'h-[550px] '}`}>
      <div className="relative w-[768px] sm:h-[70%] h-full bg-white rounded-3xl shadow-xl overflow-hidden mx-3 mt-4 md:mt-0">
        {/* Sign Up Form */}
        <div className={` absolute transition-all duration-700 bottom-0 sm:top-0 right-0 w-full sm:w-1/2 h-[70%] sm:h-full ${isSignUp ? 'opacity-100 ' : 'opacity-0 hidden'}`}>
          <form onSubmit={handleSubmitRegister} className="flex flex-col items-center justify-center h-full p-3 sm:p-8">
            <h1 className="text-2xl font-bold mt-4">{t("Create Account")}</h1>
            <span className="text-[18px]">{t("or use your email for registration")}</span>
            <div className="space-y-2 mt-2 w-full">

              <div className="flex gap-2">
                <input type="text" name='firstName' placeholder={t("First Name")} value={formData.firstName} onChange={handleChangeregister} className="rounded bg-gray-200 border-none w-full p-2 focus:ring-0" required />
                <input type="text" name='lastName' placeholder={t("Last Name")} value={formData.lastName} onChange={handleChangeregister} className="rounded bg-gray-200 border-none w-full p-2 focus:ring-0" required />
              </div>

              <div className="flex items-center gap-2">
                <div dir={currentLang === 'ar' ? 'rtl' : 'ltr'} className="relative w-1/2 flex items-center ">
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChangeregister}
                    onClick={(e) => e.target.showPicker()}
                    required
                    className=" rounded bg-gray-200 border-none w-full p-2 focus:ring-0 cursor-pointer"
                  />
                  {!formData.birthDate && (
                    <span
                      className="absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none">
                      {t("Birth Date")}
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <input type="number" name="weight" min="60" placeholder={t("Weight")}
                    value={formData.donation.weight}
                    onChange={handleChangeregister}
                    className="w-full rounded bg-gray-200 border-none p-2 focus:ring-0 focus:outline-none focus:border-none" required
                  />
                </div>
              </div>

              <div className='flex gap-2'>
                <select name="blood_type" value={formData.donation.blood_type} onChange={handleChangeregister} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0  focus:text-black" required>
                  <option value="">{t("Blood Type")}</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select name="gender" value={formData.gender} onChange={handleChangeregister} className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0  focus:text-black" required>
                  <option value="">{t("Gender")}</option>
                  {["Male", "Female"].map((type) => (
                    <option key={type} value={type.toUpperCase()}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <select
                  name="conservatism"
                  value={formData.conservatism}
                  onChange={handleChangeregister}
                  className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0  focus:text-black"
                  required
                >
                  <option value="">{t('Governorate')}</option>
                  {Object.entries(governorates).map(([key, value]) => (
                    <option key={key} value={key}>{value.name[currentLang]}</option>
                  ))}

                </select>

                {formData.conservatism && (
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChangeregister}
                    className=" w-full cursor-pointer p-2 border-none rounded bg-gray-200 focus:ring-0  focus:text-black" required
                  >
                    <option value="">{t('City')}</option>
                    {governorates[formData.conservatism].cities.map((city, index) => (
                      <option key={index} value={city.en}>{city[currentLang]}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className=' py-2 px-2 bg-gray-200 rounded-lg'>
                <input type="tel" name='phoneNumber'
                  placeholder={t("Phone number")}
                  value={formData.phoneNumber}
                  onChange={handleChangeregister}
                  className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0"
                  required />
              </div>

              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder={t("Email")} value={formData.email} onChange={handleChangeregister} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>

              <div className=' p-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' value={formData.password} onChange={handleChangeregister} placeholder={t("Password")} className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="my-4 bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-800 duration-200 flex items-center justify-center min-h-[42px]">
              {
                isLoading
                  ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} />
                  : t("Sign Up")
              }
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute transition-all duration-700 top-0 left-0 w-full sm:w-1/2 h-[50%] sm:h-full ${isSignUp ? 'opacity-0 hidden' : 'opacity-100 '}`}>
          <form onSubmit={handleSubmitLogin} className="flex flex-col items-center justify-center mt-10 md:mt-0 sm:h-full p-5 md:p-10">
            <h1 className="text-2xl font-bold">{t('Sign In')}</h1>
            <span className="text-[18px] mt-2">{t('or use your email password')}</span>
            <div className="space-y-2 mt-2 w-full">
              <div className=' py-2 px-2 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type="email" name='email' placeholder={t('Email')} value={loginData.email} onChange={handleChangelogin} className="pl-1 rounded-lg bg-transparent border-none w-full p-0 focus:ring-0" required />
                <MdOutlineMail className='text-[20px] text-gray-500 ' />
              </div>
              <div className=' py-2 px-3 bg-gray-200 rounded-lg flex items-center justify-between'>
                <input type={showPassword.new ? "text" : "password"} name='password' placeholder={t('Password')} value={loginData.password} onChange={handleChangelogin} className=" bg-transparent p-0 border-none w-full focus:ring-0" required />
                <div className=' flex items-center justify-between w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                  <button className='text-gray-500' type='button'>
                    {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
              </div>
            </div>
            <Link to='/forgetpassword' className="text-[14px] hover:text-red-600 duration-200 text-gray-500 mt-2">{t('Forget Your Password')}</Link>
            <button
              disabled={isLoading}
              className="mt-3 bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-800 duration-200 flex items-center justify-center min-h-[42px]">
              {
                isLoading
                  ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} />
                  : t('Sign In')
              }
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute transition-all duration-700 transform ${isSignUp ?
          ' -translate-y-full sm:-translate-y-0 sm:-translate-x-full w-full sm:w-1/2 h-[30%] sm:h-full sm:left-1/2 top-[30%] sm:top-0'
          : ' translate-y-full sm:-translate-y-0 w-full sm:w-1/2 h-[30%] sm:h-full bottom-[30%] sm:top-0 sm:right-0'}`}>
          <div className={`bg-red-600 text-white flex flex-col items-center justify-center h-full px-10 text-center transition-all duration-500 ease-in-out ${isSignUp ? ' rounded-b-[100px] sm:rounded-none sm:rounded-r-[150px]' : ' rounded-t-[100px] sm:rounded-none sm:rounded-l-[150px]'}`}>
            <h1 className="text-2xl font-bold">{isSignUp ? t('Welcome Back!') : t('Hello, Friend!')}</h1>
            <p className="text-sm mt-2">{isSignUp ? t('Enter your details to use all features') : t('Register with your details to use all features')}</p>
            <button onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 px-6 py-2 border border-white rounded-full hover:border-black hover:bg-white hover:text-black transition-all duration-300"
            >
              {isSignUp ? t('Sign In') : t('Sign Up')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

{/* <input type="date" placeholder="Birth Date" name='birthDate' value={formData.birthDate} onChange={handleChangeregister} className=" rounded text-gray-500 bg-gray-200 border-none w-full p-2 focus:ring-0" required /> */ }

// const handleBirthDateChange = (selectedDates) => {
//   const dateObj = selectedDates[0];
//   if (!dateObj) return;

//   const formattedDate = dateObj.toISOString().split('T')[0];

//   setFormData((prev) => ({
//     ...prev,
//     birthDate: formattedDate,
//   }));
// };

{/* <Flatpickr
                    className=" rounded bg-gray-200 border-none w-full p-2 focus:ring-0 "
                    placeholder="Birth Date"
                    options={{
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                      altInput: true,
                      allowInput: true,
                    }}
                    value={formData.birthDate}
                    onChange={handleBirthDateChange}
                  /> */}