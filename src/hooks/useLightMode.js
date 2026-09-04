import { useEffect, useState } from 'react';

const readTheme = () => {
  try {
    return (localStorage.getItem('theme') || 'dark') === 'light';
  } catch {
    return false;
  }
};

const useLightMode = () => {
  const [isLight, setIsLight] = useState(readTheme);

  useEffect(() => {
    const handleThemeChange = (event) => setIsLight(event.detail?.theme === 'light');
    const handleStorage = (event) => {
      if (event.key === 'theme') setIsLight(event.newValue === 'light');
    };

    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return isLight;
};

export default useLightMode;
