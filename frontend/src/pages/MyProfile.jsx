import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(true);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    // Start here 
    <div className='max-w-lg flex flex-col gap-2 text-sm p-6 bg-white rounded-xl shadow-lg border border-gray-300'>
      <div className="flex justify-center items-center relative">
        {
          isEdit
            ? <label htmlFor="image">
                <div className='inline-block relative cursor-pointer'>
                  <img className='w-36 rounded-full opacity-80 border-4 border-white' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                  <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
              </label>
            : <img className='w-36 rounded-full border-4 border-white shadow-xl' src={userData.image} alt="" />
        }
      </div>

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-full mt-4 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400' type="text" value={userData.name} onChange={e => setUserData(pre => ({ ...pre, name: e.target.value }))} />
          : <p className='font-medium mt-4 text-3xl text-neutral-800'>{userData.name}</p>
      }

      <hr className='bg-gray-400 border-none h-[1px] mt-6' />

      <div className="mt-6">
        <p className='text-neutral-500 font-semibold underline'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-semibold'>Email id:</p>
          <p className="bg-gray-100 mt-1 text-blue-800 h-8 w-full rounded border border-gray-300 px-2 text-sm">{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ? (
              <input
                className="bg-gray-100 mt-2 h-8 w-full rounded border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={userData.phone}
                onChange={e => setUserData(pre => ({ ...pre, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            ) : (
              <p className='text-blue-400'>{userData.phone}</p>
            )
          }

          <p className="font-medium">Address:</p>
          {
            isEdit ? (
              <div>
                <input
                  className="bg-gray-100 mt-2 h-8 w-full rounded border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setUserData(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, line1: e.target.value } 
                  }))}
                  value={userData.address.line1}
                  placeholder="Enter address line 1"
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-100 mt-2 h-8 w-full rounded border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                  value={userData.address.line2}
                  placeholder="Enter address line 2"
                  type="text"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )
          }
        </div>
      </div>

      <div className="mt-6">
        <p className='text-neutral-500 font-semibold underline'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-semibold'>Gender:</p>
          {
            isEdit
              ? <select className='bg-gray-100 max-w-32' onChange={(e) => setUserData(pre => ({ ...pre, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-semibold'>Date Of Birth:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-32' type="date" onChange={(e) => setUserData(pre => ({ ...pre, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-8'>
        {
          isEdit
            ? <button className='w-full py-3 border border-primary rounded-full bg-primary text-white hover:bg-blue-700 transition-all' onClick={updateUserProfileData}> Update Information </button>
            : <button className='w-full py-3 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
}

export default MyProfile;
