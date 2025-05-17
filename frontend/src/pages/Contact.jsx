import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white min-h-screen">
      <div className="text-center text-3xl pt-16 pb-8 text-gray-700">
        <p>
          CONTACT <span className="text-primary font-semibold">US</span>
        </p>
      </div>

      <div className="my-16 flex flex-col justify-center md:flex-row gap-10 md:px-16">
        {/* Contact Image Section */}
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Contact Information Section */}
        <div className="flex flex-col justify-center items-start gap-8 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-xl text-gray-800">Our OFFICE</p>
            <p className="text-gray-500">Block 2 Near Sadar<br />Tehkal, Peshawar, Pakistan</p>
            <p className="text-gray-500">Tel: (+92) 341-1929949<br />Email: idreesalzeyadi03@gmail.com</p>
          </div>

          {/* Careers Section */}
          <div>
            <p className="font-semibold text-xl text-gray-800">Careers at ODA</p>
            <p className="text-gray-500">Learn more about our teams and job openings.</p>
            <a href="https://yourcareerslink.com" target="_blank" rel="noopener noreferrer">
              <button className="border border-primary text-primary px-8 py-3 rounded-full font-semibold mt-4 hover:bg-primary hover:text-white transition-all duration-300">
                Explore Careers
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-10 mt-20">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Stay Connected</p>
          <div className="flex justify-center gap-8">
            <i className="fab fa-facebook-f text-2xl hover:text-white transition-all duration-300"></i>
            <i className="fab fa-twitter text-2xl hover:text-white transition-all duration-300"></i>
            <i className="fab fa-linkedin-in text-2xl hover:text-white transition-all duration-300"></i>
            <i className="fab fa-instagram text-2xl hover:text-white transition-all duration-300"></i>
          </div>
          <p className="mt-4 text-sm">© 2025 Online Doctor Appointment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
