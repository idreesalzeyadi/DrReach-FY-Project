import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async (e) => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile',
        updateData, { headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="flex flex-col gap-6 m-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img className="bg-primary/80 w-36 h-36 rounded-full object-cover" src={profileData.image} alt={profileData.name} />
        </div>

        <div className="space-y-6">
          {/* Doctor Info: Name, Degree, Speciality */}
          <div className="flex flex-col items-center">
            <p className="text-3xl font-semibold text-gray-800">{profileData.name}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <p>{profileData.degree} - {profileData.speciality}</p>
              <button className="border py-0.5 px-2 text-xs rounded-full text-blue-600">{profileData.experience} Years</button>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <p className="text-sm font-medium text-gray-800">About</p>
            <p className="text-sm text-gray-600 mt-2">{profileData.about}</p>
          </div>

          {/* Fees */}
          <div>
            <p className="text-lg font-medium text-gray-800">Appointment Fee: 
              <span className="font-semibold text-gray-900">
                {currency}{isEdit ? <input type="number" onChange={(e) =>
                  setProfileData({ ...profileData, fees: e.target.value })} value={profileData.fees} className="mt-2 p-1 border border-gray-300 rounded-md w-32" /> : profileData.fees}
              </span>
            </p>
          </div>

          {/* Address */}
          <div>
            <p className="text-lg font-medium text-gray-800">Address</p>
            <div className="space-y-2">
              {isEdit ? (
                <>
                  <input type="text" onChange={(e) => setProfileData({ ...profileData, address: { ...profileData.address, line1: e.target.value } })} value={profileData.address.line1} className="w-full p-2 border border-gray-300 rounded-md" />
                  <input type="text" onChange={(e) => setProfileData({ ...profileData, address: { ...profileData.address, line2: e.target.value } })} value={profileData.address.line2} className="w-full p-2 border border-gray-300 rounded-md" />
                </>
              ) : (
                <p className="text-gray-600">{profileData.address.line1} <br /> {profileData.address.line2}</p>
              )}
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" checked={profileData.available} onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} className="h-5 w-5 text-primary rounded-md" />
            <label className="text-gray-700 font-medium">Available for appointments</label>
          </div>

          {/* Edit/Save Button */}
          <div className="flex justify-center mt-6">
            {isEdit
              ? <button onClick={updateProfile} className="px-6 py-2 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all">Save</button>
              : <button onClick={() => setIsEdit(true)} className="px-6 py-2 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all">Edit Profile</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
