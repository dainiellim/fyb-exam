import React, { useState } from 'react';
import SignInForm from '../../components/auth/SignInForm';
import SignUpForm from '../../components/auth/SignUpForm';

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSuccess = (message: string) => {
    setMessage(message);
    setMessageType('success');
  };

  const handleError = (message: string) => {
    setMessage(message);
    setMessageType('error');
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setMessage('');
    setMessageType('');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-xl text-gray-800 space-y-6 border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-4">
          {showLogin ? 'Login' : 'Register'}
        </h2>
        {message && (
          <div className={`text-center py-2 px-4 rounded-md ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} transition-all duration-300 ease-in-out`}>
            {message}
          </div>
        )}
        {showLogin ? (
          <SignInForm onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} onError={handleError} />
        )}
        <div className="flex items-center justify-between mt-6">
          <span className="w-1/4 border-b border-gray-300"></span>
          <span className="text-sm text-gray-500 px-3">OR</span>
          <span className="w-1/4 border-b border-gray-300"></span>
        </div>
        <button
          onClick={toggleForm}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all transform focus:ring-2 focus:ring-blue-500"
        >
          {showLogin ? 'Create an Account' : 'Already have an Account? Log In'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
