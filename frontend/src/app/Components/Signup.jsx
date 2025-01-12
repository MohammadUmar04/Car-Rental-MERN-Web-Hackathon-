'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });

      alert(response.data.message || 'Signup successful!');
      navigate('/Login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transition-transform transform hover:scale-105"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 font-serif">Signup</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'} // Toggle password type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={() => setShowPassword(!showPassword)} // Toggle visibility
            showIcon={showPassword} // Show eye icon if password is visible
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password type
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
            showIcon={showConfirmPassword} // Show eye icon if confirm password is visible
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center" style={{ color: 'black' }}>
          Already have an account?{' '}
          <Link to="/Login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

const InputField = ({ id, label, type, value, onChange, toggleVisibility, showIcon }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700" style={{ color: 'black' }}>
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        value={value}
        onChange={onChange}
        required
      />
      {id === 'password' || id === 'confirmPassword' ? (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-2 top-2"
        >
          {showIcon ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      ) : null}
    </div>
  </div>
);

export default Signup;
