
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { apiService } from '@/services/api';

interface VocabularyWord {
  id: string;
  english: string;
  ukrainian: string;
  topic: string;
  learned: boolean;
}

const Vocabulary: React.FC = () => {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const sampleWords: VocabularyWord[] = [
    { id: '1', english: 'Hello', ukrainian: 'Привіт', topic: 'Вітання', learned: true },
    { id: '2', english: 'Goodbye', ukrainian: 'До побачення', topic: 'Вітання', learned: true },
    { id: '3', english: 'Thank you', ukrainian: 'Дякую', topic: 'Ввічливість', learned: false },
    { id: '4', english: 'Please', ukrainian: 'Будь ласка', topic: 'Ввічливість', learned: false },
    { id: '5', english: 'Cat', ukrainian: 'Кіт', topic: 'Тварини', learned: true },
    { id: '6', english: 'Dog', ukrainian: 'Собака', topic: 'Тварини', learned: true },
    { id: '7', english: 'House', ukrainian: 'Дім', topic: 'Будинки', learned: false },
    { id: '8', english: 'Car', ukrainian: 'Машина', topic: 'Транспорт', learned: false },
  ];

  useEffect(() => {
    loadVocabulary();
  }, []);

  const loadVocabulary = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setWords(sampleWords);
        setLoading(false);
      }, 1000);
      
      // Real API call would be:
      // const response = await apiService.getVocabulary();
      // if (response.data) {
      //   setWords(response.data);
      // }
    } catch (error) {
      console.error('Failed to load vocabulary:', error);
      setWords(sampleWords);
      setLoading(false);
    }
  };

  const filteredWords = words.filter(word =>
    word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.ukrainian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const learnedCount = words.filter(word => word.learned).length;
  const totalCount = words.length;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
              Мій словник
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ваші вивчені слова та фрази
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-brewords-blue">{totalCount}</CardTitle>
                <CardDescription>Всього слів</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-brewords-accent">{learnedCount}</CardTitle>
                <CardDescription>Вивчено</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-brewords-blue-dark">
                  {totalCount - learnedCount}
                </CardTitle>
                <CardDescription>Ще вивчають</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-8">
            <Input
              placeholder="Пошук слів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWords.map((word) => (
              <Card key={word.id} className={`hover:shadow-lg transition-shadow ${
                word.learned ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : ''
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-brewords-blue">{word.english}</CardTitle>
                      <CardDescription className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {word.ukrainian}
                      </CardDescription>
                    </div>
                    {word.learned && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {word.topic}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      word.learned 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {word.learned ? 'Вивчено' : 'Вивчається'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Слів не знайдено. Спробуйте інший пошуковий запит.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Vocabulary;
