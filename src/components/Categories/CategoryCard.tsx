import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/services/categoryService';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="text-center p-4 md:p-6">
        {category.imageUrl ? (
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-2xl overflow-hidden bg-gradient-to-r from-brewords-blue to-brewords-accent">
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
            <span className="text-2xl md:text-3xl">📚</span>
          </div>
        )}
        <CardTitle className="text-lg md:text-xl">{category.name}</CardTitle>
        <CardDescription className="text-center text-sm md:text-base">
          {category.wordsCount} слів • {category.sentenceCount} речень
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CategoryCard;