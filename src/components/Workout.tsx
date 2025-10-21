import { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import { type WorkoutType } from '../types';
import { getTodayString, getWeekDays, formatDate } from '../utils/date';
import { useTranslation } from '../i18n/useTranslation';

export const Workout = () => {
  const { addWorkoutEntry, deleteWorkoutEntry, getWorkoutsByDate } = useStore();
  const { t } = useTranslation();

  const workoutTypes: { type: WorkoutType; label: string; emoji: string; color: string }[] = [
    { type: 'legs', label: t('workoutTypes.legs'), emoji: '🦵', color: 'bg-blue-500' },
    { type: 'chest', label: t('workoutTypes.chest'), emoji: '💪', color: 'bg-red-500' },
    { type: 'back', label: t('workoutTypes.back'), emoji: '🏋️', color: 'bg-green-500' },
    { type: 'arms', label: t('workoutTypes.arms'), emoji: '💪', color: 'bg-yellow-500' },
    { type: 'cardio', label: t('workoutTypes.cardio'), emoji: '🏃', color: 'bg-purple-500' },
  ];
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [selectedType, setSelectedType] = useState<WorkoutType>('legs');
  const [exercises, setExercises] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddWorkout = () => {
    if (!exercises.trim()) {
      alert(t('enterWorkout'));
      return;
    }

    addWorkoutEntry({
      date: selectedDate,
      type: selectedType,
      exercises: exercises.split('\n').filter((e) => e.trim()),
      notes: notes || undefined,
    });

    setExercises('');
    setNotes('');
  };

  const todayWorkouts = getWorkoutsByDate(selectedDate);
  const weekDays = getWeekDays(new Date(selectedDate));

  return (
    <div className="space-y-4">
      {/* Weekly Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">{t('weeklyWorkout')}</h3>
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
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:bg-gray-700'
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">{t('addWorkout')}</h3>

        {/* Workout Type Selection */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
          {workoutTypes.map((workout) => (
            <button
              key={workout.type}
              onClick={() => setSelectedType(workout.type)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedType === workout.type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{workout.emoji}</div>
              <div className="text-xs font-medium">{workout.label}</div>
            </button>
          ))}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('date')}</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Exercises */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('exerciseList')}
          </label>
          <textarea
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            placeholder={t('exercisePlaceholder')}
            className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('notes')}</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('todaysCondition')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <button
          onClick={handleAddWorkout}
          className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          {t('addWorkout')}
        </button>
      </div>

      {/* Today's Workouts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {formatDate(selectedDate, 'MM월 dd일')} {t('workoutHistory')}
        </h3>
        {todayWorkouts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">{t('noWorkouts')}</p>
        ) : (
          <div className="space-y-3">
            {todayWorkouts.map((workout) => {
              const workoutInfo = workoutTypes.find((w) => w.type === workout.type);
              return (
                <div
                  key={workout.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{workoutInfo?.emoji}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-100">{workoutInfo?.label}</span>
                    </div>
                    <button
                      onClick={() => deleteWorkoutEntry(workout.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {workout.exercises.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                  {workout.notes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">{workout.notes}</p>
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
