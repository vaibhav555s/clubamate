
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
  const [credentials, setCredentials] = useState({ username: 'admin', password: 'admin' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signInWithGoogle } = useAuth();
  const { loginAsAdmin } = useAdmin();

  if (!isOpen) return null;

  const handleStudentLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await loginAsAdmin(credentials.username, credentials.password);
      if (success) {
        onClose();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl p-12 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-base text-muted-foreground">
            Choose your login method
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-8 bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => setLoginType('student')}
            className={`flex-1 h-12 rounded-lg text-base font-medium transition-all duration-200 ${
              loginType === 'student'
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-500'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 h-12 rounded-lg text-base font-medium transition-all duration-200 ${
              loginType === 'admin'
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-500'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Student Login */}
        {loginType === 'student' && (
          <button
            onClick={handleStudentLogin}
            disabled={isLoading}
            className="w-full h-12 bg-white border border-gray-200 text-black rounded-lg font-medium hover:border-black transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
        )}

        {/* Admin Login */}
        {loginType === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {/* Demo Credentials Note */}
            <div className="bg-gray-50 border border-gray-900 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                🔑 Demo Login: Username: <strong>admin</strong> | Password: <strong>admin</strong>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-black text-white rounded-lg font-medium hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login as Admin'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
