import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './features/auth/AuthLayout';
import LoginForm from './features/auth/LoginForm';
import DashboardHome from './features/dashboard/DashboardHome';
import MerchantList from './features/management/MerchantList';
import ReportManager from './features/reports/ReportManager';
import { fetchDashboardData } from './actions/dashboard';
import { fetchMerchants } from './actions/merchants';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    // 1. ErrorBoundary catches crashes anywhere in the app
    <ErrorBoundary>
      {/* 2. Root Suspense catches any lazy-loaded layout or protection logic */}
      <Suspense fallback={<div style={rootLoadingStyle}>Loading NSDL Portal...</div>}>
        <Routes>
          {/* Auth Flow */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>

          {/* Banking Portal */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={
                <Suspense fallback={<div>Streaming Banking Stats...</div>}>
                  <DashboardHome dataPromise={fetchDashboardData()} />
                </Suspense>
              } />

              <Route path="/merchants" element={
                <Suspense fallback={<div>Accessing User Directory...</div>}>
                  <MerchantList listPromise={fetchMerchants()} />
                </Suspense>
              } />

              <Route path="/reports" element={<ReportManager />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

const rootLoadingStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  color: '#1a365d'
};

export default App;