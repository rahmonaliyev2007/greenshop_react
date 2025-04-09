import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signInWithGoogle } from '../../../../firebase';
import { Facebook, QrCode } from 'lucide-react';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API
const apikey = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN

function Login({ setIsModalOpen, setIsLogged }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const easySignInWithGoogle = async () => {
    const res = await signInWithGoogle()
    const response = await axios.post(`${api}user/sign-in/google?access_token=${apikey}`, { email: res?.user?.email });
    localStorage.setItem('user', JSON.stringify(response?.data?.data));
    localStorage.setItem('wishlist', JSON.stringify(response?.data?.data?.user?.wishlist));
    setUser({ email: '', password: '' });
    setIsLogged(true);
    setIsModalOpen(false);
    setErrors({});
    setIsLoading(false)
    toast.success(`You Successfully logged in as ${response?.data?.data?.user?.name}`);
  }

  const handleLoginCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!user.email.trim()) newErrors.email = 'Please enter your email';
    if (!user.password.trim()) newErrors.password = 'Please enter your password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true)
    try {
      const response = await axios.post(`${api}user/sign-in?access_token=${apikey}`, user);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      localStorage.setItem('wishlist', JSON.stringify(response?.data?.data?.user?.wishlist));
      setUser({ email: '', password: '' });
      setIsLogged(true);
      setIsModalOpen(false);
      setErrors({});
      setIsLoading(false)
      toast.success(`You Successfully logged in as ${response?.data?.data?.user?.name}`);

      navigate('/profile/account')
    } catch (err) {
      setErrors({ apiError: err?.response?.data?.extraMessage || 'Login failed. ' });
      toast.error(`Failed on login, please make sure you have entered the correct email and password`);

    }
  };

  return (
    <div>
      <form onSubmit={handleLoginCheck} className='px-10'>
        <p className='font-[490]'>Enter your email and password to login.</p>

        <div className='relative'>
          <input type="email" className={`w-full border rounded my-3 p-2 outline-none ${errors.email ? 'border-red-500' : 'border-green-500'}`} id='email' name='email' placeholder='Enter your email address!' value={user.email} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.email ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.email}</span>
        </div>
        <div className='relative'>
          <input type="password" className={`w-full border rounded my-3 p-2 outline-none ${errors.password ? 'border-red-500' : 'border-green-500'}`} id='password' name='password' placeholder='Enter your password!' value={user.password} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.password ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.password}</span>
        </div>
        {errors.apiError && <p className="text-red-500 text-sm mt-2">{errors.apiError}</p>}
        <button type="submit" className='w-full bg-[#46A358] text-lg font-semibold text-white rounded p-2 mt-5'>
          {isLoading ? "Logging In..." : 'Login'}
        </button>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-500 text-sm">Or login with</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button type="button" className="w-full cursor-not-allowed flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition">
            <Facebook />
            <span className="text-sm font-medium text-gray-700">Login with Facebook</span>
          </button>

          <button type="button" onClick={easySignInWithGoogle} className="w-full flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition">
            <img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/09-google-3-512.png" alt="google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Login with Google</span>
          </button>

          <button type="button" className="w-full cursor-not-allowed flex items-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition" >
            <QrCode />
            <span className="text-sm font-medium text-gray-700">Login with Qr Code</span>
          </button>
        </div>
        </form>
    </div>
  );
}

export default Login;