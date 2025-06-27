// src/api.ts
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define API functions
const Api = {
 
  login: (email: string, password: string) => axiosInstance.post('/login', { email, password }),

  createJob: (payload: any) => axiosInstance.post('/jobs', payload),
  jobList: (id: string) => axiosInstance.get(`/jobs/${id}`),
  jobListAll: () => axiosInstance.get('/jobs'),
  deleteJob: (id: number) => axiosInstance.delete(`/jobs/${id}`),
  publishJob: (id: number) => axiosInstance.patch(`/jobs/${id}/publish`),
  closedJob: (id: number) => axiosInstance.patch(`/jobs/${id}/closed`),

  candidateList: (id: string) => axiosInstance.get(`/candidates/${id}`),
  candidateInfo: (id: string) => axiosInstance.get(`/candidateinfo/${id}`),
  // Add more endpoints as needed
};

export default Api;
  