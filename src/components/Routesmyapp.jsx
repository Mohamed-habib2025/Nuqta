import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import LoginPageOrganisation from '../pages/LoginPageOrganisation';
import BloodRequest from '../pages/BloodRequest';
import Donors from '../pages/Donors';
// import ProtectedRoute from './ProtectedRoute';
// import Landingpage from '../pages/Landing';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer';


function Routesmyapp() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/loginpageorganisation' element={<LoginPageOrganisation />} />
        <Route path='/bloodRequest' element={<BloodRequest />} />
        <Route path='/donors' element={<Donors />} />
      </Routes>
      <Banner />
      <Footer />
    </div>
  )
}

export default Routesmyapp
