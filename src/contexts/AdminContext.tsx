
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  username: string;
  isAdmin: boolean;
}

interface AdminContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  loginAsAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Demo credentials
  const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
  };

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const savedAdmin = localStorage.getItem('clubmate_admin');
    if (savedAdmin) {
      const adminData = JSON.parse(savedAdmin);
      setIsAdmin(true);
      setAdminUser(adminData);
    }
    setLoading(false);
  }, []);

  const loginAsAdmin = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      const adminData: AdminUser = {
        username,
        isAdmin: true
      };
      
      setIsAdmin(true);
      setAdminUser(adminData);
      localStorage.setItem('clubmate_admin', JSON.stringify(adminData));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('clubmate_admin');
  };

  const value: AdminContextType = {
    isAdmin,
    adminUser,
    loginAsAdmin,
    logoutAdmin,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
