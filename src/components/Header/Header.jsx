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
import logo from "../../Images/Nuqta Dark.png"
import { useTranslation } from 'react-i18next';

function Header() {

  const { t } = useTranslation();


  const usertyperequest = useSelector((state) => state.userType.scope);
  const userToken = useSelector((state) => state.user?.token);
  const orgToken = useSelector((state) => state.organization?.token);
  const token = userToken || orgToken;
  const dispatch = useDispatch();

  const navLinks = [
    { name: t('Home'), to: '/' },
    { name: t('Donation'), to: '/donors', protected: true },
    {
      name: t('Request'),
      to: usertyperequest === 'ORGANIZATION' ? '/RequstOrganization' : '/bloodRequest',
      protected: true
    },
    { name: t('About Us'), to: '/#aboutus', smooth: true },
  ];


  const [openDialog, setOpenDialog] = useState(false)


  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 620);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 620);
      if (window.innerWidth < 620) {
        setOpenDialog(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfileClick = () => {

    if (!token) {
      return;
    }

    if (isLargeScreen) {
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

  const getButtonClasses = (active) => {
    return (navLinks && navLinks.length > 0 && activebtn === active) ? 'text-red-600' : '';
  };

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
      title: t("Select Account Type"),
      text: t("Choose user or organization"),
      icon: "info",
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      showDenyButton: true,
      scrollbarPadding: false,
      confirmButtonText: ReactDOMServer.renderToString(
        <div className="flex items-center gap-2">
          <FaRegUser className="w-5 h-5" /> <span>{t("User")}</span>
        </div>
      ),
      denyButtonText: ReactDOMServer.renderToString(
        <div className="flex items-center gap-2">
          <FaRegHospital className="w-5 h-5" /> <span>{t("Organization")}</span>
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
        dispatch(setUserType("USER"));
        localStorage.setItem("scope", "USER");
        navigate("/loginpage");
      } else if (result.isDenied) {
        dispatch(setUserType("ORGANIZATION"));
        localStorage.setItem("scope", "ORGANIZATION");
        navigate("/loginpageorganisation");
      }
    });
  };



  const handleProtectedRoute = (event, to, linkname) => {
    if (!token) {
      event.preventDefault();
      toast.warning(t("You need to login first to access this page"), {
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
        <Navbar dir="ltr" className=' w-[85%] mx-auto pt-5 !px-0'>
          <Link to="/" className='flex flex-col items-center'>
            {/* <span className="text-3xl font-semibold">Nu<span className=' text-red-600'>q</span>ta</span> */}
            <img src={logo} alt="logo" className=' w-20 md:w-24 rounded-lg ml-1' />
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
            <div className=' flex items-center gap-3 '>
              {token ?
                <div>
                  <CgProfile onClick={handleProfileClick} className=' cursor-pointer text-2xl' />
                </div>
                : <div>
                  <Link onClick={() => handleLogin()} className='block lg:hidden space-x-2 hover:text-red-600 duration-200'>
                    <FiLogIn className='inline-block cursor-pointer text-[22px]' />
                    <span>{t('login')}</span>
                  </Link>
                  <Link onClick={() => handleLogin()} className=' hidden lg:block border-2 border-red-600 rounded text-red-600 hover:text-white hover:bg-red-600 duration-300 px-5 sm:px-4 py-[2px] sm:py-1'> {t('login')} </Link>
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
          {openDialog && (
            <motion.div
              initial={{ x: 450 }}
              whileInView={{ x: 0 }}
              exit={{ x: 470 }}
              transition={{
                type: "spring",
                stiffness: 30,
              }}
              className=" w-full sm:w-[470px] h-screen bg-gray-100 shadow-lg rounded-l-3xl absolute top-0 right-0 z-[990]"
            >
              <Profile setOpenDialog={setOpenDialog} />
            </motion.div>

          )}
        </AnimatePresence>


      </motion.div>
    </>

  )
}

export default Header
