import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import LoginPageOrganisation from '../pages/LoginPageOrganisation';
import BloodRequest from '../pages/BloodRequest';
import { ToastContainer } from "react-toastify";
import Forgetpassword from './Forgetpassword';
import RequstOrga from '../pages/RequstOrga';
import LoginPage from '../pages/LoginPage';
import { useSelector } from 'react-redux';
import Profile from '../pages/Profile';
import Donors from '../pages/Donors';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import {jwtDecode} from "jwt-decode";
import Home from '../pages/Home';
import Footer from './Footer';
import React, { useEffect } from 'react'


function PrivateRoute({ children }) {

  const userToken = useSelector((state) => state.user.token);
  const orgToken = useSelector((state) => state.organization.token);

  const token = userToken || orgToken;

  return token ? children : <Navigate to="/loginpage" />;
}

function Routesmyapp() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || localStorage.getItem("organizationToken");
    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userid");
        localStorage.removeItem("organizationToken");
        localStorage.removeItem("orgaid");
        navigate("/loginpage");
      }
    }
  }, []);



  if (!location.pathname) return null;
  const isProfilePage = location.pathname === "/profile";

  return (
    <div>
      {!isProfilePage && <Header />}
      <ToastContainer position="top-right" />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/loginpageorganisation' element={<LoginPageOrganisation />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        <Route path='/bloodRequest' element={<BloodRequest />} />
        <Route path='/RequstOrganization' element={<RequstOrga />} />
        <Route path='/donors' element={<Donors />} />

        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

      </Routes>
      {!isProfilePage && <Banner />}
      {!isProfilePage && <Footer />}
    </div >
  )
}

export default Routesmyapp
