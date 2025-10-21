import { useState } from 'react';
import { Plus, Trash2, Check, Clock, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { useTranslation } from '../i18n/useTranslation';

export const TodoList = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useStore();
  const { t } = useTranslation();
  const [newTodo, setNewTodo] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [todoTime, setTodoTime] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({
        title: newTodo,
        completed: false,
        repeat: true,
        time: todoTime || format(new Date(), 'HH:mm'),
        category: 'general',
      });
      setNewTodo('');
      setTodoTime('');
      setShowTimeInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Todo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('newTodo')}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={() => setShowTimeInput(!showTimeInput)}
            className={`p-2 rounded-lg transition-colors ${
              showTimeInput ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Clock size={20} />
          </button>
          <button
            onClick={handleAddTodo}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            {t('addTodo')}
          </button>
        </div>

        {showTimeInput && (
          <div className="flex items-center gap-2 mt-2">
            <Bell size={16} className="text-gray-500 dark:text-gray-400" />
            <input
              type="time"
              value={todoTime}
              onChange={(e) => setTodoTime(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('setAlarmTime')}</span>
          </div>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center text-gray-400 dark:text-gray-500">
            {t('newTodo')}
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-3 transition-all ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                }`}
              >
                {todo.completed && <Check size={16} className="text-white" />}
              </button>

              <div className="flex-1">
                <p className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}>
                  {todo.title}
                </p>
                {todo.time && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Bell size={12} />
                    <span>{todo.time}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
