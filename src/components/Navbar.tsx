
import React, { useState } from 'react';
import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, loading } = useAuth();
  const { isAdmin, adminUser, logoutAdmin } = useAdmin();

  const navLinks = !isAdmin
    ? [
        { name: "Events", href: "#events" },
        { name: "Clubs", href: "#clubs" },
        { name: "About", href: "#contact" },
      ]
    : [];

  const handleAuthAction = async () => {
    try {
      if (user || isAdmin) {
        await logout();
        logoutAdmin();
      } else {
        setShowLoginModal(true);
      }
    } catch (error) {
      console.error('Auth action failed:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-[32px] font-semibold text-foreground">
                ClubMate
              </span>
              {isAdmin && (
                <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium ml-2">
                  Admin
                </span>
              )}
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
              ) : (user || isAdmin) ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <>
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground hidden lg:block">
                          {adminUser?.username}
                        </span>
                      </>
                    ) : user ? (
                      <>
                        <img 
                          src={user.photoURL} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-foreground hidden lg:block">
                          {user.name.split(' ')[0]}
                        </span>
                      </>
                    ) : null}
                  </div>
                  {!isAdmin && (
                    <Link 
                      to="/my-registrations"
                      className="flex items-center gap-2 bg-muted text-foreground px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:block">My Events</span>
                    </Link>
                  )}
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
                  onClick={() => setShowLoginModal(true)}
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
                  ) : (user || isAdmin) ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 p-4">
                        {isAdmin ? (
                          <>
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                              <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-foreground">{adminUser?.username}</p>
                              <p className="text-sm text-muted-foreground">Administrator</p>
                            </div>
                          </>
                        ) : user ? (
                          <>
                            <img 
                              src={user.photoURL} 
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="text-center">
                              <p className="font-medium text-foreground">{user.name.split(' ')[0]}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </>
                        ) : null}
                      </div>
                      {!isAdmin && (
                        <Link 
                          to="/my-registrations"
                          className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-3 rounded-lg hover:bg-muted/80 transition-colors font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          My Events
                        </Link>
                      )}
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
                      onClick={() => setShowLoginModal(true)}
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

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;
