import { useState, useEffect } from 'react';
import { Layout, type TabType } from './components/Layout';
import { Home } from './components/Home';
import { Diary } from './components/Diary';
import { Workout } from './components/Workout';
import { Finance } from './components/Finance';
import { Settings } from './components/Settings';
import { requestNotificationPermission, checkAndScheduleNotifications } from './utils/notifications';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { todos, darkMode } = useStore();

  useEffect(() => {
    // Request notification permission on mount
    requestNotificationPermission();

    // Apply dark mode on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Schedule notifications when todos change
    checkAndScheduleNotifications(todos);
  }, [todos]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'diary':
        return <Diary />;
      case 'workout':
        return <Workout />;
      case 'finance':
        return <Finance />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
