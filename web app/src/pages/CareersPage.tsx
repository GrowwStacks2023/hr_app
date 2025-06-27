import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Users, ArrowRight, Briefcase } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
import Api from '../helper/api';

const CareersPage: React.FC = () => {
  const { candidates } = useJobs();
  const [jobs, setJobs] = useState<any[]>([]);

  // ✅ Get all jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await Api.jobListAll();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Failed to fetch jobs');
    }
  };


  // Only show published jobs
  const publishedJobs = jobs.filter(job => job.status === 'published');



  const getJobCandidateCount = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobId === jobId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Build the future of automation with us. We're looking for passionate individuals
              who want to make a real impact in transforming how businesses operate.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{publishedJobs.length} Open Positions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">
              Discover exciting opportunities to grow your career with us
            </p>
          </div>

          <div className="grid gap-8">
            {publishedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h6 className="text-gray-700 mb-6 leading-relaxed"><b>Job Title</b></h6>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          Department: {job.department}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          Company: {job.companyName}
                        </span>

                      </div>
                    </div>

                  </div>
                  <h6 className="text-gray-700 mb-6 leading-relaxed"><b>Job Description</b></h6>
                  <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/admin/applyform/${job.createdBy}?job_id=${job.id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    >
                      Apply
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {publishedJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions at the moment</h3>
              <p className="text-gray-500 mb-6">
                We're always looking for talented individuals. Check back soon for new opportunities!
              </p>
            </div>
          )}
        </div>
      </section>



    </div>
  );
};

export default CareersPage;