import { useEffect } from 'react';
import { FaCheck, FaTimes, FaInfo, FaExclamationTriangle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FaCheck className="text-emerald-400" />,
    error: <FaTimes className="text-red-400" />,
    info: <FaInfo className="text-blue-400" />,
    warning: <FaExclamationTriangle className="text-orange-400" />,
  };

  const colors = {
    success: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
    error: 'from-red-500/20 to-red-600/20 border-red-500/30',
    info: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    warning: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  };

  return (
    <div className={`toast-container bg-gradient-to-r ${colors[type]} border backdrop-blur-md`}>
      <div className="toast-icon">
        {icons[type]}
      </div>
      <p className="toast-message">{message}</p>
      <button onClick={onClose} className="toast-close">
        <FaTimes className="text-xs" />
      </button>
    </div>
  );
};

export default Toast;
