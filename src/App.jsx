import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./index.css"
import Routesmyapp from './components/Routesmyapp';

function App() {

  const { pathname } = useLocation();

  // localStorage.removeItem("orgaid")
  // localStorage.removeItem("organizationToken")
  // localStorage.removeItem("userid")
  // localStorage.removeItem("userToken")
  // localStorage.removeItem("scope")
  // localStorage.removeItem("donatedRequest")
  // localStorage.removeItem("activeDonationId");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="ubuntu-medium min-h-screen">
      <Routesmyapp />
    </div>

  )
}

export default App
