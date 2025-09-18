
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerDashboard from '../pages/CustomerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SweetDetails from '../pages/SweetDetails';
import { useAuth } from '../components/AuthContext';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { user, role } = useAuth();
  if (!user || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer" element={
        <ProtectedRoute role="customer">
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/sweets/:id" element={<SweetDetails />} />
    </Routes>
  </Router>
);

export default AppRoutes;
