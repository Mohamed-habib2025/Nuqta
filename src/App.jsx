import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom';
import "./index.css"
import Routesmyapp from './components/Routesmyapp';
import { fetchUserid } from './rtk/slices/userid';
import { useDispatch } from 'react-redux';

function App() {

  const { pathname } = useLocation();

  // localStorage.removeItem("orgaid")
  // localStorage.removeItem("organizationToken")
  // localStorage.removeItem("userid")
  // localStorage.removeItem("userToken")
  // localStorage.removeItem("scope")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();
  const [userId] = useState(localStorage.getItem('userid'));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserid(userId));
    }
  }, []);

  return (
    <div className="ubuntu-medium min-h-screen">
      <Routesmyapp />
    </div>

  )
}

export default App
