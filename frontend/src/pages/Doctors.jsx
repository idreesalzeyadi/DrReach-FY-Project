import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          className={`py-2 px-4 border rounded text-sm font-semibold transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className={`flex flex-col gap-3 text-sm text-gray-700 border rounded-lg p-4 shadow-md bg-white ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist', 'other'].map((spec, index) => (
            <p 
              key={index}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto px-4 py-2 border border-gray-300 rounded-lg cursor-pointer transition-all text-center font-medium hover:bg-indigo-100 hover:text-indigo-900 ${speciality === spec ? 'bg-indigo-500 text-white' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer group hover:translate-y-[-5px] transition-all duration-500 bg-white shadow-lg'
              key={index}
            >
              <img className='group-hover:bg-primary bg-indigo-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
