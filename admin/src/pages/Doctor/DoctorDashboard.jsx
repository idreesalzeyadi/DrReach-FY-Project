import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="container mx-auto px-6 py-6">
      
      {/* Dashboard Stats Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {/* Earnings Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex items-center">
            <img className="w-16 h-16 rounded-full bg-primary p-2" src={assets.earning_icon} alt="Earnings" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">{currency} {dashData.earnings}</p>
              <p className="text-sm text-gray-500">Earnings</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex items-center">
            <img className="w-16 h-16 rounded-full bg-primary p-2" src={assets.appointments_icon} alt="Appointments" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">{dashData.appointments}</p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex items-center">
            <img className="w-16 h-16 rounded-full bg-primary p-2" src={assets.patients_icon} alt="Patients" />
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-700">{dashData.patients}</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>
        
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-2.5 px-6 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="List" />
          <p className="font-semibold text-lg text-gray-800">Latest Bookings</p>
        </div>

        <div className="divide-y divide-gray-200">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 cursor-pointer" key={index}>
              <img className="w-12 h-12 rounded-full" src={item.userData.image} alt={item.userData.name} />
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
              </div>

              {/* Appointment Status */}
              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-semibold">Completed</p>
              ) : (
                <div className="flex gap-3">
                  <button onClick={() => cancelAppointment(item._id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                    <img src={assets.cancel_icon} alt="Cancel" className="w-8 h-8" />
                  </button>
                  <button onClick={() => completeAppointment(item._id)} className="text-green-500 hover:text-green-700 transition-colors duration-200">
                    <img src={assets.tick_icon} alt="Complete" className="w-8 h-8" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
