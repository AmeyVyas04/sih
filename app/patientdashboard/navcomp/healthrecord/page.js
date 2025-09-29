// app/patientdashboard/navcomp/healthrecord/page.js
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaArrowLeft,
  FaHeart,
  FaChartLine,
  FaBed,
  FaRunning,
  FaAppleAlt,
  FaWater,
  FaSmile,
  FaCalendarAlt,
  FaClipboardList,
  FaUserMd,
  FaStar,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy health data
  const healthData = {
    overview: {
      wellnessScore: 78,
      improvement: 12,
      lastCheckup: '2024-01-10',
      nextTherapy: 'Abhyanga - Jan 15, 2024',
      activeTherapies: 2,
      completedSessions: 8
    },
    vitals: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      sleepQuality: '7.2/10',
      stressLevel: 'Moderate',
      energyLevel: 'High',
      digestion: 'Good'
    },
    progress: [
      { month: 'Oct', wellness: 65, sleep: 6.2, energy: 6 },
      { month: 'Nov', wellness: 68, sleep: 6.5, energy: 6.5 },
      { month: 'Dec', wellness: 72, sleep: 6.8, energy: 7 },
      { month: 'Jan', wellness: 78, sleep: 7.2, energy: 8 }
    ],
    therapyBenefits: [
      {
        therapy: 'Abhyanga Therapy',
        sessions: 4,
        benefits: [
          'Improved sleep quality by 35%',
          'Reduced stress levels significantly',
          'Better skin texture and glow',
          'Enhanced blood circulation'
        ],
        doctor: 'Dr. Rajesh Sharma',
        rating: 4.8
      },
      {
        therapy: 'Shirodhara Treatment',
        sessions: 4,
        benefits: [
          'Mental clarity improved by 40%',
          'Reduced headache frequency',
          'Better focus and concentration',
          'Calmer mind throughout day'
        ],
        doctor: 'Dr. Priya Patel',
        rating: 4.9
      }
    ],
    lifestyle: {
      diet: 'Vegetarian, Balanced',
      exercise: 'Yoga 4x/week, Walking daily',
      waterIntake: '2.5L daily',
      sleep: '7-8 hours/night',
      meditation: '15 mins daily'
    },
    recommendations: [
      'Continue Abhyanga therapy for 2 more weeks',
      'Increase water intake to 3L daily',
      'Add Pranayama to morning routine',
      'Follow prescribed diet strictly'
    ]
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Health Records</h1>
          <p className="text-amber-100 mt-2">Track your wellness journey and therapy benefits</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wellness Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">Your Wellness Score</h2>
              <p className="text-gray-600 mt-2">Based on your therapy progress and lifestyle</p>
            </div>
            
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-amber-500 rounded-full flex items-center justify-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{healthData.overview.wellnessScore}</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <FaArrowUp className="mr-1" />
                +{healthData.overview.improvement}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 lg:mt-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaClipboardList className="text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Active Therapies</p>
                <p className="text-lg font-bold text-gray-900">{healthData.overview.activeTherapies}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaCalendarAlt className="text-amber-600" />
                </div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-lg font-bold text-gray-900">{healthData.overview.completedSessions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartLine },
                { id: 'benefits', label: 'Therapy Benefits', icon: FaHeart },
                { id: 'vitals', label: 'Vitals', icon: FaRunning },
                { id: 'progress', label: 'Progress', icon: FaArrowUp },
                { id: 'lifestyle', label: 'Lifestyle', icon: FaAppleAlt }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Next Therapy */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Next Therapy Session</h3>
                  </div>
                  <p className="text-green-700 font-medium">{healthData.overview.nextTherapy}</p>
                  <p className="text-sm text-green-600 mt-2">With Dr. Rajesh Sharma</p>
                </div>

                {/* Last Checkup */}
                <div className="bg-amber-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <FaUserMd className="text-amber-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Last Checkup</h3>
                  </div>
                  <p className="text-amber-700 font-medium">{healthData.overview.lastCheckup}</p>
                  <p className="text-sm text-amber-600 mt-2">All parameters stable</p>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {[
                    { icon: FaBed, label: 'Sleep Quality', value: healthData.vitals.sleepQuality, color: 'blue' },
                    { icon: FaHeart, label: 'Heart Rate', value: healthData.vitals.heartRate, color: 'red' },
                    { icon: FaRunning, label: 'Energy Level', value: healthData.vitals.energyLevel, color: 'green' },
                    { icon: FaSmile, label: 'Stress Level', value: healthData.vitals.stressLevel, color: 'purple' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-100">
                      <div className={`w-10 h-10 ${stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'red' ? 'bg-red-100' : stat.color === 'green' ? 'bg-green-100' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <stat.icon className={stat.color === 'blue' ? 'text-blue-600' : stat.color === 'red' ? 'text-red-600' : stat.color === 'green' ? 'text-green-600' : 'text-purple-600'} />
                      </div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Therapy Benefits & Improvements</h3>
                
                {healthData.therapyBenefits.map((therapy, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{therapy.therapy}</h4>
                        <p className="text-gray-600">With {therapy.doctor} • {therapy.sessions} sessions completed</p>
                      </div>
                      <div className="flex items-center mt-2 lg:mt-0">
                        <FaStar className="text-amber-400 mr-1" />
                        <span className="font-semibold text-gray-900">{therapy.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {therapy.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <FaArrowUp className="text-white text-xs" />
                          </div>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'vitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(healthData.vitals).map(([key, value]) => (
                  <div key={key} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaHeart className="text-blue-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                    <div className="flex justify-center mt-2">
                      {value === 'High' || value === 'Good' || value === '7.2/10' ? (
                        <FaArrowUp className="text-green-500" />
                      ) : (
                        <FaArrowDown className="text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Wellness Progress Over Time</h3>
                
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {healthData.progress.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-green-600">{month.wellness}</div>
                        <div className="text-sm text-gray-600">Wellness</div>
                        <div className="text-xs text-gray-500 mt-1">{month.month}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bars */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Sleep Quality</span>
                        <span>+1.0 improvement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Energy Levels</span>
                        <span>+2.0 improvement</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Stress Management</span>
                        <span>40% reduction</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lifestyle Habits */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Habits</h3>
                  <div className="space-y-4">
                    {Object.entries(healthData.lifestyle).map(([key, value]) => {
                      const icons = {
                        diet: FaAppleAlt,
                        exercise: FaRunning,
                        waterIntake: FaWater,
                        sleep: FaBed,
                        meditation: FaSmile
                      };
                      const IconComponent = icons[key];
                      return (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <IconComponent className="text-green-600 mr-3" />
                            <span className="font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                          <span className="text-green-600 font-semibold">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctors Recommendations</h3>
                  <div className="space-y-3">
                    {healthData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <FaUserMd className="text-white text-xs" />
                        </div>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Download Report */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-green-600 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-amber-700 transition-all transform hover:scale-105">
            Download Health Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;