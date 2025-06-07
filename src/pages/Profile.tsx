
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import { BookOpen, User, Camera } from 'lucide-react';
import AvatarModal from '@/components/Profile/AvatarModal';
import CategoryStats from '@/components/Profile/CategoryStats';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 md:w-20 md:h-20 cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-brewords-blue text-white text-lg md:text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className="absolute -bottom-1 -right-1 bg-brewords-blue text-white rounded-full p-1 cursor-pointer hover:bg-brewords-blue-dark transition-colors"
                    onClick={() => setIsAvatarModalOpen(true)}
                  >
                    <Camera className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <CardTitle className="text-xl md:text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-base md:text-lg break-words">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/topics">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brewords-blue rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Тематичні уроки</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Вивчайте слова за темами через ігри та вправи
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/vocabulary">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brewords-accent rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Мій словник</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Переглядайте та керуйте своїм персональним словником
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>

          {/* Category Statistics */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Ваша статистика</CardTitle>
              <CardDescription>
                Відстежуйте свій прогрес у вивченні слів та складанні речень
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryStats />
            </CardContent>
          </Card>

          {/* Avatar Modal */}
          <AvatarModal 
            isOpen={isAvatarModalOpen} 
            onClose={() => setIsAvatarModalOpen(false)} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
