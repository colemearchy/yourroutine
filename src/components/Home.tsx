import { TodoList } from './TodoList';
import { useStore } from '../store/useStore';
import { Dumbbell, TrendingUp, BookOpen } from 'lucide-react';
import { getTodayString, formatDate } from '../utils/date';
import { useTranslation } from '../i18n/useTranslation';

export const Home = () => {
  const { workoutEntries, stockTransactions, diaryEntries } = useStore();
  const { t } = useTranslation();

  const today = getTodayString();
  const todayWorkouts = workoutEntries.filter((w) => w.date === today);
  const todayStocks = stockTransactions.filter((s) => s.date === today);
  const todayDiary = diaryEntries.find((d) => d.date === today);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('welcome')}</h2>
        <p className="text-sm opacity-90">{formatDate(today, 'yyyy년 MM월 dd일 EEEE')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
          <Dumbbell className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{todayWorkouts.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('todayWorkout')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
          <TrendingUp className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{todayStocks.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('todayTrade')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
          <BookOpen className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{todayDiary ? '✓' : '-'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('todayDiary')}</p>
        </div>
      </div>

      {/* Todo List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{t('todayTodos')}</h3>
        <TodoList />
      </div>
    </div>
  );
};
