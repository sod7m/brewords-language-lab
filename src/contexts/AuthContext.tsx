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
    const token = localStorage.getItem('auth_token');
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.data) {
        // Мапимо userName -> name, avatarUrl -> avatar
        const backendUser = response.data as any;
        const user: User = {
          id: backendUser.id,
          name: backendUser.userName, // тут!
          email: backendUser.email,
          avatar: backendUser.avatarUrl ?? undefined,
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login({ email, password });
      if (response.data && (response.data as any).token) {
        apiService.setToken((response.data as any).token);
        const profile = await apiService.getProfile();
        if (profile.data) {
          const backendUser = profile.data as any;
          const user: User = {
            id: backendUser.id,
            name: backendUser.userName,
            email: backendUser.email,
            avatar: backendUser.avatarUrl ?? undefined,
          };
          setUser(user);
          toast.success('Успішно увійшли в систему!');
          return true;
        } else {
          toast.error('Не вдалося отримати профіль користувача');
          return false;
        }
      } else {
        toast.error('Невірні дані для входу');
        return false;
      }
    } catch (error) {
      toast.error('Помилка входу в систему');
      return false;
    }
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

    try {
      const response = await apiService.register({
        name, // <-- тут!
        email,
        password,
        confirmPassword,
      });
      if (response.data) {
        toast.success('Успішно зареєстровані! Тепер увійдіть в систему.');
        return true;
      } else {
        toast.error('Помилка реєстрації');
        return false;
      }
    } catch (error) {
      toast.error('Помилка реєстрації');
      return false;
    }
  };

  const logout = () => {
    apiService.logout();
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
