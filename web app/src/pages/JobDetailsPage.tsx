import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import Api from '../helper/api';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const candidate_id = id;

  const [candidate, setCandidate] = useState<any | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidate_id) {
        alert('Candidate ID is missing');
        return;
      }
      try {
        const response = await Api.candidateInfo(candidate_id);
        setCandidate(response.data);
      } catch (err) {
        alert('Candidate not found or API error');
      }
    };

    fetchCandidate();
  }, [id]);

  if (!candidate_id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Candidate Not Found</h1>
          <Link to="/admin/candidates" className="text-blue-600 hover:text-blue-800">
            Back
          </Link>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl text-gray-700">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/admin/candidates"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{candidate.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {candidate.designation}
                </span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {candidate.department}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(candidate.created_at).toLocaleDateString()}
                </div>
                
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="font-semibold">Email:</span> {candidate.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {candidate.phone}
                </div>
                <div>
                  <span className="font-semibold">Qualification:</span> {candidate.qualification}
                </div>
                <div>
                  <span className="font-semibold">Resume:</span>{' '}
                  {candidate.resume_path ? (
                    <a
                      href={`http://localhost:8000/${candidate.resume_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:underline"
                    >
                      View Resume <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  ) : (
                    'Not uploaded'
                  )}
                </div>
                <div>
                  <span className="font-semibold">Screening Result:</span>{' '}
                  {candidate.screening_result ?? 'Pending'}
                </div>
                <div>
                  <span className="font-semibold">Screening Reason:</span>{' '}
                  {candidate.screening_reason_result ?? 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;