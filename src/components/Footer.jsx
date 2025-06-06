import React from 'react'
import { FaMapLocation } from 'react-icons/fa6'
import { motion } from "framer-motion"
import { FaFacebook, FaGoogle, FaInstagram, FaPhone, FaTelegram } from 'react-icons/fa'
import { LuChevronsRight } from "react-icons/lu";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../Images/Nuqta Dark.png"
import { useTranslation } from 'react-i18next';

function Footer() {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user?.token);
  const orgToken = useSelector((state) => state.organization?.token);
  const token = userToken || orgToken;


  const handleProtectedRoute = (event, to) => {
    event.preventDefault();
    if (!token) {
      toast.warning("You need to login first to access this page.", {
        autoClose: 2000,
        hideProgressBar: true,
        className: "text-red-500 font-bold",
      });
    } else {
      navigate(to);
    }
  };

  return (
    <div dir="ltr" className=' py-5 bg-gray-100'>
      <div className=' w-[85%] mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className=' space-y-6'>
            <img src={logo} alt="logo" className=' w-20 md:w-24 rounded-lg ml-1' />
            <p className='text-gray-600 font-medium max-w-[300px]'>
              {t("footer_desc")}
            </p>
            <div>
              <p className='flex items-center gap-2 w-[220px] mb-2 text-gray-700'>
                <FaPhone className='text-[20px] text-red-600' /> +201234567892
              </p>
              <p className='flex items-center gap-2 w-[240px] text-gray-700'>
                <FaMapLocation className='text-[20px] text-red-600' /> {t("location")}
              </p>
            </div>
          </motion.div>

          <motion.div 
          
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            className='space-y-6'>
            <h1 className='text-3xl font-bold text-gray-800'> {t("quick_links")} </h1>
            <div className=' space-y-2'>
              <ul className='space-y-2 text-xl'>
                <li className='w-fit flex items-center space-x-2 cursor-pointer hover:text-red-600 hover:translate-x-2 duration-200 font-semibold'>
                  <LuChevronsRight />
                  <Link smooth to='/'>{t("Home")}</Link>
                </li>
                <li
                  className='w-fit flex items-center space-x-2 cursor-pointer hover:text-red-600 hover:translate-x-2 duration-200 font-semibold'>
                  <LuChevronsRight />
                  <Link smooth to='/#aboutus'>{t("About Us")}</Link>
                </li>
                <li
                  onClick={(e) => handleProtectedRoute(e, "/donors")}
                  className="w-fit flex items-center space-x-2 cursor-pointer hover:text-red-600 hover:translate-x-2 duration-200 font-semibold"
                >
                  <LuChevronsRight />
                  <span>{t("Donation")}</span>
                </li>
                <li
                  onClick={(e) => handleProtectedRoute(e, "/bloodRequest")}
                  className="w-fit flex items-center space-x-2 cursor-pointer hover:text-red-600 hover:translate-x-2 duration-200 font-semibold"
                >
                  <LuChevronsRight />
                  <span>{t("Request")}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
            }}
            className='space-y-6'>
            <h1 className='text-3xl font-bold text-gray-800'> {t("follow_us")} </h1>
            <div className=' flex items-center gap-3'>
              <FaFacebook className=' cursor-pointer text-black text-3xl hover:scale-110 hover:text-red-600 duration-300' />
              <FaInstagram className=' cursor-pointer text-black text-3xl hover:scale-110 hover:text-red-600 duration-300' />
              <FaTelegram className=' cursor-pointer text-black text-3xl hover:scale-110 hover:text-red-600 duration-300' />
              <FaGoogle className=' cursor-pointer text-black text-3xl hover:scale-110 hover:text-red-600 duration-300' />
            </div>
          </motion.div>
        </div>

        <p className=' text-center text-gray-700 mt-8 pt-8 border-t-2 border-gray-300 font-medium'>
          Nuqta. Together, we save lives. All rights reserved © 2025.
        </p>
      </div>
    </div>
  )
}

export default Footer
