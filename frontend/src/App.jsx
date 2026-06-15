import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import { ReportsProvider } from './hooks/useReports';
import { AuthProvider } from './hooks/useAuth';
import Home from './pages/Home';
import Reports from './pages/Reports';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteProfile from './pages/auth/CompleteProfile';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ReportsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<Home />} />
                <Route path="analyze" element={<Home />} />
                <Route path="reports" element={<Reports />} />
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="complete-profile" element={<CompleteProfile />} />
            </Routes>
          </BrowserRouter>
        </ReportsProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
