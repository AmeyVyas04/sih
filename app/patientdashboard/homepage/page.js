"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PatientNavbar from '../navfooter/navbar/navbar';
import { 
  FaHeart, FaCalendarAlt, FaNotesMedical, FaUserMd, 
  FaClinicMedical, FaAward, FaLeaf, FaSpa, 
  FaRegSmileBeam, FaBrain, FaShieldAlt, FaBalanceScale,
  FaClock, FaStar, FaArrowRight, FaRegCalendarCheck,
  FaFileMedical, FaHistory, FaUserCircle
} from 'react-icons/fa';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDataStorage = localStorage.getItem('patientData');
      if (userDataStorage) {
        try {
          setUserData(JSON.parse(userDataStorage));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      therapy: 'Abhyanga & Shirodhara',
      content: 'After just two weeks of Panchakarma, my chronic back pain has reduced significantly. I feel more energetic and at peace.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      therapy: 'Virechana',
      content: 'This treatment helped me overcome digestive issues I had for years. The staff is knowledgeable and caring.',
      rating: 5
    },
    {
      id: 3,
      name: 'Vikram Singh',
      therapy: 'Basti',
      content: 'My stress levels have decreased dramatically. I sleep better and feel more focused throughout the day.',
      rating: 4
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: 'Detoxification',
      description: 'Eliminates toxins from your body at a cellular level',
      icon: <FaLeaf className="text-green-600 text-2xl" />
    },
    {
      title: 'Improved Digestion',
      description: 'Enhances digestive fire (Agni) for better nutrient absorption',
      icon: <FaHeart className="text-amber-600 text-2xl" />
    },
    {
      title: 'Stress Relief',
      description: 'Calms the nervous system and promotes mental clarity',
      icon: <FaBrain className="text-blue-500 text-2xl" />
    },
    {
      title: 'Enhanced Immunity',
      description: 'Strengthens your body\'s natural defense mechanisms',
      icon: <FaShieldAlt className="text-purple-500 text-2xl" />
    }
  ];

  // Therapies data
  const therapies = [
    {
      name: 'Abhyanga',
      description: 'Therapeutic oil massage that rejuvenates tissues and promotes relaxation',
      duration: '60-90 mins',
      icon: <FaSpa className="text-amber-700 text-xl" />
    },
    {
      name: 'Shirodhara',
      description: 'Continuous flow of warm oil on forehead for deep relaxation and mental clarity',
      duration: '45-60 mins',
      icon: <FaRegSmileBeam className="text-blue-600 text-xl" />
    },
    {
      name: 'Basti',
      description: 'Medicated enema therapy that cleanses and nourishes the colon',
      duration: '30-45 mins',
      icon: <FaBalanceScale className="text-green-600 text-xl" />
    },
    {
      name: 'Virechana',
      description: 'Purification therapy that cleanses the gastrointestinal tract',
      duration: 'Varies',
      icon: <FaClinicMedical className="text-red-500 text-xl" />
    }
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      date: '15 Nov 2023',
      time: '10:00 AM',
      therapy: 'Abhyanga',
      doctor: 'Dr. Sharma',
      status: 'Confirmed'
    },
    {
      id: 2,
      date: '18 Nov 2023',
      time: '2:30 PM',
      therapy: 'Consultation',
      doctor: 'Dr. Patel',
      status: 'Scheduled'
    }
  ];

  return (
    <>
    <PatientNavbar/>
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ayurvedic Healing Center</h1>
            <p className="text-amber-100">Traditional Wellness for Modern Life</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-2xl" />
            <div>
              <p className="font-medium">Welcome to{userData ? `, ${userData.name}` : ''}</p>
              <p className="text-sm text-amber-100">Patient Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Welcome{userData ? `, ${userData.firstName}` : ''} to Your Healing Journey
          </h2>
          <p className="text-gray-600 mb-4">
            Discover the ancient wisdom of Ayurveda and transform your health through personalized Panchakarma therapies
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/patient/schedule"
              className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <FaCalendarAlt className="mr-2" /> Book Therapy
            </Link>
            <Link 
              href="/patient/therapies"
              className="flex items-center border border-amber-600 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <FaNotesMedical className="mr-2" /> My Treatments
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaRegCalendarCheck className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Upcoming Sessions</h3>
              <p className="text-2xl font-bold text-green-700">2</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <FaFileMedical className="text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Completed Therapies</h3>
              <p className="text-2xl font-bold text-amber-700">5</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaHistory className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Wellness Score</h3>
              <p className="text-2xl font-bold text-blue-700">82%</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-amber-200 mb-6 bg-white rounded-t-lg">
          <button
            onClick={() => setActiveTab('intro')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'intro' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaAward className="mr-2" /> Introduction
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'benefits' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaHeart className="mr-2" /> Benefits
          </button>
          <button
            onClick={() => setActiveTab('therapies')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'therapies' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaSpa className="mr-2" /> Therapies
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'testimonials' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600'}`}
          >
            <FaStar className="mr-2" /> Success Stories
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-md p-6 mb-8">
          {activeTab === 'intro' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <FaAward className="mr-2" /> What is Panchakarma?
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="bg-amber-50 rounded-lg p-5 mb-4 border border-amber-200">
                    <p className="text-gray-700 mb-4">
                      Panchakarma is Ayurveda's premier detoxification and rejuvenation program. 
                      Literally meaning "five actions," it's a comprehensive process that helps 
                      remove deep-rooted stress and illness-causing toxins from your body while 
                      balancing your doshas (biological energies).
                    </p>
                    <p className="text-gray-700 mb-4">
                      This ancient healing method goes beyond simple detox - it's a transformative 
                      journey that restores your body's innate healing ability and brings you to 
                      a state of optimal health and wellness.
                    </p>
                    <p className="text-gray-700">
                      Our personalized Panchakarma programs are designed by expert Ayurvedic 
                      physicians who consider your unique constitution, health status, and wellness goals.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                      <FaHeart className="mr-2" /> Why Choose Panchakarma?
                    </h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Eliminates toxins that modern medicine often can't address
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Restores your body's natural healing intelligence
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Provides deep relaxation and stress relief
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Improves mental clarity and emotional balance
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Enhances digestion and metabolism
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Slows the aging process and promotes longevity
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-amber-700 text-white p-5 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <FaUserMd className="mr-2" /> Your Journey to Wellness
                    </h3>
                    <p className="mb-4">
                      Every healing journey begins with a single step. By choosing Panchakarma, 
                      you're taking that important step toward lasting health and vitality.
                    </p>
                    <Link 
                      href="/patient/schedule"
                      className="inline-flex items-center bg-white text-amber-800 px-4 py-2 rounded-md font-medium hover:bg-amber-100 transition-colors"
                    >
                      Schedule Your Therapy Now <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-amber-600 text-white p-5 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Personalized Treatment Plan</h3>
                    <p className="mb-3">Based on your unique dosha constitution and health needs</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Dosha Type: <strong>Vata-Pitta</strong></span>
                      <Link href="/patient/profile" className="text-amber-200 hover:text-white text-sm">
                        View Details →
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
                <FaHeart className="mr-2" /> Benefits of Ayurveda & Panchakarma
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {benefits.map((benefit, index) => (
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
                  <FaAward className="mr-2" /> Long-Term Advantages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBalanceScale className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Dosha Balance</h4>
                    <p className="text-sm mt-1 text-green-100">Restores your natural mind-body balance</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaHeart className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Vitality</h4>
                    <p className="text-sm mt-1 text-amber-100">Renews energy and enthusiasm for life</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBrain className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Mental Clarity</h4>
                    <p className="text-sm mt-1 text-blue-100">Enhances focus and cognitive function</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'therapies' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaSpa className="mr-2" /> Our Panchakarma Therapies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {therapies.map((therapy, index) => (
                  <div key={index} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-3">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        {therapy.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-700">{therapy.name}</h3>
                        <div className="flex items-center text-sm text-amber-600 mt-1">
                          <FaClock className="mr-1" /> {therapy.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{therapy.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Recommended for your dosha type</span>
                      <Link 
                        href="/patient/schedule"
                        className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center"
                      >
                        Book Now <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <FaHistory className="mr-2" /> The Complete Process
                </h3>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="text-center mb-6 md:mb-0">
                    <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">1</div>
                    <h4 className="font-semibold text-green-700">Purvakarma</h4>
                    <p className="text-sm text-gray-600">Preparation & Oil Massage</p>
                  </div>
                  <div className="text-center mb-6 md:mb-0">
                    <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">2</div>
                    <h4 className="font-semibold text-green-700">Pradhankarma</h4>
                    <p className="text-sm text-gray-600">Main Therapies</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">3</div>
                    <h4 className="font-semibold text-green-700">Paschatkarma</h4>
                    <p className="text-sm text-gray-600">Rejuvenation & Diet</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaStar className="mr-2" /> Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white border border-amber-100 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <FaUserMd className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-700">{testimonial.name}</h3>
                        <p className="text-sm text-amber-600">{testimonial.therapy}</p>
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
                  <FaLeaf className="mr-2" /> Begin Your Transformation Today
                </h3>
                <p className="mb-4">
                  Join hundreds of patients who have rediscovered health and vitality through 
                  our Panchakarma treatments. Your journey to wellness is just a step away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/patient/schedule"
                    className="flex items-center justify-center bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-amber-100 transition-colors"
                  >
                    <FaCalendarAlt className="mr-2" /> Schedule Consultation
                  </Link>
                  <Link 
                    href="/patient/therapies"
                    className="flex items-center justify-center bg-amber-500 text-amber-900 px-4 py-2 rounded-md font-medium hover:bg-amber-400 transition-colors"
                  >
                    <FaNotesMedical className="mr-2" /> Explore Therapies
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" /> Upcoming Appointments
          </h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appt => (
                <div key={appt.id} className="flex justify-between items-center p-4 border border-amber-100 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-green-700">{appt.therapy}</h3>
                    <p className="text-sm text-gray-600">with {appt.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appt.date} at {appt.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming appointments. Schedule your first therapy!</p>
          )}
          <div className="mt-4">
            <Link 
              href="/patient/schedule"
              className="text-green-700 hover:text-green-800 font-medium flex items-center"
            >
              View all appointments <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <FaClinicMedical className="mr-2" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/patient/schedule"
              className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors border border-amber-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="text-amber-600" />
                </div>
                <h3 className="font-semibold text-green-700">Schedule Therapy</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">Book your next session</p>
            </Link>
            
            <Link 
              href="/patient/therapies"
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors border border-green-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaNotesMedical className="text-green-600" />
                </div>
                <h3 className="font-semibold text-green-700">My Therapies</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">View upcoming sessions</p>
            </Link>
            
            <Link 
              href="/patient/records"
              className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors border border-amber-100"
            >
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaFileMedical className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-green-700">Health Records</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">Access your health data</p>
            </Link>
          </div>
        </div>
      </div>
    </div></>
    
  );
};

export default PatientDashboard;