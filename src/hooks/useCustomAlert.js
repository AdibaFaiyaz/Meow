import { useState } from 'react';

export const useCustomAlert = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', message: '' });

  const showAlert = (title = '', message = '') => {
    setAlertData({ 
      title: title || '', 
      message: message || '' 
    });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return {
    alertVisible,
    alertData,
    showAlert,
    hideAlert,
  };
};
