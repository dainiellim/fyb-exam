import React, { useState } from 'react';
import { registerApi, loginApi, validateRegistrationData, type RegisterRequest } from '../../api/auth';
import { apiError } from '../../api/apiError';
import { useNavigate } from 'react-router-dom';

interface SignUpFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}
type RegisterFormRequest = RegisterRequest & {
  confirmPassword?: string;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<RegisterFormRequest>({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateRegistrationData(formData as any);
    if (validationError) {
      onError(validationError);
      setLoading(false);
      return;
    }
    try {
      const { confirmPassword, ...apiData } = formData;
      const response = await registerApi(apiData);
      await loginApi({ email: formData.email as string, password: formData.password as string });
      navigate('/product');
      onSuccess(response.message);
    } catch (error) {
      const apiError = error as apiError;
      onError(apiError.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          className="w-full p-3 rounded-md border"
          value={formData.first_name}
          onChange={handleFormChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="last_name" className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          className="w-full p-3 rounded-md border"
          value={formData.last_name}
          onChange={handleFormChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="middle_name" className="block text-sm font-medium mb-1">Middle Name (Optional)</label>
        <input
          type="text"
          name="middle_name"
          id="middle_name"
          className="w-full p-3 rounded-md border"
          value={formData.middle_name}
          onChange={handleFormChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-3 rounded-md border"
          value={formData.email}
          onChange={handleFormChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-3 rounded-md border"
          value={formData.password}
          onChange={handleFormChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="w-full p-3 rounded-md border"
          value={formData.confirmPassword}
          onChange={handleFormChange}
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default SignUpForm;