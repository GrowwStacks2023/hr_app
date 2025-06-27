import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import Api from '../../helper/api';
import { useAuth } from '../../contexts/AuthContext';


const JobManagement: React.FC = () => {
  const { candidates, deleteJob, publishJob, updateJob } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobs, setJobs] = useState<any[]>([]);
  const { user } = useAuth();



    // ✅ Get all jobs on load
    useEffect(() => {
      fetchJobs();
    }, []);
  
    const fetchJobs = async () => {
      try {
        const response = await Api.jobList(user?.id || '');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to fetch jobs');
      }
    };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // ❌ Delete job by ID
  const handleDeleteJob = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await Api.deleteJob(id);
      await fetchJobs(); // Refresh the jobs list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <AlertCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };



 
  const handlePublishJob = async (jobId: number) => {
    try {
      const response = await Api.publishJob(jobId);
      alert(`✅ Job "${response.data.title}" published successfully!`);
      await fetchJobs(); // Refresh the jobs list after deletion
      // Optionally re-fetch jobs list here
    } catch (error) {
      console.error('❌ Failed to publish job:', error);
      alert('Failed to publish job. Please try again.');
    }
  };

  const handleCloseJob = async (jobId: number) => {
    try {
      const response = await Api.closedJob(jobId);
      alert(`✅ Job "${response.data.title}" published successfully!`);
      await fetchJobs(); // Refresh the jobs list after deletion
      // Optionally re-fetch jobs list here
    } catch (error) {
      console.error('❌ Failed to publish job:', error);
      alert('Failed to publish job. Please try again.');
    }
  };

  const getJobCandidateCount = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobId === jobId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600 mt-2">Create, edit, and manage job postings</p>
          </div>
          <Link
            to="/admin/jobs/create"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Job</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-gray-900">
                  {jobs.filter(job => job.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-3xl font-bold text-gray-900">
                  {jobs.filter(job => job.status === 'draft').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{candidates.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div> */}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                      <h6 className="text-gray-700 mb-6 leading-relaxed"><b>Job Title</b></h6>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          Department: {job.department}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          Company: {job.companyName}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
                        </span>
                      </div>
                    </div>
                    <h6 className="text-gray-700 mb-6 leading-relaxed"><b>Job Description</b></h6>

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {/* <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{getJobCandidateCount(job.id)} applications</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Created {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div> */}
                      </div>

                      <div className="flex items-center space-x-2">
                        {job.status === 'draft' && (
                          <button
                            onClick={() => handlePublishJob(job.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Publish
                          </button>
                        )}
                        
                        {job.status === 'published' && (
                          <button
                            onClick={() => handleCloseJob(job.id)}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors duration-200"
                          >
                            Close
                          </button>
                        )}

                        {/* <Link 
                          to={`/job/${job.id}`}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </Link> */}


                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first job posting.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link
                to="/admin/jobs/create"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Create Your First Job</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;