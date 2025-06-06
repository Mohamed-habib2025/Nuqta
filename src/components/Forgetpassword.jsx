import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { ForgotPassword, resetPassword, verifyOtp } from '../rtk/slices/ForgotPassword';
import { toast } from 'react-toastify';
import { ScaleLoader } from "react-spinners";

function Forgetpassword() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailerror, setemailerror] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Passworderror, setPassworderror] = useState(false);
  const [otperror, setotperror] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordrule, setPasswordrule] = useState(false);
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [successfully, setsuccessfully] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [counter, setCounter] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let timer;
    if (step === 2) {
      setIsResendDisabled(true);
      setCounter(60);

      timer = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  const resetForms = () => {
    navigate('/loginpage')
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setsuccessfully(false)
  };

  const passwordRules = [
    { text: "At least one number", regex: /\d/ },
    { text: "At least 10 characters", regex: /.{10,}/ },
    { text: "At least one uppercase letter", regex: /[A-Z]/ },
    { text: "At least one lowercase letter", regex: /[a-z]/ },
    { text: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  const isPasswordValid = passwordRules.every(rule => rule.regex.test(newPassword));

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (email === "") {
        setemailerror(1)
      } else {
        await dispatch(ForgotPassword(email)).unwrap();
      }
      setStep(2);
    } catch (error) {
      setemailerror(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setStep(1);
    setCounter(60);
    setIsResendDisabled(true);
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join("").trim();
    setIsLoading(true);
    try {
      if (enteredOtp) {
        await dispatch(verifyOtp({ email, otp: enteredOtp })).unwrap();
        setotperror(false);
        setStep(3);
      } else {
        setotperror(true);
      }
    } catch (error) {
      setotperror(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredOtp = otp.join("").trim();

    if (newPassword !== confirmPassword) {
      setPassworderror(true);
      return;
    } else {
      setPassworderror(false);
    }

    if (!isPasswordValid) {
      setPasswordrule(true);
      return;
    } else {
      setPasswordrule(false);
    }
    try {
      await dispatch(resetPassword({ email: email, otp: enteredOtp, newPassword })).unwrap();
      toast.success("changed password Successfully");
      setsuccessfully(true);
      resetForms();
      setTimeout(() => {
        setsuccessfully(false);
      }, 1000);
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-[90%] my-28 w-[85%] mx-auto flex items-center justify-center">

      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className='my-10'>
          <div className=" w-80 md:w-96 px-4 py-8 border border-gray-200 shadow-xl rounded-lg space-y-4">
            <h2 className=" text-center text-xl font-bold text-red-500">Forget Password</h2>
            <div className='flex items-center justify-center space-x-1'>
              <p className='text-gray-600'>Remember your password? </p>
              <Link to='/loginpage' className='text-red-600 hover:text-red-800 duration-200'> Login here</Link>
            </div>

            {
              (emailerror === 1) && (
                <div className=' my-3  bg-red-200 text-red-600 rounded p-2'>
                  you should enter your email
                </div>
              )
            }
            {
              (emailerror === 2) && (
                <div className=' my-3  bg-red-200 text-red-600 rounded p-2'>
                  Email not found
                </div>
              )
            }
            {
              (emailerror === 3) && (
                <div className=' my-3 bg-green-200 text-green-600 rounded p-2'>
                  setsuccessfully
                </div>
              )
            }


            <div className=' mb-2 border-b-[1px]'>
              <input
                disabled={isLoading}
                type="email"
                className="border-none p-2 w-full rounded focus:outline-none focus:ring-0"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-red-500 text-white p-2 w-full mt-2 rounded hover:bg-red-700 duration-200"
              type='submit'
            >
              {isLoading ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} /> :
                "Continue"}

            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className=" border border-gray-200 text-center  px-8 py-6 shadow-lg rounded-lg">
          <div className='flex items-center justify-between'>
            <h2 className=" text-red-600 text-xl font-bold mb-3">Enter OTP code</h2>
            <FaArrowRight onClick={() => setStep(1)} className=' cursor-pointer hover:text-red-600 duration-150 text-xl text-gray-600' />
          </div>
          <p className=' w-[90%] text-sm text-start text-gray-500'>Enter the 6-digit verification code that was sent to your email</p>

          {
            otperror && (
              <div className=' my-3  bg-red-200 text-red-600 rounded p-2'>
                the OTP code incorrect
              </div>
            )
          }

          <div className="flex justify-center gap-1 my-5" >
            {
              otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  className="border border-gray-300 p-2 w-10 h-10 text-center text-xl text-red-500 font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-none"
                  maxLength="1"
                  inputMode='numeric'
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))
            }
          </div>
          <button
            disabled={isLoading}
            className="bg-red-500 text-sm text-white p-2 w-[75%] mt-2 rounded hover:bg-red-700 duration-200"
            onClick={handleOtpSubmit}
          >
            {isLoading ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} /> :
              "Verify OTP"}

          </button>
          <div className=' mt-3 flex items-center justify-center space-x-1'>
            <p>Didn't receive code? </p>
            <button
              onClick={handleResend}
              className={`text-red-600 hover:text-red-800 duration-200 ${isResendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isResendDisabled}
            >
              Resend {isResendDisabled && `(${counter}s)`}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleChangePassword}>
          <div className="w-96 border border-gray-200 p-6 text-center bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">Reset password</h2>

            {
              Passworderror && (
                <div className=' my-3 bg-red-200 text-red-600 rounded p-2'>
                  the new password not equal confirm password
                </div>
              )
            }

            {
              passwordrule && (
                <div className=' my-3 bg-red-200 text-red-600 rounded p-2'>
                  All necessary conditions must be met.
                </div>
              )
            }
            {
              successfully && (
                <div className=' my-3 bg-green-200 text-green-600 rounded p-2'>
                  change password setsuccessfully
                </div>
              )
            }

            <div className=' w-full flex items-center justify-between mb-2 border-b-[1px]'>
              <input
                type={showPassword.new ? "text" : "password"}
                className="border-none p-2 w-[90%] rounded focus:outline-none focus:ring-0"
                placeholder="new password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); e.target.value.length > 0 ? setPasswordTouched(true) : setPasswordTouched(false) }}
              />
              <div className=' w-fit cursor-pointer' onClick={() => togglePasswordVisibility("new")}>
                <button type='button'>
                  {showPassword.new ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>
            <div className='w-full flex items-center justify-between mb-2 border-b-[1px]'>
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="border-none p-2 w-[90%] rounded focus:outline-none focus:ring-0"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordTouched(true); }}
              />
              <div className=' w-fit cursor-pointer' onClick={() => togglePasswordVisibility("confirm")}>
                <button type='button'>
                  {showPassword.confirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="bg-red-500 text-white p-2 w-[70%] mt-2 rounded"
              type='submit'
            >
              {isLoading ? <ScaleLoader color="#fff" height={15} width={2} radius={2} margin={2} /> :
                "change password"}
            </button>

            {
              passwordTouched &&
              <ul className="px-2 mt-6 text-sm text-start">
                {passwordRules.map((rule, index) => (
                  <li key={index} className={rule.regex.test(newPassword) ? "text-green-600" : "text-red-600"}>
                    {rule.text}
                  </li>
                ))}
              </ul>
            }
          </div>
        </form>
      )}

    </div>

  )
}

export default Forgetpassword
