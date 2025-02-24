import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageOrganisation from './pages/LoginPageOrganisation';
import Header from './components/Header/Header';
import "./index.css"
import Home from './pages/Home';

function App() {

  return (
    <div className="ubuntu-medium">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/loginpageorganisation' element={<LoginPageOrganisation />} />
      </Routes>
    </div>

  )
}

export default App
