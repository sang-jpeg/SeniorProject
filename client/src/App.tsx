import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { store } from './store';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import CertificationManagement from './pages/admin/CertificationManagement';
import PaymentManagement from './pages/admin/PaymentManagement';

// Tester Pages
import TesterDashboard from './pages/tester/Dashboard';
import CertificationCenter from './pages/tester/CertificationCenter';
import TestCycles from './pages/tester/TestCycles';
import MyIssues from './pages/tester/MyIssues';
import MyEarnings from './pages/tester/MyEarnings';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import Projects from './pages/client/Projects';
import TestCaseManagement from './pages/client/TestCaseManagement';
import Reports from './pages/client/Reports';

// Shared Pages
import Profile from './pages/shared/Profile';
import NotFound from './pages/shared/NotFound';

// Protected Route Component
const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  allowedRoles?: string[];
}> = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return element;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<DashboardLayout />}>
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      element={<AdminDashboard />}
                      allowedRoles={['admin']}
                    />
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute
                      element={<UserManagement />}
                      allowedRoles={['admin']}
                    />
                  }
                />
                <Route
                  path="/admin/certifications"
                  element={
                    <ProtectedRoute
                      element={<CertificationManagement />}
                      allowedRoles={['admin']}
                    />
                  }
                />
                <Route
                  path="/admin/payments"
                  element={
                    <ProtectedRoute
                      element={<PaymentManagement />}
                      allowedRoles={['admin']}
                    />
                  }
                />
              </Route>

              {/* Tester Routes */}
              <Route element={<DashboardLayout />}>
                <Route
                  path="/tester"
                  element={
                    <ProtectedRoute
                      element={<TesterDashboard />}
                      allowedRoles={['tester']}
                    />
                  }
                />
                <Route
                  path="/tester/certifications"
                  element={
                    <ProtectedRoute
                      element={<CertificationCenter />}
                      allowedRoles={['tester']}
                    />
                  }
                />
                <Route
                  path="/tester/test-cycles"
                  element={
                    <ProtectedRoute
                      element={<TestCycles />}
                      allowedRoles={['tester']}
                    />
                  }
                />
                <Route
                  path="/tester/issues"
                  element={
                    <ProtectedRoute
                      element={<MyIssues />}
                      allowedRoles={['tester']}
                    />
                  }
                />
                <Route
                  path="/tester/earnings"
                  element={
                    <ProtectedRoute
                      element={<MyEarnings />}
                      allowedRoles={['tester']}
                    />
                  }
                />
              </Route>

              {/* Client Routes */}
              <Route element={<DashboardLayout />}>
                <Route
                  path="/client"
                  element={
                    <ProtectedRoute
                      element={<ClientDashboard />}
                      allowedRoles={['client']}
                    />
                  }
                />
                <Route
                  path="/client/projects"
                  element={
                    <ProtectedRoute
                      element={<Projects />}
                      allowedRoles={['client']}
                    />
                  }
                />
                <Route
                  path="/client/test-cases"
                  element={
                    <ProtectedRoute
                      element={<TestCaseManagement />}
                      allowedRoles={['client']}
                    />
                  }
                />
                <Route
                  path="/client/reports"
                  element={
                    <ProtectedRoute
                      element={<Reports />}
                      allowedRoles={['client']}
                    />
                  }
                />
              </Route>

              {/* Shared Routes */}
              <Route element={<DashboardLayout />}>
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<Profile />} />}
                />
              </Route>

              {/* Default Routes */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 