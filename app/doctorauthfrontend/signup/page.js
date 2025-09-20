"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, 
  FaIdCard, FaGraduationCap, FaBriefcaseMedical, FaClinicMedical, 
  FaMapMarkerAlt, FaGlobe, FaClock, FaMoneyBillWave, 
  FaLock, FaBell, FaArrowRight, FaArrowLeft, FaCheckCircle 
} from "react-icons/fa";

export default function DoctorRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      profilePhoto: ''
    },
    professionalInfo: {
      licenseNumber: '',
      specialization: [],
      yearsOfExperience: '',
      qualifications: [{ degree: '', institution: '', year: '' }],
      bio: '',
      languages: []
    },
    clinicInfo: {
      clinicName: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      geoLocation: {
        latitude: '',
        longitude: ''
      },
      contactNumber: '',
      website: ''
    },
    availability: {
      workingDays: [],
      workingHours: {
        start: '',
        end: ''
      },
      sessionDuration: 60,
      breakTime: {
        start: '',
        end: '',
        duration: ''
      }
    },
    services: [{
      name: '',
      description: '',
      duration: '',
      price: ''
    }],
    auth: {
      password: '',
      confirmPassword: ''
    },
    notifications: {
      email: true,
      sms: true,
      push: true
    }
  });

  const router = useRouter();

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subSection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value
        }
      }
    }));
  };

  // Fixed handleArrayInputChange for nested arrays
  const handleNestedArrayInputChange = (section, subSection, index, field, value) => {
    setFormData(prev => {
      const updatedArray = [...prev[section][subSection]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: updatedArray
        }
      };
    });
  };

  // Separate function for top-level arrays like services
  const handleTopLevelArrayInputChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        qualifications: [
          ...prev.professionalInfo.qualifications,
          { degree: '', institution: '', year: '' }
        ]
      }
    }));
  };

  const removeQualification = (index) => {
    if (formData.professionalInfo.qualifications.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        qualifications: prev.professionalInfo.qualifications.filter((_, i) => i !== index)
      }
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        { name: '', description: '', duration: '', price: '' }
      ]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

 // In your handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/auth/doctor/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      alert('Registration successful! Please wait for admin approval.');
      router.push('/patientdashboard/homepage');
    } else {
      // Show error message
      alert(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Network error. Please try again.');
  }
};
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const specializations = [
    'Panchakarma Therapy', 'Abhyanga', 'Shirodhara', 'Basti', 
    'Nasya', 'Raktamokshana', 'Ayurvedic Nutrition', 'Yoga Therapy',
    'Pranayama', 'Marma Therapy'
  ];

  const languages = [
    'English', 'Hindi', 'Sanskrit', 'Marathi', 'Tamil', 
    'Telugu', 'Malayalam', 'Kannada', 'Other'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-2 flex items-center justify-center">
            <FaBriefcaseMedical className="mr-2" /> Doctor Registration
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Join our network of Ayurvedic professionals
          </p>
          
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${step >= i ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > i ? <FaCheckCircle /> : i}
                  </div>
                  <span className="text-xs text-black mt-2">
                    {i === 1 && 'Personal'}
                    {i === 2 && 'Professional'}
                    {i === 3 && 'Clinic'}
                    {i === 4 && 'Availability'}
                    {i === 5 && 'Account'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700 flex items-center">
                  <FaUser className="mr-2" /> Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="relative">
                      <FaVenusMars className="absolute left-3 top-3 text-gray-400" />
                      <select
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.personalInfo.gender}
                        onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Professional Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700 flex items-center">
                  <FaGraduationCap className="mr-2" /> Professional Information
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.professionalInfo.licenseNumber}
                        onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {specializations.map((spec) => (
                        <div key={spec} className="flex items-center">
                          <input
                            type="checkbox"
                            id={spec}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                            checked={formData.professionalInfo.specialization.includes(spec)}
                            onChange={(e) => {
                              const updatedSpecs = e.target.checked
                                ? [...formData.professionalInfo.specialization, spec]
                                : formData.professionalInfo.specialization.filter(s => s !== spec);
                              handleInputChange('professionalInfo', 'specialization', updatedSpecs);
                            }}
                          />
                          <label htmlFor={spec} className="ml-2 text-sm text-gray-700">{spec}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <div className="relative">
                      <FaBriefcaseMedical className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.professionalInfo.yearsOfExperience}
                        onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.professionalInfo.bio}
                      onChange={(e) => handleInputChange('professionalInfo', 'bio', e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {languages.map((lang) => (
                        <div key={lang} className="flex items-center">
                          <input
                            type="checkbox"
                            id={lang}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                            checked={formData.professionalInfo.languages.includes(lang)}
                            onChange={(e) => {
                              const updatedLangs = e.target.checked
                                ? [...formData.professionalInfo.languages, lang]
                                : formData.professionalInfo.languages.filter(l => l !== lang);
                              handleInputChange('professionalInfo', 'languages', updatedLangs);
                            }}
                          />
                          <label htmlFor={lang} className="ml-2 text-sm text-gray-700">{lang}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                      <button
                        type="button"
                        onClick={addQualification}
                        className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
                      >
                        + Add Another
                      </button>
                    </div>
                    
                    {formData.professionalInfo.qualifications.map((qual, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                          <input
                            type="text"
                            required
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={qual.degree}
                            onChange={(e) => handleNestedArrayInputChange('professionalInfo', 'qualifications', index, 'degree', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                          <input
                            type="text"
                            required
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={qual.institution}
                            onChange={(e) => handleNestedArrayInputChange('professionalInfo', 'qualifications', index, 'institution', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                              type="number"
                              required
                              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                              value={qual.year}
                              onChange={(e) => handleNestedArrayInputChange('professionalInfo', 'qualifications', index, 'year', e.target.value)}
                            />
                          </div>
                          {formData.professionalInfo.qualifications.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeQualification(index)}
                              className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Clinic Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700 flex items-center">
                  <FaClinicMedical className="mr-2" /> Clinic Information
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                    <div className="relative">
                      <FaClinicMedical className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.clinicName}
                        onChange={(e) => handleInputChange('clinicInfo', 'clinicName', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.address.street}
                          onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'street', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.address.city}
                          onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'city', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.address.state}
                          onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'state', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.address.pincode}
                          onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'pincode', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.address.country}
                          onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'country', e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Phone</label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          required
                          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={formData.clinicInfo.contactNumber}
                          onChange={(e) => handleInputChange('clinicInfo', 'contactNumber', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
                    <div className="relative">
  <FaGlobe className="absolute left-3 top-3 text-gray-400" />
  <input
    type="url"
    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    value={formData.clinicInfo.website}
    onChange={(e) => handleInputChange('clinicInfo', 'website', e.target.value)}
    placeholder="https://example.com"
  />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (optional)</label>
    <div className="relative">
      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
      <input
        type="number"
        step="any"
        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        value={formData.clinicInfo.geoLocation.latitude}
        onChange={(e) => handleNestedInputChange('clinicInfo', 'geoLocation', 'latitude', e.target.value)}
        placeholder="e.g., 19.0760"
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (optional)</label>
    <div className="relative">
      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
      <input
        type="number"
        step="any"
        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        value={formData.clinicInfo.geoLocation.longitude}
        onChange={(e) => handleNestedInputChange('clinicInfo', 'geoLocation', 'longitude', e.target.value)}
        placeholder="e.g., 72.8777"
      />
    </div>
  </div>
</div>
</div>

<div className="flex justify-between mt-8">
  <button
    type="button"
    onClick={prevStep}
    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
  >
    <FaArrowLeft className="mr-2" /> Back
  </button>
  <button
    type="button"
    onClick={nextStep}
    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
  >
    Next <FaArrowRight className="ml-2" />
  </button>
</div>
</div>
)}

{/* Step 4: Availability & Services */}
{step === 4 && (
<div className="space-y-6">
  <h2 className="text-2xl font-semibold text-teal-700 flex items-center">
    <FaClock className="mr-2" /> Availability & Services
  </h2>
  
  <div className="grid grid-cols-1 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center">
            <input
              type="checkbox"
              id={day}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500"
              checked={formData.availability.workingDays.includes(day)}
              onChange={(e) => {
                const updatedDays = e.target.checked
                  ? [...formData.availability.workingDays, day]
                  : formData.availability.workingDays.filter(d => d !== day);
                handleInputChange('availability', 'workingDays', updatedDays);
              }}
            />
            <label htmlFor={day} className="ml-2 text-sm text-gray-700">{day}</label>
          </div>
        ))}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="time"
            required
            className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={formData.availability.workingHours.start}
            onChange={(e) => handleNestedInputChange('availability', 'workingHours', 'start', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="time"
            required
            className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={formData.availability.workingHours.end}
            onChange={(e) => handleNestedInputChange('availability', 'workingHours', 'end', e.target.value)}
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Session Duration (minutes)</label>
      <div className="relative">
        <FaClock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="number"
          min="15"
          step="15"
          required
          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={formData.availability.sessionDuration}
          onChange={(e) => handleInputChange('availability', 'sessionDuration', e.target.value)}
        />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Break Start Time (optional)</label>
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="time"
            className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={formData.availability.breakTime.start}
            onChange={(e) => handleNestedInputChange('availability', 'breakTime', 'start', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Break End Time (optional)</label>
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="time"
            className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={formData.availability.breakTime.end}
            onChange={(e) => handleNestedInputChange('availability', 'breakTime', 'end', e.target.value)}
          />
        </div>
      </div>
    </div>
    
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">Services Offered</label>
        <button
          type="button"
          onClick={addService}
          className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
        >
          + Add Service
        </button>
      </div>
      
      {formData.services.map((service, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
              value={service.name}
              onChange={(e) => handleTopLevelArrayInputChange('services', index, 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              min="15"
              step="15"
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
              value={service.duration}
              onChange={(e) => handleTopLevelArrayInputChange('services', index, 'duration', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={service.description}
              onChange={(e) => handleTopLevelArrayInputChange('services', index, 'description', e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                min="0"
                required
                className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                value={service.price}
                onChange={(e) => handleTopLevelArrayInputChange('services', index, 'price', e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-end justify-end">
            {formData.services.length > 1 && (
              <button
                type="button"
                onClick={() => removeService(index)}
                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              >
                Remove Service
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  <div className="flex justify-between mt-8">
    <button
      type="button"
      onClick={prevStep}
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
    <button
      type="button"
      onClick={nextStep}
      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
    >
      Next <FaArrowRight className="ml-2" />
    </button>
  </div>
</div>
)}

{/* Step 5: Account Setup */}
{step === 5 && (
<div className="space-y-6">
  <h2 className="text-2xl font-semibold text-teal-700 flex items-center">
    <FaLock className="mr-2" /> Account Setup
  </h2>
  
  <div className="grid grid-cols-1 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="password"
          required
          minLength="8"
          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={formData.auth.password}
          onChange={(e) => handleInputChange('auth', 'password', e.target.value)}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="password"
          required
          className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={formData.auth.confirmPassword}
          onChange={(e) => handleInputChange('auth', 'confirmPassword', e.target.value)}
        />
      </div>
    </div>
    
    <div>
      <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaBell className="mr-2" /> Notification Preferences
      </label>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="email-notifications"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
            checked={formData.notifications.email}
            onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
          />
          <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">Email Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sms-notifications"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
            checked={formData.notifications.sms}
            onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
          />
          <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">SMS Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="push-notifications"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500"
            checked={formData.notifications.push}
            onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
          />
          <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-700">Push Notifications</label>
        </div>
      </div>
    </div>
    
    <div className="flex items-center">
      <input
        type="checkbox"
        id="terms"
        required
        className="h-4 w-4 text-teal-600 focus:ring-teal-500"
      />
      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
        I agree to the Terms of Service and Privacy Policy
      </label>
    </div>
  </div>
  
  <div className="flex justify-between mt-8">
    <button
      type="button"
      onClick={prevStep}
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
    <button
      type="submit"
      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
    >
      Complete Registration <FaCheckCircle className="ml-2" />
    </button>
  </div>
</div>
)}
</form>
</div>
</div>
</div>
);
}