import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import LoginPageOrganisation from '../pages/LoginPageOrganisation';
import BloodRequest from '../pages/BloodRequest';
import Donors from '../pages/Donors';
import ProtectedRoute from './ProtectedRoute';
import Landingpage from '../pages/Landing';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Footer from './Footer';


function Routesmyapp() {

  const user = false;
  
  return (
    <div>
      {user && <Header />}
      <Routes>
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/loginpageorganisation' element={<LoginPageOrganisation />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/bloodRequest' element={<BloodRequest />} />
        <Route path='/donors' element={<Donors />} />
        <Route path='/landingpage' element={<Landingpage />} />
      </Routes>
      {user && <Banner />}
      {user && <Footer />}
    </div>
  )
}

export default Routesmyapp
