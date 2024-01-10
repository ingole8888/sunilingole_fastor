// LoginPage.js
import React, { useState, useEffect } from 'react';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogin = () => {
        if (mobileNumber.trim() !== '') {
            const apiEndpoint = 'https://staging.fastor.in/v1/pwa/user/register';
            const requestData = {
                phone: mobileNumber,
                dial_code: '+91',
            };
            localStorage.setItem("previousDialCode", requestData.dial_code )
            localStorage.setItem("previousNumber", requestData.phone)
            axios.post(apiEndpoint, requestData)
                .then(response => {
                    console.log(response.data);
                    onLogin({ mobileNumber, dialCode: '+91' });
                })
                .catch(error => {
                    console.error('API error:', error);
                });
        }
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

            <div style={{ marginTop: "40%" }}>
                <h5>Enter Your Mobile Number</h5>
                <p style={{ fontSize: "12px" }}>We will send you the 4 digit verification conde</p>
            </div>

            <div class="main-content1">
                <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onInput={(e) => setMobileNumber(e.target.value)}
                />
                <button onClick={handleLogin}>Get OTP</button>
            </div>
        </div>
    );
};

export default LoginPage;
