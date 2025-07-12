
import React, { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout, loading } = useAuth();

  const navLinks = [
    { name: 'Events', href: '#events' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'About', href: '#contact' }
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="text-[32px] font-semibold text-foreground">
            ClubMate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
            
          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {loading ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.photoURL} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-foreground hidden lg:block">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <Link 
                  to="/my-registrations"
                  className="flex items-center gap-2 bg-muted text-foreground px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">My Events</span>
                </Link>
                <button 
                  onClick={handleAuthAction}
                  className="flex items-center gap-2 bg-muted text-foreground px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAuthAction}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-95 transition-opacity font-medium text-base hover-lift"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-muted-foreground transition-colors p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-center py-4 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-border">
                {loading ? (
                  <div className="w-full h-12 bg-muted rounded-lg animate-pulse"></div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 p-4">
                      <img 
                        src={user.photoURL} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-center">
                        <p className="font-medium text-foreground">{user.name.split(' ')[0]}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link 
                      to="/my-registrations"
                      className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-3 rounded-lg hover:bg-muted/80 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      My Events
                    </Link>
                    <button 
                      onClick={handleAuthAction}
                      className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-3 rounded-lg hover:bg-muted/80 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleAuthAction}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-95 transition-opacity font-medium hover-lift"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
