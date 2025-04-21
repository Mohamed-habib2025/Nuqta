
import React, { useEffect, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { changePassword } from '../rtk/slices/userid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ChangePasswordprofile({ setIsEditpassword , setOpenDialog }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [erroroldPassword, seterroroldPassword] = useState(false);
  const [errorconfirmPassword, seterrorconfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const passwordRules = [
    { text: "At least 10 characters", regex: /.{10,}/ },
    { text: "At least one uppercase letter", regex: /[A-Z]/ },
    { text: "At least one lowercase letter", regex: /[a-z]/ },
    { text: "At least one number", regex: /\d/ },
    { text: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  const isPasswordValid = passwordRules.every(rule => rule.regex.test(newPassword));

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  const handleSelectChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      seterrorconfirmPassword(true);
    } else {
      seterrorconfirmPassword(false);
    }

    if (!isPasswordValid) {
      toast.error("New password does not meet the requirements");
      return;
    }

    try {
      dispatch(changePassword({
        oldPassword,
        newPassword
      })).unwrap();

      toast.success("Password changed successfully");
      localStorage.removeItem('userToken');
      localStorage.removeItem('userid');
      navigate("/loginpage");
      setOpenDialog(false);
    } catch (error) {
      console.log(error.message)
      seterroroldPassword(true);
    }
  }

return (
  <div>

    <div className="space-y-4">

      <div className="sm:px-4 py-10 flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditpassword(false)} />
          <span className='text-xl'>Change Password</span>
        </div>
        <button onClick={handleSelectChange} >
          <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
        </button>
      </div>

      {
        erroroldPassword && (<p className='text-red-600 px-2'>The old password is not correct!.
        </p>)
      }
      {
        errorconfirmPassword && (<p className='text-red-600 px-2'>  The new password is not equal confirm password !</p>)
      }

      <div className=' flex items-center justify-between border-b-[1px]'>
        <input
          type={showPassword.old ? "text" : "password"}
          placeholder='old Password'
          onChange={(e) => setOldPassword(e.target.value)}
          className=" w-[70%] py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none"
          required
        />
        <div className='w-fit  cursor-pointer' onClick={() => togglePasswordVisibility("old")}>
          <button type='button'>
            {showPassword.old ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
      </div>

      <div className=' w-full flex items-center justify-between border-b-[1px]'>
        <input
          type={showPassword.new ? "text" : "password"}
          placeholder='New Password'
          onChange={(e) => { setNewPassword(e.target.value); setPasswordTouched(true) }}
          className=" w-[90%] py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none"
          required
        />
        <div className=' w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
          <button type='button'>
            {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
      </div>

      <div className=' flex items-center justify-between border-b-[1px]'>
        <input
          type={showPassword.confirm ? "text" : "password"}
          placeholder='confirm Password'
          onChange={(e) => setconfirmPassword(e.target.value)}
          className=" w-[90%] py-2 border-none bg-transparent font-normal focus:ring-0 focus:outline-none"
          required
        />
        <div className=' w-fit cursor-pointer' onClick={() => togglePasswordVisibility("confirm")}>
          <button type='button'>
            {showPassword.confirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>
      </div>
    </div>

    {
      passwordTouched &&
      <ul className="px-2 mt-6 text-sm">
        {passwordRules.map((rule, index) => (
          <li key={index} className={rule.regex.test(newPassword) ? "text-green-600" : "text-red-600"}>
            {rule.text}
          </li>
        ))}
      </ul>
    }
  </div>
)
}

export default ChangePasswordprofile
