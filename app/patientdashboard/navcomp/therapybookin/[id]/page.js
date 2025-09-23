// app/patient/therapy-booking/[id]/page.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUserMd,
  FaMoneyBillWave,
  FaShieldAlt, // Fixed: Replaced FaShield with FaShieldAlt
  FaCheckCircle,
  FaShare,
  FaBookmark,
  FaPhone,
  FaEnvelope,
  FaHospital,
  FaHeart,
  FaLeaf,
  FaSpa,
  FaUserCheck,
  FaCalendarPlus,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

// Mock data - Replace with your actual API calls
const fetchTherapyDetails = async (id) => {
  // Mock data for now
  const therapies = [
    {
      id: 1,
      name: 'Abhyanga Therapy',
      description: 'Traditional full-body oil massage that promotes relaxation, improves circulation, and removes toxins from the body.',
      detailedDescription: 'Abhyanga is a traditional Ayurvedic full-body massage using warm, herb-infused oils. This therapy helps in reducing stress, improving sleep quality, enhancing skin texture, and promoting overall wellness. The rhythmic massage techniques stimulate the lymphatic system and improve blood circulation.',
      benefits: [
        'Reduces stress and anxiety',
        'Improves blood circulation',
        'Enhances skin health and glow',
        'Promotes better sleep quality',
        'Strengthens the immune system',
        'Removes toxins from the body'
      ],
      duration: 60,
      price: 1500,
      category: 'massage',
      doctor: {
        name: 'Dr. Rajesh Sharma',
        specialization: 'Panchakarma Specialist',
        experience: 12,
        rating: 4.8,
        clinic: 'Ayurveda Healing Center',
        location: 'Mumbai, Maharashtra',
        address: '123 Ayurveda Street, Andheri West, Mumbai - 400001',
        phone: '+91 9876543210',
        email: 'dr.rajesh@ayurvedahealing.com',
        qualifications: ['BAMS', 'MD in Ayurveda', 'Panchakarma Specialist', 'Yoga Therapist'],
        image: '/doctors/dr-sharma.jpg',
        about: 'Dr. Rajesh Sharma has over 12 years of experience in traditional Ayurvedic treatments. He specializes in Panchakarma therapies and has helped thousands of patients achieve better health through Ayurveda. His gentle approach and deep knowledge make him one of the most sought-after Ayurvedic practitioners in Mumbai.',
        awards: ['Best Ayurvedic Doctor 2022', 'Excellence in Panchakarma 2021']
      },
      image: '/therapies/abhyanga.jpg',
      rating: 4.7,
      reviews: 124,
      availableSlots: ['09:00', '11:00', '14:00', '16:00', '18:00'],
      popularSlots: ['11:00', '16:00'],
      preparation: [
        'Avoid heavy meals 2 hours before therapy',
        'Wear comfortable, loose-fitting clothing',
        'Inform about any medical conditions or allergies',
        'Stay hydrated before the session',
        'Avoid alcohol and caffeine 24 hours before'
      ],
      afterCare: [
        'Rest for 30-45 minutes after therapy',
        'Drink warm water or herbal tea',
        'Avoid immediate bathing for 2 hours',
        'Follow light, vegetarian diet for 24 hours',
        'Avoid strenuous activities for the day'
      ],
      images: ['/therapies/abhyanga1.jpg', '/therapies/abhyanga2.jpg'],
      tags: ['Relaxing', 'Detoxifying', 'Rejuvenating', 'Full Body']
    },
    {
      id: 2,
      name: 'Shirodhara Treatment',
      description: 'Continuous flow of warm herbal oil on the forehead to calm the nervous system and promote mental clarity.',
      detailedDescription: 'Shirodhara involves a continuous stream of warm herbal oil poured gently on the forehead. This deeply relaxing therapy calms the mind, improves mental clarity, and helps in treating various neurological conditions. The therapy is known for its profound effects on stress relief and mental wellness.',
      benefits: [
        'Reduces stress and anxiety significantly',
        'Improves sleep quality and patterns',
        'Enhances memory and concentration',
        'Balances the nervous system',
        'Relieves chronic headaches and migraines',
        'Promotes emotional balance'
      ],
      duration: 45,
      price: 2000,
      category: 'relaxation',
      doctor: {
        name: 'Dr. Priya Patel',
        specialization: 'Neurological Ayurveda',
        experience: 8,
        rating: 4.9,
        clinic: 'Vedic Wellness Clinic',
        location: 'Delhi, NCR',
        address: '456 Wellness Avenue, Connaught Place, Delhi - 110001',
        phone: '+91 9876543211',
        email: 'dr.priya@vedicwellness.com',
        qualifications: ['BAMS', 'MS in Ayurveda', 'Neurology Specialist', 'Meditation Guide'],
        image: '/doctors/dr-patel.jpg',
        about: 'Dr. Priya Patel is a renowned Ayurvedic neurologist with expertise in treating stress-related disorders through traditional Ayurvedic methods. Her compassionate approach and modern techniques have helped numerous patients find relief from neurological issues.',
        awards: ['Young Ayurvedic Achiever 2023', 'Excellence in Mental Wellness 2022']
      },
      image: '/therapies/shirodhara.jpg',
      rating: 4.9,
      reviews: 89,
      availableSlots: ['10:00', '13:00', '15:00', '17:00', '19:00'],
      popularSlots: ['10:00', '15:00'],
      preparation: [
        'Avoid caffeine and stimulants before therapy',
        'Empty bladder before session',
        'Wear loose, comfortable clothes',
        'Avoid heavy mental work before session'
      ],
      afterCare: [
        'Avoid screen time for 2-3 hours',
        'Rest in quiet environment',
        'Drink herbal tea or warm milk',
        'Practice gentle breathing exercises'
      ],
      images: ['/therapies/shirodhara1.jpg', '/therapies/shirodhara2.jpg'],
      tags: ['Mental Wellness', 'Stress Relief', 'Neurological', 'Relaxing']
    }
  ];
  
  return therapies.find(therapy => therapy.id === parseInt(id));
};

