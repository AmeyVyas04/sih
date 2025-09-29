"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // ✅ correct
import {FaSignInAlt} from 'react-icons/fa';

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

  const handleArrayInputChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      [section]: updatedArray
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Form submitted:', formData);
    
    // Simulate API call
    try {
      const response = await fetch('/api/doctor/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push('/doctordashboard/homepage');
      }
      
      // For demo purposes, we'll just redirect after a short delay
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Specialization options
  const specializations = [
    'Panchakarma Therapy', 'Abhyanga', 'Shirodhara', 'Basti', 
    'Nasya', 'Raktamokshana', 'Ayurvedic Nutrition', 'Yoga Therapy',
    'Pranayama', 'Marma Therapy'
  ];

  // Language options
  const languages = [
    'English', 'Hindi', 'Sanskrit', 'Marathi', 'Tamil', 
    'Telugu', 'Malayalam', 'Kannada', 'Other'
  ];

  // Days of the week
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">
            Doctor Registration
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
                    {i}
                  </div>
                  <span className="text-black mt-2">
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
                <h2 className="text-2xl font-semibold text-teal-700">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Professional Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700">Professional Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                      type="text"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.professionalInfo.licenseNumber}
                      onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
                    />
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
                    <input
                      type="number"
                      min="0"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.professionalInfo.yearsOfExperience}
                      onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      rows="4"
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                        className="text-sm text-teal-600 hover:text-teal-800"
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
                            onChange={(e) => handleArrayInputChange('professionalInfo.qualifications', index, 'degree', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                          <input
                            type="text"
                            required
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={qual.institution}
                            onChange={(e) => handleArrayInputChange('professionalInfo.qualifications', index, 'institution', e.target.value)}
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
                              onChange={(e) => handleArrayInputChange('professionalInfo.qualifications', index, 'year', e.target.value)}
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
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Clinic Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700">Clinic Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                    <input
                      type="text"
                      required
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.clinicInfo.clinicName}
                      onChange={(e) => handleInputChange('clinicInfo', 'clinicName', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.address.street}
                        onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'street', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.address.city}
                        onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'city', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.address.state}
                        onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'state', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.address.pincode}
                        onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'pincode', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.address.country}
                        onChange={(e) => handleNestedInputChange('clinicInfo', 'address', 'country', e.target.value)}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.clinicInfo.contactNumber}
                        onChange={(e) => handleInputChange('clinicInfo', 'contactNumber', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
                    <input
                      type="url"
                      className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.clinicInfo.website}
                      onChange={(e) => handleInputChange('clinicInfo', 'website', e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Availability & Services */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700">Availability & Services</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {daysOfWeek.map(day => (
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
                      <input
                        type="time"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.availability.workingHours.start}
                        onChange={(e) => handleNestedInputChange('availability', 'workingHours', 'start', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="time"
                        required
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.availability.workingHours.end}
                        onChange={(e) => handleNestedInputChange('availability', 'workingHours', 'end', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Session Duration (minutes)</label>
                      <input
                        type="number"
                        min="30"
                        max="120"
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.availability.sessionDuration}
                        onChange={(e) => handleInputChange('availability', 'sessionDuration', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Services Offered</label>
                      <button
                        type="button"
                        onClick={addService}
                        className="text-sm text-teal-600 hover:text-teal-800"
                      >
                        + Add Another
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
                            onChange={(e) => handleArrayInputChange('services', index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                          <input
                            type="number"
                            required
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={service.duration}
                            onChange={(e) => handleArrayInputChange('services', index, 'duration', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input
                            type="text"
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={service.description}
                            onChange={(e) => handleArrayInputChange('services', index, 'description', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                          <input
                            type="number"
                            required
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg"
                            value={service.price}
                            onChange={(e) => handleArrayInputChange('services', index, 'price', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          {formData.services.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(index)}
                              className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            >
                              Remove
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
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
           {/* Step 5: Account Setup */}
            {step === 5 && (
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-teal-700">Account Setup</h2>

                <div className="grid grid-cols-1 gap-6">
                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                    type="password"
                    required
                    minLength="8"
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.auth.password}
                    onChange={(e) => handleInputChange('auth', 'password', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                    type="password"
                    required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={formData.auth.confirmPassword}
                    onChange={(e) => handleInputChange('auth', 'confirmPassword', e.target.value)}
                    />
                </div>

                {/* Notifications */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
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
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Submit
                </button>
                </div>
                <div className="text-center pt-4">
                              <p className="text-gray-600">
                                Already have an account?{' '}
                                <a href="/doctorauthfrontend/login" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline flex items-center justify-center">
                                  <FaSignInAlt className="mr-1" />
                                  Sign In
                                </a>
                              </p>
                            </div>
            </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}