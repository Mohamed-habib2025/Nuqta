import React, { useEffect, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { changePasswordorg } from '../rtk/slices/orgid';

function ChangePasswordprofileorg({ setIsEditpassword, setOpenDialog }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: false,
    confirmPassword: false,
    samePassword: false,
    rules: false
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const newErrors = {
      oldPassword: false,
      confirmPassword: newPassword !== confirmPassword,
      samePassword: oldPassword === newPassword,
      rules: !isPasswordValid,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    const orgId = Number(localStorage.getItem('orgaid'));
    if (!orgId || isNaN(orgId)) {
      toast.error("User ID is missing or invalid");
      setIsLoading(false);
      return;
    }

    dispatch(changePasswordorg({ orgId, oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully");
        localStorage.removeItem('organizationToken');
        localStorage.removeItem('orgaid');
        navigate("/");
        setOpenDialog(false);
        setIsLoading(false);
      })
      .catch(() => {
        setErrors(prev => ({ ...prev, oldPassword: true }));
        setIsLoading(false);
      });
  };


  return (
    <div>
      <div className="space-y-4">
        <div className="sm:px-4 py-10 flex items-center justify-between">
          <div className='flex items-center gap-3'>
            <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setIsEditpassword(false)} />
            <span className='text-xl'>Change Password</span>
          </div>
          <button onClick={handleSubmit} >
            <GoCheck className=' cursor-pointer text-3xl text-[#212245] ' />
          </button>
        </div>

        {isLoading && <p className="px-2 text-green-400 ">Updating Password...</p>}

        {errors.oldPassword && <p className='text-red-600 px-2'>The old password is not correct!.</p>}
        {errors.confirmPassword && <p className='text-red-600 px-2'> new Password not equal old Password!</p>}
        {errors.samePassword && <p className='text-red-600 px-2'>Passwords must be different!</p>}
        {errors.rules && <p className='text-red-600 px-2'>Password doesn't meet requirements!</p>}

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

export default ChangePasswordprofileorg
