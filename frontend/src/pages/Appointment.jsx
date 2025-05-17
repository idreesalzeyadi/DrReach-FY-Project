import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', ];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const fetchDocInfo = async () => {
    try {
      setLoading(true); // Start loading spinner
      let docInfo = doctors.find((doc) => doc._id === docId);
      if (!docInfo) {
        const { data } = await axios.get(`${backendUrl}/api/user/doctor/${docId}`);
        if (data.success) {
          docInfo = data.doctor;
        } else {
          toast.error('Doctor not found!');
          return navigate('/doctors');
        }
      }
      setDocInfo(docInfo);
    } catch (error) {
      console.error('Error fetching doctor info:', error);

    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const getAvailableSlot = async () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 11; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(18, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 14 ? currentDate.getHours() + 1 : 14);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(14);
        currentDate.setMinutes(0);
      }

      const timeSlot = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          !docInfo.slots_booked[slotDate] || !docInfo.slots_booked[slotDate].includes(slotTime);

        if (isSlotAvailable) {
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlot]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please create an account to book an appointment');
      return navigate('/login');
    }

    try {
      setLoading(true); // Start loading spinner
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        setSlotTime('');
        fetchDocInfo();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  return (
    <div>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-200 z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Content */}
      {docInfo && (
        <div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img className="bg-primary sm:max-w-72 rounded-lg" src={docInfo.image} alt={docInfo.name} />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About <img src={assets.info_icon} alt="Info" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
              </div>
              <p className="text-gray-600 font-medium mt-2">
                Address:
                <span className="text-gray-900 ml-4">
                  {docInfo.address.line1}, {docInfo.address.line2}
                </span>
              </p>
              <p className="text-gray-600 font-medium mt-10">
                Appointment Fee: <span className="text-gray-900 ml-2">{currencySymbol} {docInfo.fees}</span>
              </p>
            </div>
          </div>

          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Available Slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center ml-2 py-6 min-w-16 border-red-500 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                    }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 border-red-300 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-200'
                    }`}
                >
                  {item.time}
                </p>
              ))}
            </div>

            <button
              onClick={bookAppointment}
              className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
            >
              Book Appointment Now
            </button>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
