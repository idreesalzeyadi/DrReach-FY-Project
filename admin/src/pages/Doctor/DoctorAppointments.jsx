import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        {/* Header Row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            className='grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 text-gray-500 border-b hover:bg-gray-50 transition-all duration-200'
            key={index}
          >
            <p>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} alt="Patient" className='w-8 h-8 rounded-full' />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p>{item.payment ? 'REQUIRED' : 'CASH'}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>{currency}{item.amount}</p>

            {
              item.cancelled
              ? <p className='border px-3 py-1 rounded-full border-red-500 text-red-600 bg-red-100'>Cancelled</p>
              : item.isCompleted
                ? <p className='border px-3 py-1 rounded-full border-green-500 text-green-600 bg-green-100'>Completed</p>
                : <div className='flex items-center gap-3'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className='w-8 h-8 cursor-pointer hover:text-red-500 transition-colors duration-200'
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      className='w-8 h-8 cursor-pointer hover:text-green-500 transition-colors duration-200'
                    />
                  </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
