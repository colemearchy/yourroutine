export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  time?: string; // 알림 시간 (HH:mm 형식)
  repeat: boolean;
  category?: 'workout' | 'finance' | 'general';
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD 형식
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkoutType = 'legs' | 'chest' | 'back' | 'arms';

export interface WorkoutEntry {
  id: string;
  date: string; // YYYY-MM-DD 형식
  type: WorkoutType;
  exercises: string[];
  notes?: string;
  createdAt: Date;
}

export interface StockTransaction {
  id: string;
  date: string; // YYYY-MM-DD 형식
  ticker: string; // 종목 코드
  name: string; // 종목명
  quantity: number; // 수량
  price: number; // 가격
  type: 'buy' | 'sell';
  createdAt: Date;
}

export interface AppState {
  todos: Todo[];
  diaryEntries: DiaryEntry[];
  workoutEntries: WorkoutEntry[];
  stockTransactions: StockTransaction[];
}
