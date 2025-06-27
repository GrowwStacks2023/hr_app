import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react';
import { useJobs } from '../../contexts/JobContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Api from '../../helper/api';

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
    const { user } = useAuth();


  const [formData, setFormData] = useState({
    title : '',
    department : '',
    description : '',
    resumeScreenInstructions : '',
    resumeScreenQualificationScore : '',
    technicalAssessmentInstructions : '',
    technicalAssessmentScore : '',
    teleinterviewinstruction : '',
    teleinterviewscore : '',
    teleRoundScore : '',
    teleRoundPrompt : '',
    status: 'draft', // Default status
    createdBy: user?.id || '', // Assuming user context provides the current user's ID
    companyName : user?.name || '',
});


 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const payload = {
        ...formData,
      };
  
      // Send data to backend
      const response = await Api.createJob(payload);
  
      console.log('Job created:', response.data);
  
      // Redirect after success
      navigate('/admin/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    }
  };

  const handleSaveAsDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    handleSubmit(new Event('submit') as any);
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/jobs')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create a new job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              >
                <option value="" disabled selected>Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
                {/* <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Engineering"
                /> */}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the role, what the candidate will be doing, and what makes this opportunity exciting..."
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Resume Screen Instructions *
              </label>
              <textarea
                id="resumeScreenInstructions"
                name="resumeScreenInstructions"
                required
                rows={4}
                value={formData.resumeScreenInstructions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Resume Screen Qualification Score *
              </label>
              <input
                type="text"
                id="resumeScreenQualificationScore"
                name="resumeScreenQualificationScore"
                required
                value={formData.resumeScreenQualificationScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Techincal Assessment Instructions *
              </label>
              <textarea
                id="technicalAssessmentInstructions"
                name="technicalAssessmentInstructions"
                required
                rows={4}
                value={formData.technicalAssessmentInstructions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Score for Technical Assessment *
              </label>
              <textarea
                id="technicalAssessmentScore"
                name="technicalAssessmentScore"
                required
                rows={4}
                value={formData.technicalAssessmentScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Prompt for Tele Round Assessment *
              </label>
              <textarea
                id="teleRoundPrompt"
                name="teleRoundPrompt"
                required
                rows={4}
                value={formData.teleRoundPrompt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Score for Tele Round Assessment *
              </label>
              <textarea
                id="teleRoundScore"
                name="teleRoundScore"
                required
                rows={4}
                value={formData.teleRoundScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Tele Interview Instructions *
              </label>
              <textarea
                id="teleinterviewinstruction"
                name="teleinterviewinstruction"
                required
                rows={4}
                value={formData.teleinterviewinstruction}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Tele Interview Score *
              </label>
              <textarea
                id="teleinterviewscore"
                name="teleinterviewscore"
                required
                rows={4}
                value={formData.teleinterviewscore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>




          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/jobs')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>Publish Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;