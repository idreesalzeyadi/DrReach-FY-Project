import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
  </svg>
);

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let response;

      if (state === 'Admin') {
        response = await axios.post(backendUrl + '/api/admin/login', { email, password });
      } else {
        response = await axios.post(backendUrl + '/api/doctor/login', { email, password });
      }

      const data = response.data;

      setTimeout(() => {
        if (data.success) {
          if (state === 'Admin') {
            localStorage.setItem('aToken', data.token);
            setAToken(data.token);
            toast.success('Admin logged in successfully!');
          } else {
            localStorage.setItem('dToken', data.token);
            setDToken(data.token);
            toast.success('Doctor logged in successfully!');
          }
        } else {
          toast.error(data.message || 'Login failed');
        }

        setLoading(false);
      }, 5000);

    } catch (error) {
      setTimeout(() => {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        <button
          className='bg-primary text-white text-center py-2 w-full rounded-md text-base flex items-center justify-center gap-2 disabled:opacity-50'
          type='submit'
          disabled={loading}
        >
          {loading && <Spinner />}
          {loading ? 'Please wait...' : 'Login'}
        </button>

        {state === 'Admin' ? (
          <p>Doctor Login <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
        ) : (
          <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;
