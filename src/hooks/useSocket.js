import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { notificationReceived, setConnectionStatus } from '../features/notifications/notificationsSlice';
import { incrementStat } from '../features/dashboard/statsSlice';

let socket; // module-level so we don't reconnect on every re-render

export function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to the Socket.io server
    socket = io(import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:4000');

    socket.on('connect', () => {
      dispatch(setConnectionStatus(true));
      console.log('[socket] Connected to server');
    });

    socket.on('disconnect', () => {
      dispatch(setConnectionStatus(false));
      console.log('[socket] Disconnected from server');
    });

    socket.on('notification:new', (payload) => {
      dispatch(notificationReceived(payload));
      
      // Select appropriate icon for toast notification
      let toastIcon = '🔔';
      if (payload.type === 'property') toastIcon = '🏠';
      if (payload.type === 'transaction') toastIcon = '₦';
      if (payload.type === 'customer') toastIcon = '👥';

      // Trigger a beautiful react-hot-toast notification
      toast(payload.message, {
        icon: toastIcon,
        style: {
          background: '#1f2937',
          color: '#ffffff',
          borderRadius: '8px',
        },
      });
    });

    socket.on('stat:update', (payload) => {
      dispatch(incrementStat(payload));
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [dispatch]);
}
