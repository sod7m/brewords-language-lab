import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import CategoryCard from '@/components/Categories/CategoryCard';
import { Category, categoryService } from '@/services/categoryService';
import { toast } from 'sonner';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getApprovedCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Помилка завантаження тем');
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/topics/${categoryId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="h-8 md:h-10 bg-gray-300 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 md:h-6 bg-gray-300 rounded w-1/3 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 rounded-lg h-48"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
              Тематичні уроки
            </h1>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">
              Оберіть тему для вивчення
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Теми ще не доступні. Спробуйте пізніше.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;