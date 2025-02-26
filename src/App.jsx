import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageOrganisation from './pages/LoginPageOrganisation';
import Header from './components/Header/Header';
import "./index.css"
import Home from './pages/Home';
import BloodRequest from './pages/BloodRequest';
import Donors from './pages/Donors';

function App() {

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
    </div>

  )
}

export default App
