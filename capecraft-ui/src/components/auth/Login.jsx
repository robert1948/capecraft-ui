import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formKey, setFormKey] = useState(Math.random().toString(36).substring(7));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setFormKey(Math.random().toString(36).substring(7));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!isLogin && !name) errors.name = 'Name is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await (isLogin
        ? authService.login({ email, password })
        : authService.register({ email, password, name }));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <div className="flex justify-around mb-4">
          <button
            className={`w-1/2 py-2 text-center font-semibold rounded-t-md ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setValidationErrors({});
              setEmail('');
              setPassword('');
              setFormKey(Math.random().toString(36).substring(7));
            }}
            disabled={isLoading}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center font-semibold rounded-t-md ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setValidationErrors({});
              setEmail('');
              setPassword('');
              setName('');
              setFormKey(Math.random().toString(36).substring(7));
            }}
            disabled={isLoading}
          >
            Register
          </button>
        </div>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} key={`${isLogin ? 'login' : 'register'}-${formKey}`}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
              <input
                type="text"
                id={`name-${formKey}`}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {validationErrors.name && <p className="text-sm text-red-600 mt-1">{validationErrors.name}</p>}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              id={`email-${formKey}`}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {validationErrors.email && <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              id={`password-${formKey}`}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {validationErrors.password && <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>

          <div className="my-6 text-center text-sm text-gray-500">OR</div>

          <a
            href={process.env.NODE_ENV === 'production'
              ? 'https://www.cape-control.com/api/auth/google'
              : 'http://localhost:5000/api/auth/google'}
            className="w-full block text-center py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="inline-block align-middle">Continue with Google</span>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
