import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Todo, type DiaryEntry, type WorkoutEntry, type StockTransaction } from '../types';

interface AppStore {
  // Todos
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;

  // Diary
  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDiaryEntry: (id: string, content: string) => void;
  getDiaryByDate: (date: string) => DiaryEntry | undefined;

  // Workout
  workoutEntries: WorkoutEntry[];
  addWorkoutEntry: (entry: Omit<WorkoutEntry, 'id' | 'createdAt'>) => void;
  deleteWorkoutEntry: (id: string) => void;
  getWorkoutsByDate: (date: string) => WorkoutEntry[];

  // Stock
  stockTransactions: StockTransaction[];
  addStockTransaction: (transaction: Omit<StockTransaction, 'id' | 'createdAt'>) => void;
  deleteStockTransaction: (id: string) => void;
  getStocksByDate: (date: string) => StockTransaction[];
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Todos
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),

      // Diary
      diaryEntries: [],
      addDiaryEntry: (entry) =>
        set((state) => ({
          diaryEntries: [
            ...state.diaryEntries,
            {
              ...entry,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateDiaryEntry: (id, content) =>
        set((state) => ({
          diaryEntries: state.diaryEntries.map((entry) =>
            entry.id === id
              ? { ...entry, content, updatedAt: new Date() }
              : entry
          ),
        })),
      getDiaryByDate: (date) => {
        return get().diaryEntries.find((entry) => entry.date === date);
      },

      // Workout
      workoutEntries: [],
      addWorkoutEntry: (entry) =>
        set((state) => ({
          workoutEntries: [
            ...state.workoutEntries,
            {
              ...entry,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),
      deleteWorkoutEntry: (id) =>
        set((state) => ({
          workoutEntries: state.workoutEntries.filter((entry) => entry.id !== id),
        })),
      getWorkoutsByDate: (date) => {
        return get().workoutEntries.filter((entry) => entry.date === date);
      },

      // Stock
      stockTransactions: [],
      addStockTransaction: (transaction) =>
        set((state) => ({
          stockTransactions: [
            ...state.stockTransactions,
            {
              ...transaction,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),
      deleteStockTransaction: (id) =>
        set((state) => ({
          stockTransactions: state.stockTransactions.filter((t) => t.id !== id),
        })),
      getStocksByDate: (date) => {
        return get().stockTransactions.filter((t) => t.date === date);
      },
    }),
    {
      name: 'routine-storage',
    }
  )
);
