import { Moon, Sun, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Settings = () => {
  const { darkMode, language, toggleDarkMode, setLanguage } = useStore();

  return (
    <div className="space-y-4">
      {/* Dark Mode */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">테마 설정</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={24} className="text-primary-500" /> : <Sun size={24} className="text-primary-500" />}
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">다크 모드</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {darkMode ? '다크 모드 활성화됨' : '라이트 모드 활성화됨'}
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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">언어 설정</h3>
        <div className="flex items-center gap-3 mb-4">
          <Globe size={24} className="text-primary-500" />
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">언어</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              앱에서 사용할 언어를 선택하세요
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
            한국어
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`py-3 px-4 rounded-lg font-medium transition-colors ${
              language === 'en'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">앱 정보</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>버전</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>앱 이름</span>
            <span className="font-medium">알파 루틴</span>
          </div>
          <div className="flex justify-between">
            <span>개발</span>
            <span className="font-medium">Claude Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};
