import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ResumeAnalyzer from '../pages/ResumeAnalyzer';
import GitHubReviewer from '../pages/GitHubReviewer';
import AIChat from '../pages/AIChat';
import Visualizer from '../pages/Visualizer';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Workspace Pages with DashboardLayout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/github" element={<GitHubReviewer />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
