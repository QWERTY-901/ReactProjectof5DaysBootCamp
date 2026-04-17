import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    // If not logged in, redirect to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;