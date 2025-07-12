
import React, { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout, loading } = useAuth();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleAuthAction = async () => {
    try {
      if (user) {
        await logout();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Auth action failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            ClubMate
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Navigation */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  {link.name}
                </a>
              ))} 

          </div>
            
          <div className="hidden md:flex items-center space-x-1">
            {/* Desktop Auth Section */}
            {loading ? (
              <div className="ml-4 w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="ml-4 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.photoURL} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-100"
                  />
                  <span className="text-gray-700 font-medium hidden lg:block">
                    Hi, {user.name.split(' ')[0]} 👋
                  </span>
                </div>
                <Link 
                  to="/my-registrations"
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">My Events</span>
                </Link>
                <button 
                  onClick={handleAuthAction}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAuthAction}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 mx-4 py-2 border border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="px-4 py-2">
              {loading ? (
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2">
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-100"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Hi, {user.name.split(' ')[0]} 👋</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link 
                    to="/my-registrations"
                    className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Events
                  </Link>
                  <button 
                    onClick={handleAuthAction}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAuthAction}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
