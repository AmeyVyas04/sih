'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaVenusMars, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaLeaf,
  FaCity,
  FaGlobe,
  FaBirthdayCake,
  FaSignInAlt
} from 'react-icons/fa';

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: {
      city: '',
      state: '',
      country: ''
    },
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 1 || formData.age > 120) newErrors.age = 'Age must be between 1-120';
    
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.country.trim()) newErrors['address.country'] = 'Country is required';
    
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Prepare data for API (remove confirmPassword)
      const { confirmPassword, ...apiData } = formData;
      
      const response = await fetch('/api/patient/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful! Please check your email for verification.');
        router.push('/patientdashboard/homepage');
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          address: { city: '', state: '', country: '' },
          gender: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex items-center justify-center">
              <FaLeaf className="text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Panchakarma Wellness
          </h1>
          <p className="text-gray-600 text-lg mt-2">Begin your journey to natural healing</p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-emerald-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-emerald-800 flex items-center">
                  <FaUser className="mr-2 text-emerald-600" />
                  Personal Information
                </h3>
              </div>

              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                  }`}
                  placeholder="Full Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-emerald-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-emerald-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Phone Number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBirthdayCake className="text-emerald-500" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.age ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaVenusMars className="text-emerald-500" />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.gender ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-emerald-800 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                  Address Information
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCity className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors['address.city'] ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="City"
                  />
                  {errors['address.city'] && <p className="text-red-500 text-sm mt-1">{errors['address.city']}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors['address.state'] ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="State"
                  />
                  {errors['address.state'] && <p className="text-red-500 text-sm mt-1">{errors['address.state']}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors['address.country'] ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Country"
                  />
                  {errors['address.country'] && <p className="text-red-500 text-sm mt-1">{errors['address.country']}</p>}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800 flex items-center">
                <FaLock className="mr-2 text-emerald-600" />
                Security
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-emerald-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-emerald-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full text-black pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-emerald-200 focus:border-emerald-400'
                    }`}
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full  bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaLeaf className="mr-2" />
                  Begin Your Wellness Journey
                </div>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/patientauthfrontend/login" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline flex items-center justify-center">
                  <FaSignInAlt className="mr-1" />
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default PatientSignUp;