import { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import { type WorkoutType } from '../types';
import { getTodayString, getWeekDays, formatDate } from '../utils/date';

const workoutTypes: { type: WorkoutType; label: string; emoji: string; color: string }[] = [
  { type: 'legs', label: '하체', emoji: '🦵', color: 'bg-blue-500' },
  { type: 'chest', label: '가슴', emoji: '💪', color: 'bg-red-500' },
  { type: 'back', label: '등', emoji: '🏋️', color: 'bg-green-500' },
  { type: 'arms', label: '팔', emoji: '💪', color: 'bg-yellow-500' },
];

export const Workout = () => {
  const { addWorkoutEntry, deleteWorkoutEntry, getWorkoutsByDate } = useStore();
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [selectedType, setSelectedType] = useState<WorkoutType>('legs');
  const [exercises, setExercises] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddWorkout = () => {
    if (exercises.trim()) {
      addWorkoutEntry({
        date: selectedDate,
        type: selectedType,
        exercises: exercises.split('\n').filter((e) => e.trim()),
        notes: notes || undefined,
      });
      setExercises('');
      setNotes('');
    }
  };

  const todayWorkouts = getWorkoutsByDate(selectedDate);
  const weekDays = getWeekDays(new Date(selectedDate));

  return (
    <div className="space-y-4">
      {/* Weekly Overview */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">주간 운동 기록</h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const dayString = formatDate(day, 'yyyy-MM-dd');
            const dayWorkouts = getWorkoutsByDate(dayString);
            const isSelected = dayString === selectedDate;

            return (
              <button
                key={dayString}
                onClick={() => setSelectedDate(dayString)}
                className={`p-2 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs font-medium mb-1">
                  {formatDate(day, 'EEE')}
                </div>
                <div className="text-xs mb-1">{formatDate(day, 'd')}</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {dayWorkouts.map((workout) => {
                    const workoutInfo = workoutTypes.find((w) => w.type === workout.type);
                    return (
                      <span key={workout.id} className="text-xs">
                        {workoutInfo?.emoji}
                      </span>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Workout */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">운동 기록 추가</h3>

        {/* Workout Type Selection */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {workoutTypes.map((workout) => (
            <button
              key={workout.type}
              onClick={() => setSelectedType(workout.type)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedType === workout.type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{workout.emoji}</div>
              <div className="text-xs font-medium">{workout.label}</div>
            </button>
          ))}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Exercises */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            운동 목록 (한 줄에 하나씩)
          </label>
          <textarea
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            placeholder="예: 스쿼트 3세트&#10;레그프레스 3세트"
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="오늘의 컨디션, 특이사항 등..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={handleAddWorkout}
          className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          운동 기록 추가
        </button>
      </div>

      {/* Today's Workouts */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {formatDate(selectedDate, 'MM월 dd일')} 운동 기록
        </h3>
        {todayWorkouts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">운동 기록이 없습니다</p>
        ) : (
          <div className="space-y-3">
            {todayWorkouts.map((workout) => {
              const workoutInfo = workoutTypes.find((w) => w.type === workout.type);
              return (
                <div
                  key={workout.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{workoutInfo?.emoji}</span>
                      <span className="font-medium">{workoutInfo?.label}</span>
                    </div>
                    <button
                      onClick={() => deleteWorkoutEntry(workout.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {workout.exercises.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                  {workout.notes && (
                    <p className="text-xs text-gray-500 mt-2 italic">{workout.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
