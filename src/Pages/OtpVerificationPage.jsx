import React, { useState, useEffect, useRef } from 'react';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';
import axios from 'axios';
import './LoginPage.css';

const OtpVerificationPage = ({ onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const inputRefs = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleVerify = () => {
    if (otp.trim() !== '') {
      onVerify(otp);
    }
  };
  const handleVerify1 = async () => {
    handleVerify();
    const enteredOtp = otp.join('');
    

    if (enteredOtp.length === 4) {
      try {
        const response = await axios.post('https://staging.fastor.in/v1/pwa/user/login', {
          dial_code: localStorage.getItem('previousDialCode'),
          phone: localStorage.getItem('previousNumber'),
          otp: enteredOtp,
        });

        if (response.data.success) {
          // onVerify1({ otp });

        } else {
          console.log('OTP verification failed');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    }
  };

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < otp.length - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  return (
    <div className="login-page-container">
      <div className="top-bar">
        <div className="time-and-icons">
          <div className="current-time">{currentTime}</div>
          <div className="icons">
            <FaSignal style={{ color: 'black' }} />
            <FaWifi style={{ color: 'black' }} />
            <FaBatteryFull style={{ color: 'black' }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40%", marginLeft: "1rem" }}>
        <h5 style={{ marginLeft: "4rem" }}>OTP Verification</h5>
        <p style={{ fontSize: "12px" }}>Enter the verification code we just sent on your Mobile Number.</p>
      </div>

      <div className="main-content1">
        <div style={{ display: 'flex', marginBottom: "1rem" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              placeholder="0"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={(input) => (inputRefs.current[index] = input)}
              style={{ width: '30px', marginRight: '5px' }}
            />
          ))}
        </div>
        <button onClick={handleVerify1}>Verify OTP</button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
