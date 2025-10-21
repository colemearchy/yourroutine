import { Moon, Sun, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n/useTranslation';

export const Settings = () => {
  const { darkMode, language, toggleDarkMode, setLanguage } = useStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Dark Mode */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('themeSettings')}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={24} className="text-primary-500" /> : <Sun size={24} className="text-primary-500" />}
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">{t('darkMode')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {darkMode ? t('darkModeEnabled') : t('lightModeEnabled')}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              darkMode ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('languageSettings')}</h3>
        <div className="flex items-center gap-3 mb-4">
          <Globe size={24} className="text-primary-500" />
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">{t('language')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('selectLanguage')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('ko')}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              language === 'ko'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('korean')}
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              language === 'en'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('english')}
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('appInfo')}</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>{t('version')}</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>{t('appName')}</span>
            <span className="font-medium">{t('appName')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('developer')}</span>
            <span className="font-medium">Claude Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};
