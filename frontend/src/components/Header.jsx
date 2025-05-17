import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Header = () => {   // ✅ Only one function declaration
  const navigate = useNavigate();

  return (
    
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br bg-primary via-pink-800 to-indigo-900 rounded-3xl px-10 md:px-20 py-24 shadow-2xl overflow-hidden">
      
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Book <span className="text-yellow-400">Trusted Doctors</span> Anytime, Anywhere
        </h1>
        <p className="text-white mt-4 text-lg md:text-xl font-light max-w-lg">
          Healthcare made simple. Connect with top specialists and schedule hassle-free appointments at your convenience.
        </p>

        {/* Doctor Profiles (3D Glass Card Effect) */}
        <div className="mt-8 bg-white/20 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-6 border border-white/30">
          <img
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-md"
            src={assets.group_profiles}
            alt="Doctor profiles"
          />
          <p className="text-white text-base">
            Over <span className="font-semibold text-yellow-400">17,000+</span> verified doctors available.
          </p>
        </div>

        {/* Dual Call to Action Buttons */}
        <div className="flex gap-4 mt-6">
          <a
            href="#speciality"
            className="inline-block bg-yellow-400 text-gray-900 font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300"
          >
            Book Appointment
          </a>
          <button
            onClick={() => navigate("/explore")}  // Navigate to /explore
            className="inline-block bg-white/20 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg border border-white/40 hover:bg-white/30 transition-all duration-300"
          >
            Explore More
          </button>
        </div>
      </div>

      {/* Right Side (Doctor Image in Frame) */}
      <div className="md:w-1/2 flex justify-end mt-10 md:mt-0 relative">
        <div className="relative">
          <img
            className="w-full max-w-lg md:max-w-xl rounded-3xl shadow-2xl border-4 border-white"
            src={assets.header_img}
            alt="Medical team"
          />
          <div className="absolute top-5 right-5 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-5 left-5 w-16 h-16 bg-white/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

    </div>
  );
};

export default Header;
