import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import JobDetailsPage from './pages/JobDetailsPage';
import ProcessPage from './pages/ProcessPage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CandidateManagement from './pages/admin/CandidateManagement';
import JobManagement from './pages/admin/JobManagement';
import CreateJob from './pages/admin/CreateJob';
import ProtectedRoute from './components/ProtectedRoute';
import JobApplicationForm from './pages/Candidate/ApplyForm';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<CareersPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/applyform/:id" element={<JobApplicationForm />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/candidate_details/:id" element={
                  <ProtectedRoute>
                    <JobDetailsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/candidates" element={
                  <ProtectedRoute>
                    <CandidateManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/jobs" element={
                  <ProtectedRoute>
                    <JobManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/jobs/create" element={
                  <ProtectedRoute>
                    <CreateJob />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;