
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import PasswordForm from '@/components/Settings/PasswordForm';
import LanguageSettings from '@/components/Settings/LanguageSettings';
import { ArrowLeft } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Будь ласка, увійдіть в систему</h1>
          <Button asChild>
            <Link to="/login">Увійти</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад до профілю</span>
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Налаштування</h1>
            <p className="text-muted-foreground mt-2">
              Керуйте вашими налаштуваннями акаунту та мовами для навчання
            </p>
          </div>

          {/* Settings sections */}
          <div className="space-y-6">
            <LanguageSettings />
            <PasswordForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
