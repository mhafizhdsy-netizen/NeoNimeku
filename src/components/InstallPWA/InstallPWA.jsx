import { useState, useEffect } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import './InstallPWA.css';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if user dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="install-pwa-container">
      <div className="install-pwa-card">
        <button 
          onClick={handleDismiss}
          className="install-pwa-close"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="install-pwa-icon">
          <HiDevicePhoneMobile className="text-4xl" />
        </div>

        <div className="install-pwa-content">
          <h3 className="install-pwa-title">Install NeoNime App</h3>
          <p className="install-pwa-description">
            Get the best experience with our app! Quick access, offline support, and more.
          </p>
        </div>

        <div className="install-pwa-actions">
          <button 
            onClick={handleInstallClick}
            className="install-pwa-button"
          >
            <FaDownload className="text-sm" />
            <span>Install Now</span>
          </button>
          <button 
            onClick={handleDismiss}
            className="install-pwa-dismiss"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
