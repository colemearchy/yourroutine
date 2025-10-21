import { useState, useEffect } from 'react';
import { Layout, type TabType } from './components/Layout';
import { Home } from './components/Home';
import { Diary } from './components/Diary';
import { Workout } from './components/Workout';
import { Finance } from './components/Finance';
import { requestNotificationPermission, checkAndScheduleNotifications } from './utils/notifications';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { todos } = useStore();

  useEffect(() => {
    // Request notification permission on mount
    requestNotificationPermission();
  }, []);

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
