import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const { state } = useLocation();
  const { appointment } = state || {};

  if (!appointment) {
    return <p className="text-red-500 text-center mt-6">No appointment details available</p>;
  }

  const { docData, slotDate, slotTime, userData, status } = appointment;

  useEffect(() => {
    localStorage.setItem('appointmentCount', 0);
  }, []);

  let appointmentCount = parseInt(localStorage.getItem('appointmentCount')) || 0;
  appointmentCount += 1;
  localStorage.setItem('appointmentCount', appointmentCount);

  const tokenNumber = String(appointmentCount).padStart(4, '0');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-yellow-100 text-yellow-600';
    }
  };

  const handleDownload = () => {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const appointmentContent = document.getElementById('appointment-slip');

    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write('<html><head><title>Appointment Details</title></head><body>');
    printWindow.document.write(appointmentContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    if (header) header.style.display = 'block';
    if (footer) footer.style.display = 'block';
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center underline decoration-blue-500" id="header">
        Appointment Details
      </h2>

      <div className="space-y-4" id="appointment-slip">
        {/* Doctor Info */}
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-md border border-blue-100">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 object-cover rounded-full border border-gray-200"
              src={docData.image}
              alt={docData.name}
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{docData.name}</p>
              <p className="text-sm text-gray-500 italic">{docData.speciality}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Address */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">Doctor's Address:</p>
          <p className="text-sm text-gray-600">{docData.address.line1}</p>
          <p className="text-sm text-gray-600">{docData.address.line2}</p>
        </div>

        {/* Patient Name */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-1">
          <p className="font-medium text-gray-800">Patient's Name:</p>
          <p className="text-gray-700">{userData.name}</p>
        </div>

        {/* Conditional Status or Date/Time */}
        {status === 'Completed' || status === 'Cancelled' ? (
          <div
            className={`text-center p-4 rounded-lg shadow-inner font-bold text-xl uppercase tracking-wide ${
              status === 'Completed'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            ✅ Appointment {status}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg shadow-inner text-center">
            <p className="font-semibold text-blue-800 text-sm uppercase tracking-wider">🕒 Appointment Date & Time</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{slotDate} | {slotTime}</p>
          </div>
        )}

        {/* Fees */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">Appointment Fees:</p>
          <p className="text-gray-700">${docData.fees}</p>
        </div>

        {/* Token Number */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800">Token Number:</p>
          <p className="text-gray-700">#{tokenNumber}</p>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-4" id="footer">
        <button
          onClick={handleDownload}
          className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-full transition duration-300 shadow-md"
        >
          Download Slip
        </button>
      </div>
    </div>
  );
};

export default Details;
