import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: 'draft' | 'published' | 'closed';
  applicationUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  appliedAt: string;
  status: 'applied' | 'screening' | 'assessment' | 'interview' | 'selected' | 'rejected';
  resumeUrl?: string;
  screeningScore?: number;
  assessmentScore?: number;
  interviewScore?: number;
  notes?: string;
}

interface JobContextType {
  jobs: Job[];
  candidates: Candidate[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  publishJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
  getCandidatesByJobId: (jobId: string) => Candidate[];
  updateCandidateStatus: (candidateId: string, status: Candidate['status']) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Initialize with demo data
    const demoJobs: Job[] = [
      {
        id: 'project-manager',
        title: 'Project Manager - Automation Projects',
        department: 'Project Management',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120K - $150K',
        experience: '5+ years',
        description: 'We are seeking an experienced Project Manager with a strong background in automation projects to join our dynamic team.',
        requirements: [
          '5+ years of project management experience',
          'PMP certification preferred',
          'Experience with automation tools',
          'Strong leadership skills'
        ],
        responsibilities: [
          'Lead automation projects from conception to deployment',
          'Manage cross-functional teams',
          'Ensure successful project delivery',
          'Coordinate with stakeholders'
        ],
        benefits: [
          'Competitive salary',
          'Health insurance',
          'Flexible work arrangements',
          'Professional development budget'
        ],
        status: 'published',
        applicationUrl: 'https://outskill-gef.app.n8n.cloud/form/48cb51a9-6193-4162-b4bf-375dd6e6a681',
        createdAt: '2025-01-01T10:00:00Z',
        updatedAt: '2025-01-01T10:00:00Z'
      },
      {
        id: 'automation-engineer',
        title: 'Senior Automation Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        salary: '$130K - $160K',
        experience: '4+ years',
        description: 'Design and implement automation solutions using cutting-edge technologies.',
        requirements: [
          '4+ years automation experience',
          'Python/JavaScript expertise',
          'RPA tools knowledge',
          'Problem-solving skills'
        ],
        responsibilities: [
          'Design automation solutions',
          'Implement RPA workflows',
          'Collaborate with development teams',
          'Optimize existing processes'
        ],
        benefits: [
          'Competitive salary',
          'Remote work options',
          'Learning opportunities',
          'Stock options'
        ],
        status: 'published',
        applicationUrl: 'https://outskill-gef.app.n8n.cloud/form/48cb51a9-6193-4162-b4bf-375dd6e6a681',
        createdAt: '2025-01-02T10:00:00Z',
        updatedAt: '2025-01-02T10:00:00Z'
      }
    ];

    const demoCandidates: Candidate[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0123',
        jobId: 'project-manager',
        jobTitle: 'Project Manager - Automation Projects',
        appliedAt: '2025-01-15T09:30:00Z',
        status: 'interview',
        screeningScore: 85,
        assessmentScore: 78,
        notes: 'Strong technical background, good communication skills'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0124',
        jobId: 'project-manager',
        jobTitle: 'Project Manager - Automation Projects',
        appliedAt: '2025-01-14T14:20:00Z',
        status: 'assessment',
        screeningScore: 92,
        notes: 'Excellent experience with automation projects'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1-555-0125',
        jobId: 'automation-engineer',
        jobTitle: 'Senior Automation Engineer',
        appliedAt: '2025-01-13T11:15:00Z',
        status: 'selected',
        screeningScore: 88,
        assessmentScore: 85,
        interviewScore: 90,
        notes: 'Outstanding technical skills, great cultural fit'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1-555-0126',
        jobId: 'project-manager',
        jobTitle: 'Project Manager - Automation Projects',
        appliedAt: '2025-01-12T16:45:00Z',
        status: 'rejected',
        screeningScore: 65,
        notes: 'Insufficient experience with automation tools'
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1-555-0127',
        jobId: 'automation-engineer',
        jobTitle: 'Senior Automation Engineer',
        appliedAt: '2025-01-11T08:30:00Z',
        status: 'screening',
        notes: 'Recently applied, pending initial review'
      }
    ];

    setJobs(demoJobs);
    setCandidates(demoCandidates);
  }, []);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setJobs(prev => [...prev, newJob]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { ...job, ...updates, updatedAt: new Date().toISOString() }
        : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const publishJob = (id: string) => {
    updateJob(id, { status: 'published' });
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getCandidatesByJobId = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobId === jobId);
  };

  const updateCandidateStatus = (candidateId: string, status: Candidate['status']) => {
    setCandidates(prev => prev.map(candidate =>
      candidate.id === candidateId
        ? { ...candidate, status }
        : candidate
    ));
  };

  const value = {
    jobs,
    candidates,
    addJob,
    updateJob,
    deleteJob,
    publishJob,
    getJobById,
    getCandidatesByJobId,
    updateCandidateStatus
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};