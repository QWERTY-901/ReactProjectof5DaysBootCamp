import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthSystem from './components/AuthSystem';
import DashboardHome from './features/dashboard/DashboardHome';
import PlaceholderPage from './features/dashboard/PlaceholderPage';
import AuditTrailPage from './features/audit/AuditTrailPage';
import UserListReportPage from './features/userManagement/UserListReportPage';
import CreateCBCUserPage from './features/userManagement/CreateCBCUserPage';
import ErrorBoundary from './components/common/ErrorBoundary';


function App() {
  return (
    // 1. ErrorBoundary catches crashes anywhere in the app
    <ErrorBoundary>
      {/* 2. Root Suspense catches any lazy-loaded layout or protection logic */}
      <Suspense fallback={<div style={rootLoadingStyle}>Loading NSDL Portal...</div>}>
        <Routes>
          {/* Redirect root to login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<AuthSystem />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route
                path="/user-management"
                element={
                  <Navigate to="/user-management/user-list-report" replace />
                }
              />
              <Route
                path="/user-management/create-cbc-user"
                element={<CreateCBCUserPage />}
              />
              <Route
                path="/user-management/user-request"
                element={<UserListReportPage variant="request" />}
              />
              <Route
                path="/user-management/user-list-report"
                element={<UserListReportPage variant="report" />}
              />
              <Route path="/audit-trail" element={<AuditTrailPage />} />
              <Route
                path="/wallet-adjustment"
                element={<PlaceholderPage title="Wallet Adjustment" />}
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
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