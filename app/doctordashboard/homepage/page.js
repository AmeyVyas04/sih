"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaUserMd, FaCalendarAlt, FaNotesMedical, FaStethoscope, 
  FaClinicMedical, FaAward, FaChartLine, FaUsers,
  FaRegSmileBeam, FaBrain, FaShieldAlt, FaBalanceScale,
  FaClock, FaStar, FaArrowRight, FaRegCalendarCheck,
  FaFileMedical, FaHistory, FaUserCircle, FaBell,
  FaCommentMedical, FaChartBar, FaEnvelope, FaMobileAlt,
  FaLeaf, FaHeart, FaUser  // ← ADDED FaUser
} from 'react-icons/fa';
import DoctorNavbar from '../navbar/navbar';
import AppointmentsPanel from '../components/AppointmentPanel';
import PatientRecords from '../components/PatientRecords';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const doctorDataStorage = localStorage.getItem('doctorData');
      if (doctorDataStorage) {
        try {
          setDoctorData(JSON.parse(doctorDataStorage));
        } catch (error) {
          console.error('Error parsing doctor data:', error);
        }
      }
    }
  }, []);

  // Doctor-specific testimonials
  const doctorTestimonials = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Senior Panchakarma Specialist',
      content: 'Using AyurSutra has transformed how I manage patient therapies. The automated scheduling and progress tracking save hours each week.',
      rating: 5
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialization: 'Ayurvedic Physician',
      content: 'The patient feedback system helps me provide more personalized care. My patients recovery rates have improved significantly.',
      rating: 5
    },
    {
      id: 3,
      name: 'Dr. Vikram Singh',
      specialization: 'Panchakarma Expert',
      content: 'Best management software for Ayurvedic practitioners. The analytics help me optimize treatment protocols.',
      rating: 4
    }
  ];

  // Doctor benefits data
  const doctorBenefits = [
    {
      title: 'Efficient Patient Management',
      description: 'Streamline patient records, therapy schedules, and progress tracking in one platform',
      icon: <FaUsers className="text-green-600 text-2xl" />
    },
    {
      title: 'Automated Scheduling',
      description: 'Smart scheduling system that optimizes your time and reduces administrative work',
      icon: <FaCalendarAlt className="text-amber-600 text-2xl" />
    },
    {
      title: 'Progress Analytics',
      description: 'Track patient recovery patterns and therapy effectiveness with detailed analytics',
      icon: <FaChartLine className="text-blue-500 text-2xl" />
    },
    {
      title: 'Secure Communication',
      description: 'Integrated chat system for seamless communication with patients and staff',
      icon: <FaCommentMedical className="text-purple-500 text-2xl" />
    }
  ];

  // Practice management features
  const practiceFeatures = [
    {
      name: 'Patient Dashboard',
      description: 'Comprehensive view of all patient records, therapy progress, and upcoming appointments',
      icon: <FaUserMd className="text-amber-700 text-xl" />
    },
    {
      name: 'Therapy Scheduling',
      description: 'Intelligent scheduling system that considers patient needs and practitioner availability',
      icon: <FaRegCalendarCheck className="text-blue-600 text-xl" />
    },
    {
      name: 'Progress Tracking',
      description: 'Monitor patient recovery with visual progress charts and feedback analysis',
      icon: <FaChartBar className="text-green-600 text-xl" />
    },
    {
      name: 'Treatment Analytics',
      description: 'Analyze therapy effectiveness and patient outcomes with detailed reports',
      icon: <FaStethoscope className="text-red-500 text-xl" />
    }
  ];

  // Today's appointments
  const todaysAppointments = [
    {
      id: 1,
      patientName: 'Raj Kumar',
      time: '10:00 AM',
      therapy: 'Abhyanga',
      duration: '60 mins',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientName: 'Priya Singh',
      time: '2:30 PM',
      therapy: 'Shirodhara',
      duration: '45 mins',
      status: 'Scheduled'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      time: '4:00 PM',
      therapy: 'Consultation',
      duration: '30 mins',
      status: 'Confirmed'
    }
  ];

  // Patient progress data
  const patientProgress = [
    {
      name: 'Raj Kumar',
      therapy: 'Abhyanga',
      progress: 85,
      nextSession: 'Tomorrow 10:00 AM'
    },
    {
      name: 'Priya Singh',
      therapy: 'Shirodhara',
      progress: 60,
      nextSession: 'Today 2:30 PM'
    },
    {
      name: 'Amit Patel',
      therapy: 'Virechana',
      progress: 45,
      nextSession: 'Dec 22, 2:00 PM'
    }
  ];

  // Patient records data
  const patients = [
    {
      id: 'pat_001',
      name: 'Raj Kumar',
      age: 45,
      gender: 'Male',
      condition: 'Chronic Back Pain',
      therapy: 'Abhyanga',
      progress: 85,
      lastSession: '2025-12-18',
      nextSession: '2025-12-20'
    },
    {
      id: 'pat_002',
      name: 'Priya Singh',
      age: 32,
      gender: 'Female',
      condition: 'Stress Management',
      therapy: 'Shirodhara',
      progress: 60,
      lastSession: '2025-12-17',
      nextSession: '2025-12-20'
    },
    {
      id: 'pat_003',
      name: 'Amit Patel',
      age: 55,
      gender: 'Male',
      condition: 'Digestive Issues',
      therapy: 'Virechana',
      progress: 45,
      lastSession: '2025-12-16',
      nextSession: '2025-12-21'
    }
  ];

  return (
    <>
    <DoctorNavbar />
    <div className="min-h-screen bg-amber-50">
      {/* Header - Same colors as patient dashboard */}
      <header className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">AyurSutra Practitioner Portal</h1>
            <p className="text-amber-100">Advanced Panchakarma Management System</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-2xl" />
            <div>
              <p className="font-medium">Welcome, Dr. {doctorData?.name || 'Sharma'}</p>
              <p className="text-sm text-amber-100">Practitioner Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Welcome, Dr. {doctorData?.firstName || 'Sharma'} to Your Practice Management Hub
          </h2>
          <p className="text-gray-600 mb-4">
            Streamline your Panchakarma practice with intelligent scheduling, patient management, and progress tracking tools designed for Ayurvedic practitioners.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/doctor/schedule"
              className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <FaCalendarAlt className="mr-2" /> Manage Schedule
            </Link>
            <Link 
              href="/doctor/patients"
              className="flex items-center border border-amber-600 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <FaUsers className="mr-2" /> View Patients
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaUsers className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Active Patients</h3>
              <p className="text-2xl font-bold text-green-700">24</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <FaRegCalendarCheck className="text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Today's Appointments</h3>
              <p className="text-2xl font-bold text-amber-700">3</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaChartLine className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Success Rate</h3>
              <p className="text-2xl font-bold text-blue-700">96%</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-amber-200 mb-6 bg-white rounded-t-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'overview' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaAward className="mr-2" /> Practice Overview
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'benefits' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaChartLine className="mr-2" /> Features
          </button>
          <button
            onClick={() => setActiveTab('management')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'management' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaStethoscope className="mr-2" /> Patient Management
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'testimonials' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaStar className="mr-2" /> Colleague Reviews
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'patients' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaUser className="mr-2" /> Patient Records
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <FaAward className="mr-2" /> Practice Management Made Simple
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="bg-amber-50 rounded-lg p-5 mb-4 border border-amber-200">
                    <p className="text-gray-700 mb-4">
                      AyurSutra is designed specifically for Panchakarma practitioners to streamline 
                      your practice management while maintaining the authenticity of Ayurvedic treatments. 
                    </p>
                    <p className="text-gray-700 mb-4">
                      Our platform combines ancient wisdom with modern technology to help you focus 
                      on what matters most - patient care and treatment effectiveness.
                    </p>
                    <p className="text-gray-700">
                      From automated scheduling to detailed progress analytics, every feature is 
                      designed to enhance your practice efficiency and patient outcomes.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                      <FaHeart className="mr-2" /> Why Choose AyurSutra?
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Reduce administrative workload by 60%
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Improve patient compliance and outcomes
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Access real-time patient progress data
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Streamline communication with patients
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Track therapy effectiveness with analytics
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-amber-700 text-white p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <FaUserMd className="mr-2" /> Your Practice Analytics
                    </h3>
                    <p className="mb-4">
                      Monitor key metrics that matter for your practice growth and patient satisfaction.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">96%</p>
                        <p className="text-sm">Patient Satisfaction</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm">Active Patients</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-amber-600 text-white p-5 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Quick Start Guide</h3>
                    <p className="mb-3">Get started with these essential features</p>
                    <div className="space-y-2">
                      <Link href="/doctor/patients" className="block text-amber-200 hover:text-white text-sm">
                        • Add New Patients →
                      </Link>
                      <Link href="/doctor/schedule" className="block text-amber-200 hover:text-white text-sm">
                        • Set Up Your Schedule →
                      </Link>
                      <Link href="/doctor/templates" className="block text-amber-200 hover:text-white text-sm">
                        • Create Therapy Templates →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaChartLine className="mr-2" /> Practice Management Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {doctorBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-3">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-green-700">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaAward className="mr-2" /> Advanced Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBell className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Smart Notifications</h4>
                    <p className="text-sm mt-1 text-green-100">Automated reminders for patients and practitioners</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaChartBar className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Progress Analytics</h4>
                    <p className="text-sm mt-1 text-amber-100">Track recovery patterns and therapy effectiveness</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCommentMedical className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Patient Communication</h4>
                    <p className="text-sm mt-1 text-blue-100">Secure messaging and feedback system</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'management' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaStethoscope className="mr-2" /> Patient Management Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {practiceFeatures.map((feature, index) => (
                  <div key={index} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-3">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-700">{feature.name}</h3>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{feature.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Available in your dashboard</span>
                      <Link 
                        href="/doctor/features"
                        className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center"
                      >
                        Explore <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <FaHistory className="mr-2" /> Patient Progress Overview
                </h3>
                <div className="space-y-4">
                  {patientProgress.map((patient, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-green-700">{patient.name}</h4>
                        <p className="text-sm text-gray-600">{patient.therapy}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${patient.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{patient.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500">{patient.nextSession}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaStar className="mr-2" /> Practitioner Testimonials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {doctorTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <FaUserMd className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-700">{testimonial.name}</h3>
                        <p className="text-sm text-amber-600">{testimonial.specialization}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < testimonial.rating ? "text-amber-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <FaLeaf className="mr-2" /> Ready to Transform Your Practice?
                </h3>
                <p className="mb-4">
                  Join hundreds of Ayurvedic practitioners who have revolutionized their practice 
                  management with AyurSutra. Focus more on healing, less on paperwork.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/doctor/setup"
                    className="flex items-center justify-center bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-amber-100 transition-colors"
                  >
                    <FaUserMd className="mr-2" /> Setup Practice
                  </Link>
                  <Link 
                    href="/doctor/features"
                    className="flex items-center justify-center bg-amber-500 text-amber-900 px-4 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
                  >
                    <FaChartLine className="mr-2" /> Explore Features
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Records</h2>
              <PatientRecords patients={patients} />
            </div>
          )}
        </div>

        {/* Appointments Panel */}
        <div className="mb-8">
          <AppointmentsPanel appointments={todaysAppointments} showFilters={true} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <FaClinicMedical className="mr-2" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/doctor/schedule"
              className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors border border-amber-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="text-amber-600" />
                </div>
                <h3 className="font-semibold text-green-700">Manage Schedule</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">View and edit appointments</p>
            </Link>
            
            <Link 
              href="/doctor/patients"
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors border border-green-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaUsers className="text-green-600" />
                </div>
                <h3 className="font-semibold text-green-700">Patient Records</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">Access patient information</p>
            </Link>
            
            <Link 
              href="/doctor/analytics"
              className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors border border-amber-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaChartBar className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-green-700">Practice Analytics</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">View practice insights</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;