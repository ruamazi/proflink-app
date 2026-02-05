import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link2, Zap, Shield, Palette, BarChart3, ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('home.features.fast.title'),
      description: t('home.features.fast.description')
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: t('home.features.customizable.title'),
      description: t('home.features.customizable.description')
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            {t('home.hero.badge')}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t('home.hero.title')}<br />
            <span className="text-indigo-600">{t('home.hero.highlight')}</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('home.hero.getStarted')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/u/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all"
            >
              {t('home.hero.viewDemo')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.features.title')}</h2>
            <p className="text-lg text-gray-600">{t('home.features.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors group"
              >
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            {t('home.cta.description')}
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-indigo-600 bg-white rounded-xl hover:bg-gray-100 transition-colors"
          >
            {t('home.cta.button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">profl.ink</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('home.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;