import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./index.css"
import Routesmyapp from './components/Routesmyapp';
import { useTranslation } from 'react-i18next';

function App() {

  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  // localStorage.removeItem("orgaid")
  // localStorage.removeItem("organizationToken")
  // localStorage.removeItem("userid")
  // localStorage.removeItem("userToken")
  // localStorage.removeItem("scope")
  // localStorage.removeItem("donatedRequest")
  // localStorage.removeItem("activeDonationId");


  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';

    i18n.changeLanguage(savedLang);

    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, [i18n]);

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
