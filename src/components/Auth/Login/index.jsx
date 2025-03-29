import React, { useState } from 'react';
// import { useSignInMutation } from '@/app/redux/Rtk';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import useAuthStore  from '@/store/authStore';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading] = useState(false)
//   const [signIn, { isLoading }] = useSignInMutation();
//   const router = useRouter();
//   const { setUser: setAuthUser, setToken } = useAuthStore();
  
  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleLoginCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!user.email.trim()) newErrors.email = 'Please enter your email';
    if (!user.password.trim()) newErrors.password = 'Please enter your password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await signIn(user).unwrap();
      toast.success("Login has been Successfully 🎉");
      setAuthUser(response?.data?.user, response?.data?.token);
      setToken(response?.data?.token);
      setUser({ email: '', password: '' });
      setErrors({});
      router.push('/profile');
    } catch (err) {
      setErrors({ apiError: err?.data?.extraMessage || 'Login failed. ' });
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
      </form>
    </div>
  );
}

export default Login;