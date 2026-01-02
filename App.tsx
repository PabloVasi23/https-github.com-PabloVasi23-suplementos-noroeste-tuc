
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ComboAdmin from './pages/ComboAdmin';
import LinkAdmin from './pages/LinkAdmin';
import { db } from './db';

// Fix: Making children optional in the type definition of ProtectedRoute to prevent TypeScript errors 
// when the component is used in JSX with children but the type system doesn't correctly map them to required props.
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const loggedIn = db.isLoggedIn();
  if (!loggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/combos" element={
          <ProtectedRoute>
            <ComboAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/links" element={
          <ProtectedRoute>
            <LinkAdmin />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
