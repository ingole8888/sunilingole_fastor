import React, { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import OtpVerificationPage from './Pages/OtpVerificationPage';
import ProductPage from './Pages/ProductPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogin = (mobileNumber) => {
    setCurrentPage(2);
  };

  const handleVerify = (otp) => {
    setCurrentPage(localStorage.getItem('myCount'));
  };

  return (
    <div className="container">
      {currentPage === 1 && <LoginPage onLogin={handleLogin} />}
      {currentPage === 2 && <OtpVerificationPage onVerify={handleVerify} />}
      {currentPage === 3 && <ProductPage />}
    </div>
  );
};

export default App;