export default function TherapyBookingPage() {
  const params = useParams();
  const therapyId = params.id;
  
  const [therapy, setTherapy] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    medicalHistory: ''
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showSlotManager, setShowSlotManager] = useState(false);
  const [customSlots, setCustomSlots] = useState([]);
  const [newSlot, setNewSlot] = useState('');

  useEffect(() => {
    const loadTherapyData = async () => {
      try {
        setLoading(true);
        const therapyData = await fetchTherapyDetails(therapyId);
        setTherapy(therapyData);
        setCustomSlots(therapyData?.availableSlots || []);
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error loading therapy:', error);
      } finally {
        setLoading(false);
      }
    };

    if (therapyId) {
      loadTherapyData();
    }
  }, [therapyId]);

  const handleInputChange = (e) => {
    setPatientDetails({
      ...patientDetails,
      [e.target.name]: e.target.value
    });
  };

  const addCustomSlot = () => {
    if (newSlot && !customSlots.includes(newSlot)) {
      setCustomSlots([...customSlots, newSlot].sort());
      setNewSlot('');
    }
  };

  const removeCustomSlot = (slotToRemove) => {
    setCustomSlots(customSlots.filter(slot => slot !== slotToRemove));
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
        alert('Please select date and time');
        return;
    }

    if (!patientDetails.name || !patientDetails.phone) {
        alert('Please fill in required patient details');
        return;
    }

    const bookingData = {
        therapyId: therapy.id,
        doctorId: therapy.doctor?.id || "default-doctor-id", // Add fallback
        date: selectedDate,
        time: selectedTime,
        patientDetails,
        totalAmount: therapy.price + 100,
        status: 'confirmed'
    };

    try {
        console.log("Sending booking data:", bookingData); // Debug log

        const response = await fetch("/api/patient/scheduletherapy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();
        console.log("Response status:", response.status); // Debug log
        console.log("Response data:", data); // Debug log

        if (response.ok) {
            console.log("Booking successful:", data);
            alert('Booking confirmed successfully!');
            // Redirect or clear form
        } else {
            console.error("Booking failed:", data.error);
            alert(`Booking failed: ${data.error}`);
        }
    } catch (error) {
        console.error("Error in scheduling:", error);
        alert('Network error. Please check your connection and try again.');
    }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading therapy details...</p>
        </div>
      </div>
    );
  }

  if (!therapy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900">Therapy not found</h2>
          <Link href="/patient/schedule" className="text-green-600 hover:text-green-700 mt-4 inline-block text-lg">
            ← Back to therapies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-amber-600 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Therapies
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{therapy.name}</h1>
              <p className="text-amber-100 text-lg">Experience healing with {therapy.doctor.name}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4 md:mt-0">
              <div className="text-3xl font-bold text-amber-300">₹{therapy.price}</div>
              <div className="flex items-center text-amber-100">
                <FaClock className="mr-2" /> {therapy.duration} minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Therapy Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Therapy Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-green-400 to-amber-400 relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
                    <FaBookmark className="text-green-600" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
                    <FaShare className="text-green-600" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
                    <FaHeart className="text-green-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {therapy.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'benefits', 'doctor', 'preparation', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'overview' ? 'Therapy Overview' : 
                       tab === 'preparation' ? 'Preparation Guide' : tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-green-800 mb-4">About {therapy.name}</h3>
                      <p className="text-gray-700 leading-relaxed">{therapy.detailedDescription}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-amber-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <FaLeaf className="text-green-600 mr-2" />
                          Therapy Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {therapy.tags?.map((tag, index) => (
                            <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <FaSpa className="text-green-600 mr-2" />
                          Quick Facts
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{therapy.duration} minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium capitalize">{therapy.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-medium flex items-center">
                              <FaStar className="text-amber-400 mr-1" />
                              {therapy.rating} ({therapy.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-6">Therapy Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {therapy.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start p-3 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg">
                          <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'doctor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-semibold text-2xl shadow-lg">
                        {therapy.doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-green-800">{therapy.doctor.name}</h3>
                        <p className="text-green-600 text-lg">{therapy.doctor.specialization}</p>
                        <div className="flex items-center mt-2">
                          <FaStar className="text-amber-400 mr-1" />
                          <span className="font-medium">{therapy.doctor.rating} • {therapy.doctor.experence} years experience</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">About Doctor</h4>
                        <p className="text-gray-700 leading-relaxed">{therapy.doctor.about}</p>
                        
                        <h4 className="font-semibold mb-3 mt-4 text-lg">Qualifications</h4>
                        <ul className="space-y-2">
                          {therapy.doctor.qualifications.map((qual, index) => (
                            <li key={index} className="flex items-center">
                              <FaUserCheck className="text-green-500 mr-2" />
                              {qual}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaHospital className="text-green-600 mr-3" />
                            <div>
                              <p className="font-medium">{therapy.doctor.clinic}</p>
                              <p className="text-sm text-gray-600">{therapy.doctor.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaPhone className="text-green-600 mr-3" />
                            {therapy.doctor.phone}
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaEnvelope className="text-green-600 mr-3" />
                            {therapy.doctor.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preparation' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 text-lg flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        Preparation Guidelines
                      </h4>
                      <ul className="space-y-3">
                        {therapy.preparation.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                              <FaCheckCircle className="text-green-500 text-xs" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-lg flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        After Care Instructions
                      </h4>
                      <ul className="space-y-3">
                        {therapy.afterCare.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-amber-100 rounded-full p-1 mr-3 mt-1">
                              <FaCheckCircle className="text-amber-500 text-xs" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-6">Patient Reviews</h3>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">⭐</div>
                      <p className="text-gray-600">Reviews will be displayed here from your database</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-4 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-amber-600 text-white p-6">
                <h3 className="text-xl font-semibold">Book Your Session</h3>
                <p className="text-green-100">Select your preferred date and time</p>
              </div>

              <div className="p-6">
                {/* Date Selection */}
                <div className="mb-6">
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <FaCalendarAlt className="text-green-600 mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FaClock className="text-green-600 mr-2" />
                      Available Time Slots
                    </label>
                    <button 
                      onClick={() => setShowSlotManager(!showSlotManager)}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Manage Slots
                    </button>
                  </div>

                  {/* Slot Manager */}
                  {showSlotManager && (
                    <div className="mb-4 p-4 bg-amber-50 rounded-lg">
                      <div className="flex mb-3">
                        <input
                          type="time"
                          value={newSlot}
                          onChange={(e) => setNewSlot(e.target.value)}
                          className="flex-1 text-black p-2 border border-gray-300 rounded-l-lg"
                          placeholder="HH:MM"
                        />
                        <button 
                          onClick={addCustomSlot}
                          className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {customSlots.map(slot => (
                          <span key={slot} className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                            {slot}
                            <button 
                              onClick={() => removeCustomSlot(slot)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <FaTimes />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {(showSlotManager ? customSlots : therapy.availableSlots).map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === slot
                            ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                            : therapy.popularSlots?.includes(slot)
                            ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        {slot}
                        {therapy.popularSlots?.includes(slot) && (
                          <span className="block text-xs text-amber-600 mt-1">Popular</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                    <FaUserCheck className="text-green-600 mr-2" />
                    Patient Details
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      className="w-full p-4 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      value={patientDetails.name}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="p-4 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        value={patientDetails.age}
                        onChange={handleInputChange}
                      />
                      <select
                        name="gender"
                        className="p-4 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        value={patientDetails.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      className="w-full p-4 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      value={patientDetails.phone}
                      onChange={handleInputChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full text-black p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      value={patientDetails.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t pt-4 mb-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Therapy Fee</span>
                      <span>₹{therapy.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge</span>
                      <span>₹100</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-3 text-green-800">
                      <span>Total Amount</span>
                      <span>₹{therapy.price + 100}</span>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !patientDetails.name || !patientDetails.phone}
                  className="w-full bg-gradient-to-r from-green-600 to-amber-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  Confirm Booking - ₹{therapy.price + 100}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                  <FaShieldAlt className="mr-2 text-green-600" />
                  Your booking is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}