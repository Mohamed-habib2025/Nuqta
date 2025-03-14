import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import LoginPageOrganisation from '../pages/LoginPageOrganisation';
import BloodRequest from '../pages/BloodRequest';
import Donors from '../pages/Donors';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer';
import Profile from '../pages/Profile';



function Routesmyapp() {

  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";


  return (
    <div>
      {!isProfilePage && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/loginpageorganisation' element={<LoginPageOrganisation />} />
        <Route path='/bloodRequest' element={<BloodRequest />} />
        <Route path='/donors' element={<Donors />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {!isProfilePage && <Banner />}
      {!isProfilePage && <Footer />}
    </div>
  )
}

export default Routesmyapp
