import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import AdminDashboard from "./pages/AdminDashboard";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

export const LOGO_URL = "https://i.ibb.co/Mxp58wRB/logo.png";

const PrivateRoute = ({ children, adminOnly = false }) => {
 const { user, loading } = useAuth();

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
   </div>
  );
 }

 if (!user) {
  return <Navigate to="/login" replace />;
 }

 if (adminOnly && !user.isAdmin) {
  return <Navigate to="/dashboard" replace />;
 }

 return children;
};

const PublicRoute = ({ children }) => {
 const { user, loading } = useAuth();

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
   </div>
  );
 }

 if (user) {
  return <Navigate to="/dashboard" replace />;
 }

 return children;
};

function AppContent() {
 return (
  <div className="min-h-screen bg-gray-50">
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route
     path="/login"
     element={
      <PublicRoute>
       <Login />
      </PublicRoute>
     }
    />
    <Route
     path="/register"
     element={
      <PublicRoute>
       <Register />
      </PublicRoute>
     }
    />
    <Route path="/u/:username" element={<PublicProfile />} />
    <Route
     path="/dashboard"
     element={
      <PrivateRoute>
       <Layout>
        <Dashboard />
       </Layout>
      </PrivateRoute>
     }
    />
    <Route
     path="/profile"
     element={
      <PrivateRoute>
       <Layout>
        <Profile />
       </Layout>
      </PrivateRoute>
     }
    />
    <Route
     path="/admin"
     element={
      <PrivateRoute adminOnly={true}>
       <Layout>
        <AdminDashboard />
       </Layout>
      </PrivateRoute>
     }
    />
    <Route path="/terms" element={<TermsOfService />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="*" element={<NotFound />} />
   </Routes>
  </div>
 );
}

function App() {
 return (
  <AuthProvider>
   <AppContent />
  </AuthProvider>
 );
}

export default App;
