import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout/Layout';
import { BookOpen, Target, Gamepad2, Users, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <Layout>
      {/* Hero Section - hide for logged in users */}
      {!isLoggedIn && (
        <section className="bg-gradient-to-br from-brewords-blue to-brewords-accent text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Вивчайте мови легко
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto">
              Інтерактивні ігри, флеш-картки та персоналізоване навчання для швидкого засвоєння іноземних мов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-6 md:px-8 py-3 md:py-4" asChild>
                <Link to="/register">Почати навчання</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-brewords-blue text-lg px-6 md:px-8 py-3 md:py-4" asChild>
                <Link to="/login">Увійти</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Чому BreWords?</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ефективні методи навчання, що роблять вивчення мов цікавим та результативним
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">Флеш-картки</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  Інтерактивні картки для швидкого запам'ятовування нових слів
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">Міні-ігри</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  Захоплюючі ігри для практики та закріплення знань
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">Персоналізація</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  Адаптивне навчання, що підлаштовується під ваш рівень
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">Досягнення</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">
                  Відстежуйте прогрес та отримуйте нагороди за успіхи
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-brewords-blue text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Наші досягнення</h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Тисячі користувачів уже довіряють BreWords для вивчення мов
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-sm md:text-base opacity-80">Активних користувачів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-sm md:text-base opacity-80">Вивчених слів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-sm md:text-base opacity-80">Задоволених користувачів</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-80">Підтримка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Відгуки користувачів</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Дізнайтеся, що кажуть наші користувачі про BreWords
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6">
              <CardContent className="text-center">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "BreWords змінив мій підхід до вивчення мов! Інтерактивні ігри роблять процес захоплюючим."
                </p>
                <div className="font-semibold">Анна К.</div>
                <div className="text-sm text-gray-500">Студентка</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="text-center">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "Завдяки флеш-карткам я швидко запам'ятовую нові слова. Рекомендую всім!"
                </p>
                <div className="font-semibold">Михайло Т.</div>
                <div className="text-sm text-gray-500">Менеджер</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="text-center">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "Зручний інтерфейс та ефективні методи навчання. Моя англійська значно покращилась!"
                </p>
                <div className="font-semibold">Олена С.</div>
                <div className="text-sm text-gray-500">Викладач</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Часті запитання</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Відповіді на найпопулярніші питання про BreWords
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Чи безкоштовний BreWords?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Так! BreWords абсолютно безкоштовний для всіх користувачів. Ми віримо, що якісна освіта має бути доступною для всіх.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Які мови можна вивчати?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Наразі доступна англійська мова для українськомовних користувачів. Ми плануємо додати більше мов у майбутньому.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Скільки часу потрібно займатися щодня?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Рекомендуємо займатися 15-30 хвилин щодня для оптимальних результатів. Регулярність важливіша за тривалість занять.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Чи можна використовувати BreWords офлайн?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Наразі BreWords працює тільки онлайн. Ми працюємо над офлайн-режимом для майбутніх версій.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Отримуйте останні новини
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Підпишіться на нашу розсилку, щоб дізнаватися про нові функції та поради для вивчення мов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Ваша електронна пошта" 
                className="flex-1"
              />
              <Button className="bg-brewords-blue hover:bg-brewords-blue-dark">
                Підписатися
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Ми поважаємо вашу приватність. Відписатися можна в будь-який момент.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - hide for logged in users */}
      {!isLoggedIn && (
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              Готові розпочати свою мовну подорож?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
              Приєднуйтесь до тисяч користувачів, які вже вивчають мови з BreWords
            </p>
            <Button size="lg" className="w-full sm:w-auto bg-brewords-blue hover:bg-brewords-blue-dark text-lg px-6 md:px-8 py-3 md:py-4" asChild>
              <Link to="/register">Розпочати безкоштовно</Link>
            </Button>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;
