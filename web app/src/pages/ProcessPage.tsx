import React from 'react';
import { FileText, Bot, Phone, Users, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const ProcessPage: React.FC = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Application Submission',
      description: 'Submit your application through our online form with your resume and cover letter.',
      details: [
        'Complete the online application form',
        'Upload your resume (PDF format)',
        'Provide contact information',
        'Answer basic screening questions'
      ],
      duration: '5 minutes',
      status: 'active'
    },
    {
      icon: Bot,
      title: 'AI Resume Screening',
      description: 'Our AI system analyzes your resume against job requirements for initial compatibility.',
      details: [
        'Automated resume parsing and analysis',
        'Skills and experience matching',
        'Education and certification verification',
        'Initial compatibility scoring'
      ],
      duration: 'Instant',
      status: 'automated'
    },
    {
      icon: CheckCircle,
      title: 'Technical Assessment',
      description: 'Complete a technical assessment to evaluate your domain knowledge and problem-solving skills.',
      details: [
        '10 technical questions',
        'Project management scenarios',
        'Automation tool knowledge',
        'Problem-solving capabilities'
      ],
      duration: '30 minutes',
      status: 'interactive'
    },
    {
      icon: Phone,
      title: 'AI Voice Interview',
      description: 'Participate in an AI-powered voice interview to assess communication and behavioral fit.',
      details: [
        'Behavioral interview questions',
        'Communication skills assessment',
        'Cultural fit evaluation',
        'Career goals discussion'
      ],
      duration: '20-30 minutes',
      status: 'interactive'
    },
    {
      icon: Users,
      title: 'Final Interview',
      description: 'Meet with our hiring team for a comprehensive discussion about the role and your experience.',
      details: [
        'Meet with hiring manager',
        'Technical deep-dive discussion',
        'Team fit assessment',
        'Role expectations alignment'
      ],
      duration: '45-60 minutes',
      status: 'human'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'automated': return 'bg-green-100 text-green-800';
      case 'interactive': return 'bg-purple-100 text-purple-800';
      case 'human': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'automated': return '🤖';
      case 'interactive': return '💻';
      case 'human': return '👥';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Hiring Process</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We've designed a comprehensive, fair, and efficient hiring process that combines 
              cutting-edge AI technology with human insight to find the best talent.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>5-Step Process</span>
              </div>
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Human Touch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From application to offer, here's what you can expect during our hiring process
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hidden md:block"></div>
                  
                  <div className="md:ml-16">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="p-8">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                              <step.icon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                  Step {index + 1}: {step.title}
                                </h3>
                                <div className="flex items-center space-x-3">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(step.status)}`}>
                                    {getStatusIcon(step.status)} {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                                  </span>
                                  <span className="text-gray-500 text-sm flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {step.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                              {step.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600 text-sm">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Process Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've combined the best of technology and human judgment to create a fair, 
              efficient, and comprehensive hiring experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Efficiency</h3>
              <p className="text-gray-600">
                Our AI system ensures quick, unbiased initial screening while maintaining 
                high standards for candidate evaluation.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Human Connection</h3>
              <p className="text-gray-600">
                Despite our use of technology, we ensure every candidate has meaningful 
                human interaction throughout the process.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fair & Transparent</h3>
              <p className="text-gray-600">
                Every step is clearly defined with transparent criteria, ensuring 
                all candidates are evaluated fairly and consistently.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProcessPage;