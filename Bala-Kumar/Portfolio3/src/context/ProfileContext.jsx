import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNormalizedProfile } from '../utils/profileRuntime';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [data, setData] = useState(() => getNormalizedProfile());

  useEffect(() => {
    // Re-check in case window.__BEXO_PROFILE__ is injected asynchronously
    const handleUpdate = () => {
      setData(getNormalizedProfile());
    };
    window.addEventListener('bexo_profile_update', handleUpdate);
    return () => window.removeEventListener('bexo_profile_update', handleUpdate);
  }, []);

  return (
    <ProfileContext.Provider value={data}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
