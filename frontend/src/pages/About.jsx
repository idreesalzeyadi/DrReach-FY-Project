import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='bg-gradient-to-r from-blue-50 to-teal-100 min-h-screen'>
      <div className='text-center p-20 pb-16'>
        <h1 className='text-5xl font-extrabold text-gray-800'>
          About <span className='text-primary font-bold'>Us</span>
        </h1>
        <div className='my-16 flex flex-col md:flex-row justify-center gap-12'>
          <img className='w-full md:max-w-[360px] rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105' src={assets.about_image} alt="About Us" />

          <div className='flex flex-col justify-center gap-6 md:w-2/3 text-sm text-gray-600'>
            <p className='leading-relaxed'>
              Welcome to <span className='font-medium text-gray-800'>Online Doctor Appointment</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Online Doctor Appointment, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p className='leading-relaxed'>
              Online Doctor Appointment is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Online Doctor Appointment is here to support you every step of the way.
            </p>
            <p className='leading-relaxed'>
              <strong className='text-gray-800'>Our Vision</strong>
            </p>
            <p className='leading-relaxed'>
              Our vision at Online Doctor Appointment is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='text-xl my-8'>
          <p className='text-gray-800 font-semibold text-center'>WHY <span className='text-primary font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row gap-8 justify-center'>
          {/* Card 1 */}
          <div className='border bg-white shadow-lg md:px-16 py-8 sm:py-12 rounded-lg flex flex-col items-center gap-6 transform transition-all duration-500 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-xl'>
            <i className="fas fa-clock text-3xl text-primary"></i>
            <b className='text-xl font-semibold text-gray-700'>Efficiency</b>
            <p className='text-center text-gray-600'>
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className='border bg-white shadow-lg md:px-16 py-8 sm:py-12 rounded-lg flex flex-col items-center gap-6 transform transition-all duration-500 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-xl'>
            <i className="fas fa-handshake text-3xl text-primary"></i>
            <b className='text-xl font-semibold text-gray-700'>Convenience</b>
            <p className='text-center text-gray-600'>
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          {/* Card 3 */}
          <div className='border bg-white shadow-lg md:px-16 py-8 sm:py-12 rounded-lg flex flex-col items-center gap-6 transform transition-all duration-500 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-xl'>
            <i className="fas fa-user-md text-3xl text-primary"></i>
            <b className='text-xl font-semibold text-gray-700'>Personalization</b>
            <p className='text-center text-gray-600'>
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className='bg-primary text-white py-12'>
        <div className='text-center'>
          <p className='text-lg font-semibold mb-4'>Stay Connected with Us</p>
          <div className='flex justify-center gap-8'>
            <i className="fab fa-facebook-f text-2xl hover:text-white transition-all"></i>
            <i className="fab fa-twitter text-2xl hover:text-white transition-all"></i>
            <i className="fab fa-linkedin-in text-2xl hover:text-white transition-all"></i>
            <i className="fab fa-instagram text-2xl hover:text-white transition-all"></i>
          </div>
          <p className='mt-4 text-sm'>© 2025 Online Doctor Appointment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
