
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout/Layout';
import { Home, ChevronRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  ukrainian: string;
  correctOrder: string[];
  words: string[];
}

const UnscrambleSentence: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sample questions for demonstration
  const sampleQuestions: Question[] = [
    {
      id: '1',
      ukrainian: 'Я люблю читати книги',
      correctOrder: ['I', 'love', 'reading', 'books'],
      words: ['books', 'I', 'reading', 'love']
    },
    {
      id: '2',
      ukrainian: 'Кіт спить на столі',
      correctOrder: ['The', 'cat', 'sleeps', 'on', 'the', 'table'],
      words: ['table', 'cat', 'the', 'sleeps', 'The', 'on']
    },
    {
      id: '3',
      ukrainian: 'Вона п\'є воду щодня',
      correctOrder: ['She', 'drinks', 'water', 'every', 'day'],
      words: ['every', 'She', 'water', 'day', 'drinks']
    },
    {
      id: '4',
      ukrainian: 'Ми йдемо в школу',
      correctOrder: ['We', 'go', 'to', 'school'],
      words: ['school', 'to', 'We', 'go']
    },
    {
      id: '5',
      ukrainian: 'Моя сестра грає на піаніно',
      correctOrder: ['My', 'sister', 'plays', 'the', 'piano'],
      words: ['piano', 'plays', 'My', 'the', 'sister']
    }
  ];

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setAvailableWords([...questions[currentIndex].words]);
    }
  }, [questions, currentIndex]);

  const loadQuestions = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setQuestions(sampleQuestions);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load questions:', error);
      setQuestions(sampleQuestions);
      setLoading(false);
    }
  };

  const handleWordSelect = (word: string, index: number) => {
    if (showResult) return;
    
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const handleSelectedWordRemove = (index: number) => {
    if (showResult) return;
    
    const word = selectedWords[index];
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    if (selectedWords.length !== questions[currentIndex].correctOrder.length) return;

    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(questions[currentIndex].correctOrder);
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedWords([]);
        setShowResult(false);
      }
    }, 2000);
  };

  const handleReset = () => {
    setSelectedWords([]);
    setAvailableWords([...questions[currentIndex].words]);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedWords([]);
    setShowResult(false);
    setScore(0);
    if (questions.length > 0) {
      setAvailableWords([...questions[0].words]);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-300 rounded-lg max-w-2xl mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isGameComplete = currentIndex >= questions.length - 1 && showResult;
  const isCorrect = showResult && JSON.stringify(selectedWords) === JSON.stringify(currentQuestion?.correctOrder);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Button variant="ghost" asChild className="mr-4">
                <Link to="/topics">
                  <Home className="w-4 h-4 mr-2" />
                  До тем
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
              Склади речення
            </h1>
            {!isGameComplete && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Питання {currentIndex + 1} з {questions.length}
              </p>
            )}
          </div>

          {!isGameComplete ? (
            <>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
                <div 
                  className="bg-gradient-to-r from-brewords-blue to-brewords-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Ukrainian sentence */}
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-brewords-blue mb-4">
                    {currentQuestion?.ukrainian}
                  </CardTitle>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Складіть речення англійською:
                  </p>
                </CardHeader>
              </Card>

              {/* Selected words area */}
              <Card className="mb-6">
                <CardContent className="py-6">
                  <div className="min-h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-wrap gap-2 items-center">
                    {selectedWords.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center w-full">
                        Перетягніть слова сюди для складання речення
                      </p>
                    ) : (
                      selectedWords.map((word, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="bg-brewords-blue text-white border-brewords-blue hover:bg-brewords-blue-dark"
                          onClick={() => handleSelectedWordRemove(index)}
                          disabled={showResult}
                        >
                          {word}
                        </Button>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Available words */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Доступні слова:</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      disabled={showResult}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Скинути
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {availableWords.map((word, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="hover:bg-brewords-blue hover:text-white hover:border-brewords-blue"
                        onClick={() => handleWordSelect(word, index)}
                        disabled={showResult}
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              {!showResult && (
                <div className="text-center">
                  <Button 
                    onClick={handleCheck}
                    disabled={selectedWords.length !== currentQuestion?.correctOrder.length}
                    className="bg-brewords-blue hover:bg-brewords-blue-dark"
                  >
                    Перевірити
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Result feedback */}
              {showResult && (
                <Card className={`text-center ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200'
                }`}>
                  <CardContent className="py-4">
                    <p className={`text-lg font-semibold ${
                      isCorrect 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {isCorrect ? '✅ Правильно!' : '❌ Неправильно!'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Правильна відповідь: {currentQuestion?.correctOrder.join(' ')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            /* Game Complete */
            <Card className="text-center bg-gradient-to-br from-brewords-blue/10 to-brewords-accent/10">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">
                  🎉 Гра завершена!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-brewords-blue mb-2">
                    Ваш результат: {score} з {questions.length}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {score === questions.length ? 'Відмінно! Всі речення правильні!' :
                     score >= questions.length * 0.8 ? 'Дуже добре!' :
                     score >= questions.length * 0.6 ? 'Непогано!' :
                     'Потрібно більше практики!'}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetGame} className="bg-brewords-blue hover:bg-brewords-blue-dark">
                    Грати знову
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/topics">Спробувати інші ігри</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UnscrambleSentence;
