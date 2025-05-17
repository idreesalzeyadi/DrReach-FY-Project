import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const handleSeeDetails = (appointment) => {
    navigate("/details", { state: { appointment } }); // Pass appointment as state
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-indigo-600 pb-4 border-b-2 border-indigo-200">
        My Appointments
      </h2>
      <div className="space-y-4 mt-4">
        {appointments.map((item, index) => (
          <div
            className="flex flex-col sm:flex-row bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            key={index}
          >
            <div className="flex-shrink-0">
              <img
                className="w-36 h-40 object-cover rounded-md border border-indigo-300 bg-indigo-50"
                src={item.docData.image}
                alt="Doctor"
              />
            </div>

            <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
              <p className="text-xl font-semibold text-indigo-800">{item.docData.name}</p>
              <p className="text-indigo-600 italic">{item.docData.speciality}</p>
              <p className="mt-2 font-medium text-gray-700">Address:</p>
              <p className="text-sm text-gray-600">{item.docData.address.line1}</p>
              <p className="text-sm text-gray-600">{item.docData.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-medium text-gray-700">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center mt-4 sm:mt-0">
              <button
                onClick={() => handleSeeDetails(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                See Details
              </button>

              {!item.cancelled && !item.isCompleted && (
                <button className="px-4 py-2 bg-yellow-400 text-white rounded-md">
                  Booked
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="px-4 py-2 bg-gray-400 text-white rounded-md">
                  Appointment Cancelled
                </button>
              )}

              {item.isCompleted && (
                <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments; 
