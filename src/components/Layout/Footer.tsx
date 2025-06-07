
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-brewords-blue to-brewords-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brewords-blue to-brewords-accent bg-clip-text text-transparent">
                BreWords
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Вивчайте іноземні мови легко та цікаво з нашими інтерактивними іграми та флеш-картками.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Навчання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/topics" className="text-gray-600 dark:text-gray-400 hover:text-brewords-blue transition-colors">
                  Тематичні уроки
                </Link>
              </li>
              <li>
                <Link to="/vocabulary" className="text-gray-600 dark:text-gray-400 hover:text-brewords-blue transition-colors">
                  Словник
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Підтримка</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@brewords.com" className="text-gray-600 dark:text-gray-400 hover:text-brewords-blue transition-colors">
                  Зв'язок
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brewords-blue transition-colors">
                  Допомога
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 BreWords. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
