import { useState, useEffect } from 'react';
import { Calendar, Save } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTodayString, formatDate } from '../utils/date';

export const Diary = () => {
  const { addDiaryEntry, updateDiaryEntry, getDiaryByDate } = useStore();
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [content, setContent] = useState('');

  useEffect(() => {
    const entry = getDiaryByDate(selectedDate);
    setContent(entry?.content || '');
  }, [selectedDate, getDiaryByDate]);

  const handleSave = () => {
    const existingEntry = getDiaryByDate(selectedDate);

    if (existingEntry) {
      updateDiaryEntry(existingEntry.id, content);
    } else {
      addDiaryEntry({
        date: selectedDate,
        content,
      });
    }
  };

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim()) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary-500" size={20} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {formatDate(selectedDate, 'yyyy년 MM월 dd일 EEEE')}
        </p>
      </div>

      {/* Diary Content */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">오늘의 일기</h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Save size={14} />
            <span>자동 저장</span>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어떠셨나요? 자유롭게 작성해보세요..."
          className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-400">{content.length} 자</span>
        </div>
      </div>
    </div>
  );
};
