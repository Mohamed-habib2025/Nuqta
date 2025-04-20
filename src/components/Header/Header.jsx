import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HashLink as Link } from "react-router-hash-link";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { Navbar } from "flowbite-react";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import "../../index.css"
import "./header.css"
import { useLocation } from 'react-router-dom';
import Profile from '../../pages/Profile';
import { FaRegUser, FaRegHospital } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { useSelector, useDispatch } from 'react-redux';
import { setUserType } from '../../rtk/slices/userTypeSlice';

function Header() {

  const usertyperequest = useSelector((state) => state.user.scope);
  const dispatch = useDispatch();

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Donate', to: '/donors', protected: true },
    {
      name: 'Request',
      to: usertyperequest === 'organization' ? '/RequstOrganization' : '/bloodRequest',
      protected: true
    },
    { name: 'About Us', to: '/#aboutus', smooth: true },
  ];

  const [openDialog, setOpenDialog] = useState(false)

  const handleProfileClick = () => {
    if (window.innerWidth >= 720) {
      setOpenDialog(true);
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setOpenDialog(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // start Active link 
  const Location = useLocation();
  const [activebtn, setActivebtn] = useState(Location.pathname);
  const getButtonClasses = (active) => (activebtn === active ? 'text-red-600' : '');

  useEffect(() => {
    setActivebtn(Location.pathname + Location.hash);
    Location.hash ? null : window.scrollTo({ top: 0, behavior: "smooth" });
  }, [Location.pathname, Location.hash]);
  // end Active link 

  const navigate = useNavigate();
  const headerRef = useRef(null)
  const [open, setopen] = useState(false)


  const handleLogin = () => {
    Swal.fire({
      title: "Select Account Type",
      text: "Choose 'User' if you want to donate or receive blood. Choose 'Organization' if you represent a blood bank or hospital.",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showDenyButton: true,
      confirmButtonText: ReactDOMServer.renderToString(
        <div className="flex items-center gap-2">
          <FaRegUser className="w-5 h-5" /> <span>User</span>
        </div>
      ),
      denyButtonText: ReactDOMServer.renderToString(
        <div className="flex items-center gap-2">
          <FaRegHospital className="w-5 h-5" /> <span>Organization</span>
        </div>
      ),
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300",
        denyButton: "bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300",
        cancelButton: "bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition-all duration-300",
        text: "text-2xl text-red-600",
        popup: "shadow-lg rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setUserType("user"));
        navigate("/loginpage");
      } else if (result.isDenied) {
        dispatch(setUserType("organization"));
        navigate("/loginpageorganisation");
      }
    });

  };

  const user = useSelector((state) => state.userid);
  const token = useSelector((state) => state.user.token);

  const handleProtectedRoute = (event, to, linkname) => {
    if (!token) {
      event.preventDefault();
      toast.warning("You need to login first to access this page.", {
        autoClose: 2000,
        hideProgressBar: true,
        className: "text-red-500 font-bold"
      });
    } else {
      navigate(to);
      setActivebtn(linkname)
    }
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 66) {
      headerRef.current?.classList.add("header_shrink");
    } else {
      headerRef.current?.classList.remove("header_shrink");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.1,
        }}
        ref={headerRef} >
        <Navbar className=' w-[85%] mx-auto pt-5 !px-0'>
          <Link to="/" className='flex flex-col items-center'>
            <span className="text-3xl font-semibold">Nu<span className=' text-red-600'>q</span>ta</span>
          </Link>
          <div className=' w-[50%] hidden lg:flex items-center justify-around'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={link.smooth}
                onClick={(e) => link.protected ? (handleProtectedRoute(e, link.to, link.name)) : setActivebtn(link.name)}
                className={`font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses(link.to)}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex">
            <div className=' flex items-center space-x-5 '>
              {user && token ?
                <div>
                  <CgProfile onClick={handleProfileClick} className=' cursor-pointer text-2xl' />
                </div>
                : <div>
                  <Link onClick={() => handleLogin()} className='block lg:hidden space-x-2 hover:text-red-600 duration-200'>
                    <FiLogIn className='inline-block cursor-pointer text-[22px]' />
                    <span>Login</span>
                  </Link>
                  <Link onClick={() => handleLogin()} className=' hidden lg:block border-2 border-red-600 rounded text-red-600 hover:text-white hover:bg-red-600 duration-300 px-5 sm:px-8 py-[2px] sm:py-1'> Login </Link>
                </div>
              }
              {/* toggle */}
              <div onClick={() => setopen(!open)} className=' block lg:hidden cursor-pointer'>
                <IoMenu className='text-3xl ' />
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
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth={link.smooth}
                    onClick={(e) => link.protected ? (handleProtectedRoute(e, link.to, link.name), setopen(!open)) : (setActivebtn(link.name), setopen(!open))}
                    className={`font-semibold md:mx-0 mx-auto my-2 md:mt-0 hover:text-red-600 duration-300 text-lg ${getButtonClasses(link.to)}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )
          }
        </AnimatePresence>


        <AnimatePresence>
          {openDialog && window.innerWidth >= 720 && (
            <motion.div
              initial={{ x: 480 }}
              whileInView={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{
                type: "spring",
                stiffness: 30,
              }}
              className=" w-full sm:w-[500px] h-screen bg-gray-100 shadow-lg rounded-l-3xl absolute top-0 right-0 z-[990]"
            >
              <Profile openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </motion.div>

          )}
        </AnimatePresence>


      </motion.div>
    </>

  )
}

export default Header
