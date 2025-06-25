import React, { useState } from 'react';
import { loginApi } from '../../api/auth';
import type { ApiError } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      onError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try { 
      const response = await loginApi({ email, password });
      onSuccess(response.message);
      navigate('/product');
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 401) {
        onError('Invalid credentials.');
      } else {
        onError(apiError.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          className="w-full p-3 rounded-md border border-gray-300 text-gray-800 placeholder-gray-400"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-3 rounded-md border border-gray-300 text-gray-800 placeholder-gray-400"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default SignInForm;