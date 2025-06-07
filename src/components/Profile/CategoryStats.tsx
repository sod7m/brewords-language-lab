
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CategoryStat {
  id: string;
  name: string;
  wordsLearned: number;
  totalWords: number;
  sentencesCorrect: number;
  totalSentences: number;
  icon: string;
}

const CategoryStats: React.FC = () => {
  // Захардкоджені дані статистики
  const categoryStats: CategoryStat[] = [
    {
      id: '1',
      name: 'Work',
      wordsLearned: 45,
      totalWords: 60,
      sentencesCorrect: 32,
      totalSentences: 40,
      icon: '💼'
    },
    {
      id: '2',
      name: 'Food',
      wordsLearned: 28,
      totalWords: 50,
      sentencesCorrect: 15,
      totalSentences: 25,
      icon: '🍕'
    },
    {
      id: '3',
      name: 'Animals',
      wordsLearned: 38,
      totalWords: 45,
      sentencesCorrect: 22,
      totalSentences: 30,
      icon: '🐕'
    },
    {
      id: '4',
      name: 'Travel',
      wordsLearned: 12,
      totalWords: 35,
      sentencesCorrect: 8,
      totalSentences: 20,
      icon: '✈️'
    }
  ];

  const getWordsProgress = (learned: number, total: number) => {
    return Math.round((learned / total) * 100);
  };

  const getSentencesProgress = (correct: number, total: number) => {
    return Math.round((correct / total) * 100);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-semibold mb-4">Прогрес по категоріях</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryStats.map((category) => {
          const wordsProgress = getWordsProgress(category.wordsLearned, category.totalWords);
          const sentencesProgress = getSentencesProgress(category.sentencesCorrect, category.totalSentences);
          
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.wordsLearned}/{category.totalWords} слів • {category.sentencesCorrect}/{category.totalSentences} речень
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Прогрес слів */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Вивчені слова
                    </span>
                    <span className="text-sm font-bold text-brewords-blue">
                      {wordsProgress}%
                    </span>
                  </div>
                  <Progress 
                    value={wordsProgress} 
                    className="h-2"
                  />
                </div>
                
                {/* Прогрес речень */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Правильні речення
                    </span>
                    <span className="text-sm font-bold text-brewords-accent">
                      {sentencesProgress}%
                    </span>
                  </div>
                  <Progress 
                    value={sentencesProgress} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryStats;
