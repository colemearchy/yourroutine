import { type ReactNode } from 'react';
import { Home, BookOpen, Dumbbell, TrendingUp, Settings as SettingsIcon } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export type TabType = 'home' | 'diary' | 'workout' | 'finance' | 'settings';

interface LayoutWithTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: ReactNode;
}

export const Layout = ({ activeTab, onTabChange, children }: LayoutWithTabsProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home' as TabType, label: t('home'), icon: Home },
    { id: 'diary' as TabType, label: t('diary'), icon: BookOpen },
    { id: 'workout' as TabType, label: t('workout'), icon: Dumbbell },
    { id: 'finance' as TabType, label: t('finance'), icon: TrendingUp },
    { id: 'settings' as TabType, label: t('settings'), icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">{t('appName')}</h1>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center py-3 px-4 flex-1 transition-colors ${
                    isActive
                      ? 'text-primary-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs mt-1">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
