import { TodoList } from './TodoList';
import { useStore } from '../store/useStore';
import { Dumbbell, TrendingUp, BookOpen } from 'lucide-react';
import { getTodayString, formatDate } from '../utils/date';

export const Home = () => {
  const { workoutEntries, stockTransactions, diaryEntries } = useStore();

  const today = getTodayString();
  const todayWorkouts = workoutEntries.filter((w) => w.date === today);
  const todayStocks = stockTransactions.filter((s) => s.date === today);
  const todayDiary = diaryEntries.find((d) => d.date === today);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">안녕하세요!</h2>
        <p className="text-sm opacity-90">{formatDate(today, 'yyyy년 MM월 dd일 EEEE')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Dumbbell className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800">{todayWorkouts.length}</p>
          <p className="text-xs text-gray-500">오늘 운동</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <TrendingUp className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800">{todayStocks.length}</p>
          <p className="text-xs text-gray-500">오늘 매매</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <BookOpen className="mx-auto mb-2 text-primary-500" size={24} />
          <p className="text-2xl font-bold text-gray-800">{todayDiary ? '✓' : '-'}</p>
          <p className="text-xs text-gray-500">오늘 일기</p>
        </div>
      </div>

      {/* Todo List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">오늘의 할 일</h3>
        <TodoList />
      </div>
    </div>
  );
};
