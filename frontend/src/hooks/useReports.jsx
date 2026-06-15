import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { REPORTS_STORAGE_KEY } from '../utils/constants';

const ReportsContext = createContext(null);

function readReports() {
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeReports(reports) {
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
}

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState(readReports);

  useEffect(() => {
    writeReports(reports);
  }, [reports]);

  const addReport = useCallback((report) => {
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...report,
    };
    setReports((prev) => [entry, ...prev]);
    return entry;
  }, []);

  const deleteReport = useCallback((id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearReports = useCallback(() => {
    setReports([]);
  }, []);

  const value = useMemo(
    () => ({ reports, addReport, deleteReport, clearReports }),
    [reports, addReport, deleteReport, clearReports],
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within ReportsProvider');
  }
  return context;
}
