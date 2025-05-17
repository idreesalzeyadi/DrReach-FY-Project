import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreMore = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-primary flex flex-col items-center p-10 text-white'>
      <h1 className='text-4xl font-extrabold text-center drop-shadow-lg'>hello</h1>
      <p className='text-lg text-center mt-3 max-w-3xl opacity-80'>
        We are continuously improving to bring you the best healthcare experience. Here's what’s coming soon!
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full max-w-6xl'>
        <div className='bg-white/10 p-6 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
          <h2 className='text-xl font-semibold text-yellow-400'>AI Health Assistant</h2>
          <p className='mt-2 opacity-90'>
            Get AI-driven insights and preliminary health check-ups right from your phone.
          </p>
        </div>

        <div className='bg-white/10 p-6 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
          <h2 className='text-xl font-semibold text-yellow-400'>24/7 Virtual Consultations</h2>
          <p className='mt-2 opacity-90'>
            Connect with top specialists anytime, anywhere with our 24/7 virtual consultation service.
          </p>
        </div>

        <div className='bg-white/10 p-6 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
          <h2 className='text-xl font-semibold text-yellow-400'>E-Prescriptions & Medical Records</h2>
          <p className='mt-2 opacity-90'>
            Access and manage your medical records digitally with ease.
          </p>
        </div>

        <div className='bg-white/10 p-6 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
          <h2 className='text-xl font-semibold text-yellow-400'>Personalized Health Plans</h2>
          <p className='mt-2 opacity-90'>
            Get tailor-made wellness plans based on your health goals and medical history.
          </p>
        </div>

        <div className='bg-white/10 p-6 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
          <h2 className='text-xl font-semibold text-yellow-400'>Multilingual Support</h2>
          <p className='mt-2 opacity-90'>
            Our platform will soon support multiple languages for a seamless experience.
          </p>
        </div>
      </div>

      <button
        className='mt-10 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition-all'
        onClick={() => navigate('/')}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ExploreMore;
