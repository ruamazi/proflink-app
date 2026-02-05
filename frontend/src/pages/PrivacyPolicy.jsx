import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">{t('common.back')}</span>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('privacy.title')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('privacy.lastUpdated')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.introduction.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.introduction.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.dataCollection.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              {t('privacy.sections.dataCollection.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('privacy.sections.dataCollection.items.email')}</li>
              <li>{t('privacy.sections.dataCollection.items.username')}</li>
              <li>{t('privacy.sections.dataCollection.items.profile')}</li>
              <li>{t('privacy.sections.dataCollection.items.usage')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.dataUse.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              {t('privacy.sections.dataUse.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('privacy.sections.dataUse.items.service')}</li>
              <li>{t('privacy.sections.dataUse.items.improvement')}</li>
              <li>{t('privacy.sections.dataUse.items.communication')}</li>
              <li>{t('privacy.sections.dataUse.items.security')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.dataSharing.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.dataSharing.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.dataSecurity.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.dataSecurity.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.cookies.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.cookies.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.rights.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              {t('privacy.sections.rights.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('privacy.sections.rights.items.access')}</li>
              <li>{t('privacy.sections.rights.items.correction')}</li>
              <li>{t('privacy.sections.rights.items.deletion')}</li>
              <li>{t('privacy.sections.rights.items.portability')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.changes.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.changes.content')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('privacy.sections.contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.sections.contact.content')}
            </p>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('privacy.footerNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
