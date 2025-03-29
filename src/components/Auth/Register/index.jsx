import React, { useState } from 'react';
// import { useSignUpMutation } from '@/app/redux/Rtk';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import useAuthStore from '@/store/authStore';

function Register() {
  const [user, setUser] = useState({ name: '', surname: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
    const [isLoading] = useState(false)
  
//   const [addPost, { isLoading, error }] = useSignUpMutation();
//   const router = useRouter();

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRegisterCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Please enter your name';
    if (!user.surname.trim()) newErrors.surname = 'Please enter your surname';
    if (!user.email.trim()) newErrors.email = 'Please enter your email';
    if (!user.password.trim()) newErrors.password = 'Please enter your password';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    if (user.password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await addPost(user).unwrap();
      const { setUser, setToken } = useAuthStore.getState();
      toast.success("Registration has been complated succesfullt 🎉");
      setUser(response?.data?.user, response?.data?.token);
      setToken(response?.data?.token);
      setUser({ name: '', surname: '', email: '', password: '' });
      setConfirmPassword('');
      setErrors({});
      router.push('/profile');
    } catch (err) {
      setErrors({ apiError: err?.data?.extraMessage || 'Registration failed.' });
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterCheck} className='px-10'>
        <p className='font-[490]'>Enter your email and password to register.</p>

        <div className='relative'>
          <input type="text" className={`w-full border rounded  my-3 p-2 outline-none ${errors.name ? 'border-red-500' : 'border-green-500'}`} id='name' name='name' placeholder='Name!' value={user.name} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.name ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.name}</span>
        </div>

        <div className='relative'>
          <input type="text" className={`w-full border rounded  my-3 p-2 outline-none ${errors.surname ? 'border-red-500' : 'border-green-500'}`} id='surname' name='surname' placeholder='Surname!' value={user.surname} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.surname ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.surname}</span>
        </div>

        <div className='relative'>
          <input type="email" className={`w-full border rounded my-3 p-2 outline-none ${errors.email ? 'border-red-500' : 'border-green-500'}`} id='email' name='email' placeholder='Enter your email address!' value={user.email} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.email ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.email}</span>
        </div>

        <div className='relative'>
          <input type="password" className={`w-full border rounded  my-3 p-2 outline-none ${errors.password ? 'border-red-500' : 'border-green-500'}`} id='password' name='password' placeholder='Create Password!' value={user.password} onChange={handleSetValue} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.password ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.password}</span>
        </div>

        <div className='relative'>
          <input type="password" className={`w-full border rounded  my-3 p-2 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-green-500'}`} id='confirmPassword' name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <span className={`absolute left-0 bottom-2 text-red-500 text-xs transition-all duration-200 ${errors.confirmPassword ? 'translate-y-full' : '-translate-y-4 opacity-0'}`}>{errors.confirmPassword}</span>
        </div>

        {errors.apiError && <p className='text-red-500 text-xs'>{errors.apiError}</p>}

        <button type="submit" className='w-full bg-[#46A358] text-lg font-semibold text-white rounded p-2 mt-5' disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;