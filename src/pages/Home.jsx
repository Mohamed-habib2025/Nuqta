import React from 'react'
import imagehero from "../Images/home-img.png"
import img1 from "../Images/Volaintear.png"
import img2 from "../Images/Donate.png"
import img3 from "../Images/Enchourage.png"
import { motion } from 'framer-motion';
import img from "../Images/factory.jpeg"
import { IoMail } from "react-icons/io5";

const AboutUsSection = [
  {
    id: 1,
    img: img1,
    title: "We Volunteer",
    description: "Donate experties donations food bags and equpments to loss privileged",
    AnimatTime: 0.4
  },
  {
    id: 2,
    img: img2,
    title: "We Donate",
    description: "Donate experties donations food bags and equpments to loss privileged",
    AnimatTime: 0.6
  },
  {
    id: 3,
    img: img3,
    title: "We Encourage",
    description: "Donate experties donations food bags and equpments to loss privileged",
    AnimatTime: 0.8
  },
]

function Home() {
  return (
    <div className='w-[85%] mx-auto my-12 '>
      {/* home */}
      <div className=' flex flex-col lg:flex-row items-center justify-between mb-8'>
        {/* content page */}
        <div className=' lg:w-[45%] space-y-8'>
          <motion.h4
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 100, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 50,
              delay: 0.2,
            }}
            className='text-red-600 text-2xl font-semibold'>
            Well Come Blood Donation Kohat
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 100, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 50,
              delay: 0.2,
            }}
            className=' lg:w-[80%] text-4xl font-bold leading-[1.5]'>
            Join the Life Saving Movement Donate Blood and Make a Differenc!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.2,
            }}
            className='text-gray-400 text-lg'>Welcome to donateblood.pk, Pakistan's premier blood donation website! Our platform is dedicated
            to connecting blood donors with individuals in need, providing a lifeline of hope and support to
            those requiring blood transfusions across the country.
          </motion.p>
          <div className=' space-x-4'>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 100, y: 0 }}
              transition={{
                type: "spring",
                damping: 45,
                delay: 0.2,
              }}
              className='btn-bg_red px-5 sm:px-10 py-2'>Donate blood</motion.button>
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 100, y: 0 }}
              transition={{
                type: "spring",
                damping: 45,
                delay: 0.6,
              }}
              className='border-[1px] btn-bor_red px-5 sm:px-11 py-2'>Blood Requests</motion.button>
          </div>
        </div>
        {/* image page */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 100, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 50,
            delay: 0.2,
          }}
          className='mt-10 lg:mt-0'>
          <img className=' max-w-[90%] animate-[movetop_3s_ease-in-out_infinite]' src={imagehero} alt="image hero" />
        </motion.div>
      </div>
      {/* About us */}
      <div id='aboutus' className='mt-36 scroll-mt-36'>
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 100, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 50,
            delay: 0.2,
          }}
          className='text-4xl font-bold text-red-600 '>We Heal lives</motion.h2>
        <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6'>
          {
            AboutUsSection.map((sec) => (
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 100, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 50,
                  delay: sec.AnimatTime,
                }}
                key={sec.id} className='text-center lg:text-left flex flex-col items-center lg:items-start gap-5 w-full'>
                <div className=' text-center flex flex-col md:flex-row items-center space-x-3'>
                  <img className='w-20' src={sec.img} alt={sec.title} />
                  <h2 className='text-xl font-bold text-[#710C12]'>{sec.title}</h2>
                </div>
                <p className='text-xl w-[80%]'>{sec.description}</p>
              </motion.div>
            ))
          }
        </div>

        <div className='mt-20 rounded-lg overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-0 '>
          {/* left */}
          <div className='lg:w-[50%] h-[500px] relative bg-[url("D:\web\Nuqta\src\Images\factory.jpeg")] bg-cover bg-center'>
            <div className=' p-5 bg-gray-50 w-[65%] h-[50%] sm:h-[35%] absolute bottom-0 right-0 space-y-3 border'>
              <h1 className='text-2xl'>Our Main Services</h1>
              <p className='text-sm text-gray-400 font-normal'>Allow users to register themselves as blood donoers.
                Collect necessary information such as name, contact details,
                blood type, and any medical conditions.
              </p>
            </div>
          </div>
          {/* right */}
          <div className='lg:w-[50%]'>
            <div className='bg-gray-50 px-5 md:px-10 py-5 space-y-2'>
              <h1 className='text-3xl'>Our Facilites</h1>
              <p className='text-[15px] text-gray-400 md:w-[60%] font-normal'>
                Support to these requiring blood transfusions across
                the country. Explain the steps involved in the donation
                process, from registration to past-donation refreshments and rest.
              </p>
            </div>
            <div className='w-full h-[66%] space-y-3 px-10 py-5 bg-red-600'>
              <h1 className='text-2xl text-white font-semibold'>Be a hero give a blood</h1>
              <p className='text-sm text-white md:w-[70%]'>
                Help us spread the word about the importance of blood donation,
                Share your donation experience on social media, encourage your
                friends and family to donate, and be a champion for our couse
              </p>
              <p className='text-sm text-white  md:w-[70%]'>
                On behalf of all those whose lives you'l touch with your generosity,
                we extend our heartfelt gratitude Together, we can create a healthier,
                brighter future for our communities
              </p>
              <div className='text-white'>
                <h1 className='text-2xl font-semibold mb-2'>Contact us today</h1>
                <div className='flex items-center space-x-2'>
                  <IoMail className='text-2xl' />
                  <span>nuqta@gmail.com</span>
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
