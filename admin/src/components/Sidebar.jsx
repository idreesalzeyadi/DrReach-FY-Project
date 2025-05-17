import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext)

  return (
    <div className="flex flex-col mt-4 h-screen bg-gray-100">
      {aToken && (
        // Sidebar Navigation
        <nav className="flex flex-col w-64 bg-white h-full shadow-lg">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/all-appointments'}
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/add-doctor'}
          >
            <img src={assets.add_icon} alt="Add Doctor Icon" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/doctor-list'}
          >
            <img src={assets.people_icon} alt="Doctors List Icon" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </nav>
      )}

      {dToken && (
        // Sidebar Navigation
        <nav className="flex flex-col w-64 bg-white h-full shadow-lg">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/doctor-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/doctor-appointments'}
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'bg-[#F2F3FF] border-r-4 border-primary'
              }`
            }
            to={'/doctor-profile'}
          >
            <img src={assets.people_icon} alt="Doctors List Icon" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
