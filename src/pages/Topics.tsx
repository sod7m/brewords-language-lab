import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { Category, categoryService } from '@/services/categoryService';
import { toast } from 'sonner';

const Topics: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const games = [
    {
      id: 'flashcards',
      title: 'FlashCards',
      description: 'Вивчайте слова з флеш-картками, що перевертаються',
      icon: '🃏',
      path: `/games/flashcards/${categoryId}`
    },
    {
      id: 'guess-word',
      title: 'Guess the Word',
      description: 'Вгадуйте переклад слова з чотирьох варіантів',
      icon: '🎯',
      path: `/games/guess-word/${categoryId}`
    },
    {
      id: 'unscramble',
      title: 'Unscramble Sentence',
      description: 'Складайте речення зі слів у правильному порядку',
      icon: '🧩',
      path: `/games/unscramble/${categoryId}`
    }
  ];

  useEffect(() => {
    if (categoryId) {
      loadCategory();
    }
  }, [categoryId]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const categories = await categoryService.getApprovedCategories();
      const foundCategory = categories.find(cat => cat.id === categoryId);
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        toast.error('Тему не знайдено');
        navigate('/topics');
      }
    } catch (error) {
      toast.error('Помилка завантаження теми');
      navigate('/topics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/topics')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад до тем
            </Button>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">
              {category.wordsCount} слів • {category.sentenceCount} речень
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
              Виберіть гру для вивчення
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <Link to={game.path}>
                  <CardHeader className="text-center p-4 md:p-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-2xl md:text-3xl">{game.icon}</span>
                    </div>
                    <CardTitle className="text-lg md:text-xl">{game.title}</CardTitle>
                    <CardDescription className="text-center text-sm md:text-base">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Більше ігор незабаром...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
