
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Захардкоджений користувач для швидкого тестування
    const hardcodedUser: User = {
      id: '1',
      name: 'Тестовий Користувач',
      email: 'test@example.com',
      avatar: undefined,
    };
    
    // Симулюємо завантаження
    setTimeout(() => {
      setUser(hardcodedUser);
      setLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Захардкоджений вхід - будь-які дані підходять
    const hardcodedUser: User = {
      id: '1',
      name: 'Тестовий Користувач',
      email: email,
      avatar: undefined,
    };
    
    setUser(hardcodedUser);
    toast.success('Успішно увійшли в систему!');
    return true;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    if (password !== confirmPassword) {
      toast.error('Паролі не співпадають');
      return false;
    }

    // Захардкоджена реєстрація
    toast.success('Успішно зареєстровані! Тепер увійдіть в систему.');
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success('Ви вийшли з системи');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(current => current ? { ...current, ...userData } : null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
