import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5'>
      
      {/* Dashboard Cards */}
      <div className='flex flex-wrap gap-4'>
        
        {/* Doctor card */}
        <div className='flex items-center gap-3 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.doctors}</p>
            <p className='text-gray-500'>Doctors</p>
          </div>
        </div>
        
        {/* Appointments card */}
        <div className='flex items-center gap-3 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>
        
        {/* Patients card */}
        <div className='flex items-center gap-3 p-4 bg-white min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='text-xl font-semibold text-gray-700'>{dashData.patients}</p>
            <p className='text-gray-500'>Patients</p>
          </div>
        </div>
        
      </div>

      {/* Latest Appointments */}
      <div className='bg-white mt-6'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border-b'>
          <img src={assets.list_icon} alt="Appointments" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        <div className='pt-4'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 transition-all' key={index}>
              <img className='rounded-full w-12 h-12' src={item.docData.image} alt="Doctor" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <div className='flex gap-2'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 h-8 cursor-pointer hover:text-red-500 transition-all'
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
