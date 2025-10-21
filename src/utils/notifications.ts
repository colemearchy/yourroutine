export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const scheduleNotification = (title: string, body: string, time: string) => {
  if (Notification.permission !== 'granted') {
    return;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );

  // 이미 지난 시간이면 다음 날로 설정
  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    new Notification(title, {
      body,
      icon: '/icon.png',
      badge: '/badge.png',
    });
  }, timeUntilNotification);
};

export const checkAndScheduleNotifications = (todos: { title: string; time?: string; repeat: boolean }[]) => {
  todos.forEach((todo) => {
    if (todo.time && todo.repeat) {
      scheduleNotification('루틴 알림', todo.title, todo.time);
    }
  });
};
