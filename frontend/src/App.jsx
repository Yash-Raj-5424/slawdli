import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import { ReportsProvider } from './hooks/useReports';
import Home from './pages/Home';
import Reports from './pages/Reports';
import About from './pages/About';

export default function App() {
  return (
    <ErrorBoundary>
      <ReportsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="reports" element={<Reports />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReportsProvider>
    </ErrorBoundary>
  );
}
