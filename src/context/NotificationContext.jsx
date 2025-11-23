import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('animeNotifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }

    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('animeNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  const sendTestNotification = (anime) => {
    if (Notification.permission === 'granted') {
      try {
        const notification = new Notification(`Subscribed to ${anime.title}`, {
          body: 'You will be notified when new episodes are released!',
          icon: anime.poster || '/logo.png',
          badge: '/logo.png',
          tag: `anime-${anime.id}`,
          requireInteraction: false,
          silent: false
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        setTimeout(() => notification.close(), 5000);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };

  const addNotification = async (anime) => {
    const perm = await requestPermission();
    
    if (perm === 'denied') {
      alert('Notifications are blocked. Please enable them in your browser settings to receive episode alerts.');
      return false;
    }

    if (perm !== 'granted') {
      alert('Please allow notifications to get alerts for new episodes!');
      return false;
    }

    const exists = notifications.find(item => item.id === anime.id);
    if (exists) {
      return true;
    }

    setNotifications(prev => [...prev, {
      id: anime.id,
      title: anime.title,
      poster: anime.poster,
      addedAt: new Date().toISOString()
    }]);

    // Send test notification
    sendTestNotification(anime);

    return true;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const isSubscribed = (id) => {
    return notifications.some(item => item.id === id);
  };

  const sendEpisodeNotification = (anime, episodeNumber) => {
    if (Notification.permission === 'granted' && isSubscribed(anime.id)) {
      try {
        const notification = new Notification(`New Episode Available!`, {
          body: `${anime.title} - Episode ${episodeNumber} is now available to watch!`,
          icon: anime.poster || '/logo.png',
          badge: '/logo.png',
          tag: `anime-${anime.id}-ep-${episodeNumber}`,
          requireInteraction: true,
          silent: false,
          data: {
            url: `/watch/${anime.id}?ep=${episodeNumber}`
          }
        });

        notification.onclick = () => {
          window.open(notification.data.url, '_blank');
          notification.close();
        };
      } catch (error) {
        console.error('Error sending episode notification:', error);
      }
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      permission,
      addNotification,
      removeNotification,
      isSubscribed,
      requestPermission,
      sendEpisodeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
