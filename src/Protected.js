import React from 'react';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

function Protected() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}

export default Protected;
