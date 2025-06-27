import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// ...other imports

interface FormData {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  designation: string;
  department: string;
  resume: File | null;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  designation?: string;
  department?: string;
  resume?: string;
}

export default function JobApplicationForm() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const companyId = id;
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const jobId = searchParams.get("job_id");

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    designation: '',
    department: '',
    resume: null,
  });


  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file || null,
    }));

    if (errors.resume) {
      setErrors(prev => ({
        ...prev,
        resume: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Highest qualification is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Current designation is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);

      try {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('qualification', formData.qualification);
        form.append('designation', formData.designation);
        form.append('department', formData.department);
        form.append('job_id', jobId || ''); // Include jobId if available
        if (formData.resume) {
          form.append('resume', formData.resume); // 👈 File
        }

        const response = await axios.post(`http://localhost:8000/apply/${companyId}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Applied:', response.data);
        alert('Application submitted successfully!');
        // Redirect to careers page after successful application
        navigate('/careers');
      } catch (error) {
        console.error('Error applying:', error);
        alert('Failed to apply.');
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <>
      {
        !loading ? (<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">

                  Job Application Form - Project Manager
                </h1>
                <p className="text-gray-600 text-sm">

                  Fill this form and our team will contact you soon
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Name <span className="text-red-500">*</span>
                  </label>
                  <input

                    type="text"

                    name="name"

                    value={formData.name}

                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"

                    placeholder=""

                  />

                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Email <span className="text-red-500">*</span>
                  </label>
                  <input

                    type="email"

                    name="email"

                    value={formData.email}

                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"

                    placeholder=""

                  />

                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Phone (with country code)
                  </label>
                  <input

                    type="tel"

                    name="phone"

                    value={formData.phone}

                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"

                    placeholder="(with country code)"

                  />
                </div>

                {/* Highest Qualification Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <input

                    type="text"

                    name="qualification"

                    value={formData.qualification}

                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"

                    placeholder=""

                  />

                  {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
                </div>

                {/* Current Designation Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Current Designation <span className="text-red-500">*</span>
                  </label>
                  <input

                    type="text"

                    name="designation"

                    value={formData.designation}

                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"

                    placeholder=""

                  />

                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Department <span className="text-red-500">*</span>
                  </label>
                  {/* Department Field */}
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                {/* Resume Upload Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Resume <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input

                      type="file"

                      name="resume"

                      onChange={handleFileChange}

                      accept=".pdf,.doc,.docx"

                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"

                    />
                  </div>

                  {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}

                  {formData.resume && (
                    <p className="text-green-600 text-xs mt-1">

                      Selected: {formData.resume.name}
                    </p>

                  )}
                </div>

                {/* Submit Button */}
                <button

                  onClick={handleSubmit}

                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >

                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
          </div>
        )
      }
    </>

  );

}
