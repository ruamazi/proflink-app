import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">{t('publicProfile.notFound.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('publicProfile.notFound.description')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>{t('publicProfile.notFound.goHome')}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
