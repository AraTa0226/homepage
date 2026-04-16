import React, { createContext, useContext, useState, useEffect } from 'react';
import cmsData from '../data/cms.json';

interface CalendarContextType {
  holidays: Record<string, number[]>;
  updateHolidays: (monthKey: string, days: number[]) => void;
  saveCalendar: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holidays, setHolidays] = useState<Record<string, number[]>>((cmsData as any).calendar || {});

  // Load from localStorage on init if no CMS data exists
  useEffect(() => {
    if ((cmsData as any).calendar) return; // Prioritize local CMS
    const saved = localStorage.getItem('sound_ang_holidays');
    if (saved) {
      try {
        setHolidays(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load holidays', e);
      }
    }
  }, []);

  const updateHolidays = (monthKey: string, days: number[]) => {
    setHolidays(prev => ({
      ...prev,
      [monthKey]: days
    }));
  };

  const saveCalendar = async () => {
    // Keep local storage as a fallback layer
    localStorage.setItem('sound_ang_holidays', JSON.stringify(holidays));

    // Save to the codebase directly if in local Dev Mode!
    if (import.meta.env.DEV) {
      try {
        await fetch('/api/save-cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ calendar: holidays })
        });
        console.log('Saved to Local CMS');
      } catch (e) {
        console.error('Failed to save to local CMS', e);
      }
    }
  };

  return (
    <CalendarContext.Provider value={{ holidays, updateHolidays, saveCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
