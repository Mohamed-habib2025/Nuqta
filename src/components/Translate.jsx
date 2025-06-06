import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

function Translate({ setIsChangingLanguage, setIsEditing }) {
  const { i18n } = useTranslation();

  const currentLang = i18n.language || 'en';
  const [selectedLang, setSelectedLang] = useState(currentLang);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  useEffect(() => {
    
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setSelectedLang(savedLang);
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    } else {
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [i18n, currentLang]);

  const handleSave = () => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
    document.documentElement.dir = selectedLang === 'ar' ? 'rtl' : 'ltr';

    setIsEditing(false);
    setIsChangingLanguage(false);
  };

  return (
    <div className='px-3 pt-4'>
      <div className='flex items-center gap-3'>
        <FaArrowLeft className='text-lg cursor-pointer' onClick={() => { setIsEditing(false); setIsChangingLanguage(false); }} />
        <span className='text-xl'>{i18n.t('change_language') || 'Change Language'}</span>
      </div>

      <div className='mt-4'>
        <ul className="space-y-3">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center justify-between p-2 border rounded-xl cursor-pointer 
              ${selectedLang === lang.code ? 'border-blue-500 bg-blue-50 dark:bg-blue-800' : 'border-gray-300'}
              transition-colors`}
            >
              <span className="text-lg">{lang.label}</span>
              {selectedLang === lang.code && <IoCheckmark className="text-blue-600 w-5 h-5" />}
            </li>
          ))}
        </ul>

        <button
          onClick={handleSave}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          {i18n.t('save') || 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Translate;
