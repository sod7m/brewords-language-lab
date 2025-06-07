import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout/Layout';
import FlashCard from '@/components/Games/FlashCard';
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FlashCard as FlashCardType, flashCardService } from '@/services/flashCardService';
import { Category, categoryService } from '@/services/categoryService';
import { toast } from 'sonner';

const FlashCards: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [flashCards, setFlashCards] = useState<FlashCardType[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      loadData();
    }
  }, [categoryId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Завантажуємо категорію та флеш-картки паралельно
      const [categoriesData, flashCardsData] = await Promise.all([
        categoryService.getApprovedCategories(),
        flashCardService.getFlashCardsByCategory(categoryId!)
      ]);

      // Знаходимо категорію за ID
      const foundCategory = categoriesData.find(cat => cat.id === categoryId);
      if (!foundCategory) {
        toast.error('Категорію не знайдено');
        navigate('/topics');
        return;
      }

      setCategory(foundCategory);
      setFlashCards(flashCardsData);

      if (flashCardsData.length === 0) {
        toast.error('Флеш-картки для цієї категорії не знайдено');
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Помилка завантаження даних');
      navigate('/topics');
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashCards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashCards.length) % flashCards.length);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <div className="animate-pulse">
            <div className="h-6 md:h-8 bg-gray-300 rounded w-1/2 sm:w-1/3 mx-auto mb-4"></div>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-300 rounded-lg max-w-md mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (flashCards.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(`/topics/${categoryId}`)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад до ігор
            </Button>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            Флеш-картки для категорії "{category?.name}" не знайдено
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Можливо, слова ще не додані до цієї категорії.
          </p>
          <Button asChild>
            <Link to={`/topics/${categoryId}`}>Повернутися до ігор</Link>
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
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center mb-4">
              <Button variant="ghost" onClick={() => navigate(`/topics/${categoryId}`)} className="mr-2 md:mr-4">
                <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Назад</span>
              </Button>
              <Button variant="ghost" asChild className="mr-2 md:mr-4">
                <Link to="/topics">
                  <Home className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">До тем</span>
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
              Флеш-картки
            </h1>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {category?.name}
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Картка {currentIndex + 1} з {flashCards.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6 md:mb-8">
            <div 
              className="bg-gradient-to-r from-brewords-blue to-brewords-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashCards.length) * 100}%` }}
            ></div>
          </div>

          {/* Flash Card */}
          <div className="mb-6 md:mb-8">
            <FlashCard flashCard={flashCards[currentIndex]} />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              onClick={prevCard}
              disabled={flashCards.length <= 1}
              className="flex items-center px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
            >
              <ChevronLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Попередня</span>
            </Button>

            <div className="flex space-x-1 md:space-x-2 overflow-x-auto max-w-[200px] md:max-w-none">
              {flashCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors flex-shrink-0 ${
                    index === currentIndex 
                      ? 'bg-brewords-blue' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={nextCard}
              disabled={flashCards.length <= 1}
              className="flex items-center px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
            >
              <span className="hidden sm:inline">Наступна</span>
              <ChevronRight className="w-4 h-4 ml-1 md:ml-2" />
            </Button>
          </div>

          {/* Completion message */}
          {currentIndex === flashCards.length - 1 && (
            <Card className="mt-6 md:mt-8 bg-green-50 dark:bg-green-900/20 border-green-200">
              <CardHeader>
                <CardTitle className="text-center text-green-800 dark:text-green-200 text-lg md:text-xl">
                  🎉 Вітаємо!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-700 dark:text-green-300 mb-4 text-sm md:text-base">
                  Ви переглянули всі картки! Продовжуйте вивчення з іншими іграми.
                </p>
                <Button asChild className="bg-brewords-blue hover:bg-brewords-blue-dark w-full sm:w-auto">
                  <Link to={`/topics/${categoryId}`}>Спробувати інші ігри</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FlashCards;
