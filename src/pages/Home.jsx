import React, { useEffect, useState } from 'react'
import imagehero from "../Images/home-img.png"
import img1 from "../Images/Volaintear.png"
import img2 from "../Images/Donate.png"
import img3 from "../Images/Enchourage.png"
import { motion } from 'framer-motion';
import { IoMail } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { fetchUsers } from '../rtk/slices/usersSlice'
import { fetchOrganizations } from '../rtk/slices/organizationsSlice'


function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const AboutUsSection = [
    {
      id: 1,
      img: img1,
      title: t("We Volunteer"),
      description: t("we_volunteer_description"),
      AnimatTime: 0.4
    },
    {
      id: 2,
      img: img2,
      title: t("We Donate"),
      description: t("we_Donate_description"),
      AnimatTime: 0.6
    },
    {
      id: 3,
      img: img3,
      title: t("We Encourage"),
      description: t("we_Encourage_description"),
      AnimatTime: 0.8
    },
  ]

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchOrganizations());
  // }, [dispatch]);

  const Token = localStorage.getItem("userToken") || localStorage.getItem("organizationToken");
  // const scope = localStorage.getItem("scope")

  const handleProtectedRoute = (e, to) => {
    if (!Token) {
      e.preventDefault();
      toast.warning(t("You need to login first to access this page"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: "text-red-500 font-bold"
      });
    } else {
      navigate(to);
    }
  };

  return (
    <div>
      <div className='w-[85%] mx-auto my-5 '>
        {/* home */}
        <div className=' flex flex-col lg:flex-row items-center justify-between my-8'>
          {/* content page */}
          <div className=' lg:w-[45%] space-y-8'>
            <motion.h4
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 50,
                delay: 0.2,
              }}
              className='text-red-600 text-2xl font-semibold'>
              {t('Well Come Blood Donation Nuqta')}
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 50,
                delay: 0.2,
              }}
              className=' lg:w-[80%] text-4xl font-bold leading-[1.5]'>
              {t('Join the Life ...')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.2,
              }}
              className='text-gray-400 text-lg'>
              {t("Welcome to Nuqta, Egypt's ...")}
            </motion.p>

            <div className='flex gap-2'>
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  delay: 0.2,
                }}
                className='btn-bg_red px-5 sm:px-10 py-2'
                onClick={(e) => handleProtectedRoute(e, '/donors')}
              >{t('Donate blood')}</motion.button>
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  delay: 0.4,
                }}
                className='border-[1px] btn-bor_red px-5 sm:px-11 py-2'
                onClick={(e) => handleProtectedRoute(e, '/bloodRequest')}
              >{t('Blood Requests')}</motion.button>
            </div>
          </div>
          {/* image page */}
          <div
            className='mt-10 lg:mt-0'>
            <img className=' max-w-[90%] animate-[movetop_3s_2s_ease-in-out_infinite]' src={imagehero} alt="image hero" />
          </div>
        </div>
        {/* About us */}
        <div id='aboutus' className='mt-36 scroll-mt-36'>
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 50,
              delay: 0.2,
            }}
            className='text-4xl font-bold text-red-600 '>{t("We Heal lives")}</motion.h2>
          <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6'>
            {
              AboutUsSection.map((sec) => (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 50,
                    delay: sec.AnimatTime,
                  }}
                  key={sec.id} className=' mb-16 text-center lg:text-left flex flex-col items-center lg:items-start gap-5 w-full'>
                  <div className=' text-center flex flex-col md:flex-row items-center gap-3'>
                    <img className='w-20' src={sec.img} alt={sec.title} />
                    <h2 className='text-xl font-bold text-[#710C12]'>{sec.title}</h2>
                  </div>
                  <p className='text-xl text-center w-[80%]'>{sec.description}</p>
                </motion.div>
              ))
            }
          </div>

          <div className='mt-20 rounded-lg overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-0 lg:h-[500px]'>
            {/* left */}
            <div className='lg:w-[50%] lg:h-full h-[300px] relative bg-[url("D:/web/Nuqta/src/Images/factory.jpeg")] bg-cover bg-center'>
              <div className='p-4 bg-gray-50 w-[65%] h-fit absolute bottom-0 right-0 space-y-3 border'>
                <h1 className='text-2xl'>{t('our_facilities')}</h1>
                <p className='text-sm lg:text-[17px] text-gray-400 font-normal leading-5 md:leading-6'>
                  {t('our_facilities_desc')}
                </p>
              </div>
            </div>

            {/* right */}
            <div className=' bg-gray-100 lg:w-[50%] lg:h-full flex flex-col justify-between '>
              <div className=' px-5 md:px-10 py-5 space-y-2'>
                <h1 className='text-3xl xl:mt-9'>{t('our_facilities')}</h1>
                <p className='text-[15px] text-gray-400 lg:w-[80%] font-normal'>
                  {t('our_facilities_desc')}
                </p>
              </div>

              <div className='w-full px-5 md:px-10 py-5 bg-red-600 space-y-2'>
                <h1 className='text-2xl text-white font-semibold'>{t('be_hero')}</h1>
                <p className='text-sm text-white lg:w-[90%] '>
                  {t('be_hero_desc_1')}
                </p>
                <p className='text-sm text-white lg:w-[90%]'>
                  {t('be_hero_desc_2')}
                </p>
                <div className='text-white'>
                  <h1 className='text-2xl font-semibold mb-2'>{t('contact_us_today')}</h1>
                  <div className='flex items-center space-x-2'>
                    <IoMail className='text-2xl' />
                    <span>nuqta.help@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
