import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { jobs, candidates } = useJobs();
  const { user } = useAuth();

  // Calculate statistics
  const totalJobs = jobs.length;
  const publishedJobs = jobs.filter(job => job.status === 'published').length;
  const totalCandidates = candidates.length;
  const pendingCandidates = candidates.filter(c => ['applied', 'screening', 'assessment'].includes(c.status)).length;
  const selectedCandidates = candidates.filter(c => c.status === 'selected').length;
  const rejectedCandidates = candidates.filter(c => c.status === 'rejected').length;

  // Recent candidates (last 5)
  const recentCandidates = candidates
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 5);

  // Job application stats
  const jobStats = jobs.map(job => ({
    ...job,
    applicantCount: candidates.filter(c => c.jobId === job.id).length
  }));

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>

       

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/jobs/create"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Job</span>
            </Link>
            
            <Link
              to="/admin/candidates"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
            >
              <Users className="h-5 w-5" />
              <span>View All Candidates</span>
            </Link>
            
            <Link
              to="/admin/jobs"
              className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
            >
              <Briefcase className="h-5 w-5" />
              <span>Manage Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;