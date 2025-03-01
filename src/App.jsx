import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageOrganisation from './pages/LoginPageOrganisation';
import Header from './components/Header/Header';
import "./index.css"
import Home from './pages/Home';
import BloodRequest from './pages/BloodRequest';
import Donors from './pages/Donors';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="ubuntu-medium">
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

export default App
