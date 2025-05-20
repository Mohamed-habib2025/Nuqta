import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import Home from '../pages/Home';
import Footer from './Footer';
import React from 'react'


function PrivateRoute({ children }) {

  const userToken = useSelector((state) => state.user.token);
  const orgToken = useSelector((state) => state.organization.token);

  const token = userToken || orgToken ;

  return token ? children : <Navigate to="/loginpage" />;
}

function Routesmyapp() {

  const location = useLocation();
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
