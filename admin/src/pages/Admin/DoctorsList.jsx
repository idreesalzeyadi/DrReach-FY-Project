import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [loading, setLoading] = useState(false); // Loading state for button
  const [showAll, setShowAll] = useState(false); // To track whether all doctors are shown

  // Load initial doctors (first 10)
  useEffect(() => {
    if (aToken) {
      getAllDoctors(); // Initially fetch first 10 doctors
    }
  }, [aToken]);

  // Function to load more doctors when "See All" button is clicked
  const loadMoreDoctors = async () => {
    setLoading(true); // Start loading animation
    await getAllDoctors(true); // Fetch the remaining doctors (pass true to fetch all)
    setShowAll(true); // Set showAll to true to indicate that all doctors are shown
    setLoading(false); // Stop loading animation

    // Scroll down to reveal the remaining doctors
    const remainingDoctorsSection = document.getElementById('remaining-doctors');
    if (remainingDoctorsSection) {
      remainingDoctorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
        {/* Render the first 10 doctors */}
        {doctors.slice(0, 10).map((item, index) => (
          <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-neutral-800 font-medium text-lg">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="flex mt-2 items-center gap-1 text-sm">
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "See All" Button */}
      {!showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreDoctors}
            className="px-10 py-3 text-white rounded-full bg-primary"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'See All'
            )}
          </button>
        </div>
      )}

      {/* Render remaining doctors after clicking "See All" */}
      {showAll && (
        <div id="remaining-doctors" className="flex flex-wrap w-full gap-4 pt-5 gap-y-6 mt-6">
          {doctors.slice(10).map((item, index) => (
            <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={index}>
              <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
              <div className="p-4">
                <p className="text-neutral-800 font-medium text-lg">{item.name}</p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="flex mt-2 items-center gap-1 text-sm">
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
