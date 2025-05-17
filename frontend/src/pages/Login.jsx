import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Spinner component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
  </svg>
);

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let data;

      if (state === 'Sign up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        data = response.data;
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        data = response.data;
      }

      // Wait for 5 seconds to simulate loading
      setTimeout(() => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(state === 'Sign up' ? 'Account created successfully!' : 'Logged in successfully!');
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      }, 5000);

    } catch (error) {
      setTimeout(() => {
        toast.error(error.message);
        setLoading(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[18vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] am:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign up' ? "sign up" : "log in"} to book appointment</p>

        {state === 'Sign up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary text-white py-2 w-full rounded-md text-base flex justify-center items-center gap-2 disabled:opacity-50'
          disabled={loading}
        >
          {loading && <Spinner />}
          {loading ? 'Please wait...' : state === 'Sign up' ? "Create Account" : "Login"}
        </button>

        {state === 'Sign up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an Account? <span onClick={() => setState('Sign up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
