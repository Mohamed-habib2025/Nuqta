import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from "react-router-hash-link";
import { IoMenu } from "react-icons/io5";
import { Navbar } from "flowbite-react";
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import Swal from 'sweetalert2';

import "./header.css"
import "../../index.css"

function Header() {


  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    Swal.fire({
      title: 'Select account type',
      text: 'Are you a regular user or an organization?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'User',
      cancelButtonText: 'Organization',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg mr-2',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setUserType('user');
        navigate('/loginpage')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setUserType('organization');
        navigate('loginpageorganisation')
      }
    });
  };

  const headerRef = useRef(null)
  const [open, setopen] = useState(false)

  function navscroll() {

    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("header_shrink");
      } else {
        headerRef.current?.classList.remove("header_shrink");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }

  useEffect(() => {
    navscroll()
  }, []);


  // start Active link 
  const [activebtn, setActivebtn] = useState("home");
  function getButtonClasses(active) {
    return activebtn === active ? " text-red-600 " : "";
  }
  // end Active link 

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.1,
        }}
        ref={headerRef} >
        <Navbar className='w-[85%] mx-auto pt-5'>
          <Link to="/" className='flex flex-col items-center'>
            <span className="text-3xl font-semibold">Nu<span className=' text-red-600'>q</span>ta</span>
          </Link>
          <div className=' w-[50%] hidden lg:flex items-center justify-around'>
            <Link to="/" onClick={() => setActivebtn("home")} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('home')}`}>
              Home
            </Link>
            <Link onClick={() => setActivebtn("Donars")} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('Donars')}`} >Donars</Link>
            <Link onClick={() => setActivebtn("Blood Requests")} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('Blood Requests')}`} >Blood Requests</Link>
            <Link smooth to='#aboutus' onClick={() => setActivebtn("About Us")} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('About Us')}`} >About Us</Link>
          </div>

          <div className="flex">
            <div className=' flex items-center space-x-2 '>
              <Link onClick={() => handleLogin()} className='block lg:hidden '>
                <AiOutlineUser className=' cursor-pointer text-[22px]' />
              </Link>
              <Link onClick={() => handleLogin()} className=' hidden lg:block border-2 border-red-600 rounded text-red-600 hover:text-white hover:bg-red-600 duration-300 px-5 sm:px-8 py-[2px] sm:py-1'> Login </Link>
              {/* <Link className='btn-bor_red border-[2px] px-2 sm:px-4 sm:py-1'> Register </Link> */}
              {/* toggle */}
              <div onClick={() => setopen(!open)} className=' block lg:hidden cursor-pointer'>
                <IoMenu className='text-2xl ' />
              </div>
            </div>
          </div>
        </Navbar>

        <AnimatePresence>
          {
            open && (
              <motion.div
                initial={{ x: 200 }}
                whileInView={{ x: 0 }}
                exit={{ x: 220 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                }}
                className=' w-[220px] bg-gray-50 shadow-lg duration-200 border-l-[1px] rounded-3xl absolute top-0 right-0 lg:hidden flex flex-col items-center justify-center space-y-7 h-screen z-[900]' >
                <IoMdClose onClick={() => setopen(!open)} className=' absolute top-10 text-2xl cursor-pointer' />
                <Link to="/" onClick={() => { setopen(!open); setActivebtn("home") }} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('home')}`}>
                  Home
                </Link>
                <Link to="" onClick={() => { setopen(!open); setActivebtn("Donars") }} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('Donars')}`} >Donars</Link>
                <Link to="" onClick={() => { setopen(!open); setActivebtn("Blood Requests") }} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('Blood Requests')}`} >Blood Requests</Link>
                <Link smooth to='#aboutus' onClick={() => { setopen(!open); setActivebtn("About Us") }} className={` font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses('About Us')}`} >About Us</Link>
              </motion.div>
            )
          }
        </AnimatePresence>

      </motion.div>
    </div>

  )
}

export default Header
