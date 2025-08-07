"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthSystem() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'emailOTP', 'resetOTP'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentView === 'login') {
      console.log('Login:', formData);
      // Simulate login process
    } else if (currentView === 'signup') {
      console.log('Signup:', formData);
      // Simulate signup and redirect to email verification
      setCurrentView('emailOTP');
    } else if (currentView === 'emailOTP') {
      console.log('Email OTP:', otp.join(''));
      // Handle email verification
    } else if (currentView === 'resetOTP') {
      console.log('Reset OTP:', otp.join(''));
      // Handle password reset verification
    }
  };

  const handleForgotPassword = () => {
    setCurrentView('resetOTP');
    setOtp(['', '', '', '', '', '']);
  };

  const renderLoginForm = () => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-slate-400">Login to your account!</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email id"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-left">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentView('signup')}
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignupForm = () => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Create your account</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email id"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-left">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentView('login')}
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOTPForm = (title, subtitle, buttonText) => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => otpRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 bg-slate-700 border-0 rounded-xl text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            {buttonText}
          </button>

          <div className="text-center">
            <button
              onClick={() => setCurrentView('login')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return renderLoginForm();
      case 'signup':
        return renderSignupForm();
      case 'emailOTP':
        return renderOTPForm(
          'Email Verify OTP',
          'Enter the 6-digit code sent to your email id.',
          'Verify email'
        );
      case 'resetOTP':
        return renderOTPForm(
          'Reset password OTP',
          'Enter the 6-digit code sent to your email id.',
          'Submit'
        );
      default:
        return renderLoginForm();
    }
  };

  // Auto-focus first OTP input when switching to OTP views
  useEffect(() => {
    if ((currentView === 'emailOTP' || currentView === 'resetOTP') && otpRefs.current[0]) {
      setTimeout(() => otpRefs.current[0].focus(), 100);
    }
  }, [currentView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderCurrentView()}
      </div>
    </div>
  );
}

// Demo