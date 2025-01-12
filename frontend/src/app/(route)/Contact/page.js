'use client';
import { useState } from "react";
import Navbar from '../(Navbar)/page';
import Footer from '../(Footer)/page';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert(data.error || 'Error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-lg max-w-4xl w-full p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-8">
            We'd love to hear from you! Please fill out the form below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-teal-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Or reach us directly at{" "}
              <a
                href="mailto:contact@carwebsite.com"
                className="text-teal-600 underline"
              >
                contact@carwebsite.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
