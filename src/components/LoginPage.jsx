import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/login/send-code', { email });
      setIsCodeSent(true);
      alert("Verification code sent to your email.");
    } catch (error) {
      console.error("Failed to send verification code:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/verify-code', { email, code });
      const token = response.data.access_token;

      localStorage.setItem('access_token', token);

      onLogin(token);

      window.location.href = '/chat'; 
    } catch (error) {
      console.error("Code verification failed:", error);
      alert("Invalid code or server error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-3xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 rounded bg-gray-700 text-white"
      />
      {isCodeSent ? (
        <>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mb-4 p-2 rounded bg-gray-700 text-white"
          />
          <button onClick={handleVerifyCode} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mb-4">
            Verify Code
          </button>
        </>
      ) : (
        <button onClick={handleSendCode} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mb-4">
          Send Verification Code
        </button>
      )}

    </div>
  );
};

export default LoginPage;
