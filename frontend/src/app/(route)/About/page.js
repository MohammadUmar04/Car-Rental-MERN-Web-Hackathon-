import React from 'react';
import Navbar from '../(Navbar)/page';
import Footer from '../(Footer)/page';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to our car dealership website! We are passionate about cars and committed to providing you with the best car-buying experience. 
            Explore our extensive inventory, learn about the latest car trends, and connect with a team that puts your needs first.
          </p>
          <div className="mt-8">
            <img 
              src="https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg" 
              alt="About us" 
              className="rounded-lg shadow-lg mx-auto w-full max-w-3xl"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
