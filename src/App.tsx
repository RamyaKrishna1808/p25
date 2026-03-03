import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AssignmentPage from './pages/AssignmentPage';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginPage onLoginSuccess={() => {}} />;
  }

  return (
    <>
      <Navbar onLogout={logout} />
      <div style={{ minHeight: 'calc(100vh - 70px)' }}>
        {user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
        {/* demonstration form always available after login */}
        <AssignmentPage />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
