
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout/Layout';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  english: string;
  correct: string;
  options: string[];
}

const GuessWord: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sample questions for demonstration
  const sampleQuestions: Question[] = [
    {
      id: '1',
      english: 'Hello',
      correct: 'Привіт',
      options: ['Привіт', 'До побачення', 'Дякую', 'Будь ласка']
    },
    {
      id: '2',
      english: 'Cat',
      correct: 'Кіт',
      options: ['Собака', 'Кіт', 'Миша', 'Птах']
    },
    {
      id: '3',
      english: 'Water',
      correct: 'Вода',
      options: ['Молоко', 'Сік', 'Вода', 'Чай']
    },
    {
      id: '4',
      english: 'House',
      correct: 'Дім',
      options: ['Школа', 'Дім', 'Магазин', 'Парк']
    },
    {
      id: '5',
      english: 'Book',
      correct: 'Книга',
      options: ['Зошит', 'Ручка', 'Книга', 'Олівець']
    }
  ];

  useEffect(() => {
    loadQuestions();
  }, []);

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

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // Check if answer is correct
    const isCorrect = selectedAnswer === questions[currentIndex].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
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
              Вгадай слово
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

              {/* Question */}
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-brewords-blue mb-4">
                    {currentQuestion?.english}
                  </CardTitle>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Оберіть правильний переклад:
                  </p>
                </CardHeader>
              </Card>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentQuestion?.options.map((option, index) => {
                  let buttonClass = "h-16 text-lg transition-all duration-200 ";
                  
                  if (showResult) {
                    if (option === currentQuestion.correct) {
                      buttonClass += "bg-green-500 hover:bg-green-600 text-white border-green-500";
                    } else if (option === selectedAnswer && option !== currentQuestion.correct) {
                      buttonClass += "bg-red-500 hover:bg-red-600 text-white border-red-500";
                    } else {
                      buttonClass += "bg-gray-100 text-gray-400 cursor-not-allowed";
                    }
                  } else if (selectedAnswer === option) {
                    buttonClass += "bg-brewords-blue hover:bg-brewords-blue-dark text-white border-brewords-blue";
                  } else {
                    buttonClass += "bg-white hover:bg-gray-50 text-gray-900 border-gray-200 hover:border-brewords-blue";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              {/* Action Button */}
              {!showResult && (
                <div className="text-center">
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className="bg-brewords-blue hover:bg-brewords-blue-dark"
                  >
                    Підтвердити
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Result feedback */}
              {showResult && selectedAnswer && (
                <Card className={`text-center ${
                  selectedAnswer === currentQuestion?.correct 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200'
                }`}>
                  <CardContent className="py-4">
                    <p className={`text-lg font-semibold ${
                      selectedAnswer === currentQuestion?.correct 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === currentQuestion?.correct ? '✅ Правильно!' : '❌ Неправильно!'}
                    </p>
                    {selectedAnswer !== currentQuestion?.correct && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Правильна відповідь: {currentQuestion?.correct}
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
                    {score === questions.length ? 'Відмінно! Всі відповіді правильні!' :
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

export default GuessWord;
