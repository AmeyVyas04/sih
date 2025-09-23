// app/patient/schedule/page.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaStar, 
  FaUserMd,
  FaMoneyBillWave,
  FaBookmark,
  FaShare,
  FaArrowLeft
} from 'react-icons/fa';

const TherapyScheduling = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Dummy therapies data (will be replaced with database data later)
  const therapies = [
    {
      id: 1,
      name: 'Abhyanga Therapy',
      description: 'Traditional full-body oil massage that promotes relaxation, improves circulation, and removes toxins from the body.',
      duration: 60,
      price: 1500,
      category: 'massage',
      doctor: {
        id: 1,
        name: 'Dr. Rajesh Sharma',
        specialization: 'Panchakarma Specialist',
        experience: 12,
        rating: 4.8,
        clinic: 'Ayurveda Healing Center',
        location: 'Mumbai, Maharashtra',
        image: '/doctors/dr-sharma.jpg'
      },
      image: '/therapies/abhyanga.jpg',
      rating: 4.7,
      reviews: 124,
      availableSlots: ['09:00', '11:00', '14:00', '16:00']
    },
    {
      id: 2,
      name: 'Shirodhara Treatment',
      description: 'Continuous flow of warm herbal oil on the forehead to calm the nervous system and promote mental clarity.',
      duration: 45,
      price: 2000,
      category: 'relaxation',
      doctor: {
        id: 2,
        name: 'Dr. Priya Patel',
        specialization: 'Neurological Ayurveda',
        experience: 8,
        rating: 4.9,
        clinic: 'Vedic Wellness Clinic',
        location: 'Delhi, NCR',
        image: '/doctors/dr-patel.jpg'
      },
      image: '/therapies/shirodhara.jpg',
      rating: 4.9,
      reviews: 89,
      availableSlots: ['10:00', '13:00', '15:00', '17:00']
    },
    {
      id: 3,
      name: 'Basti Therapy',
      description: 'Medicated enema treatment for colon cleansing and rejuvenation of the entire body system.',
      duration: 30,
      price: 2500,
      category: 'detox',
      doctor: {
        id: 3,
        name: 'Dr. Vikram Singh',
        specialization: 'Digestive Health',
        experience: 15,
        rating: 4.6,
        clinic: 'Traditional Ayurveda Center',
        location: 'Bangalore, Karnataka',
        image: '/doctors/dr-singh.jpg'
      },
      image: '/therapies/basti.jpg',
      rating: 4.5,
      reviews: 67,
      availableSlots: ['08:00', '11:30', '14:30', '16:30']
    },
    {
      id: 4,
      name: 'Virechana Treatment',
      description: 'Purification therapy that cleanses the gastrointestinal tract and purifies the blood.',
      duration: 120,
      price: 3500,
      category: 'detox',
      doctor: {
        id: 4,
        name: 'Dr. Anjali Mehta',
        specialization: 'Detoxification Specialist',
        experience: 10,
        rating: 4.7,
        clinic: 'Pure Ayurveda Clinic',
        location: 'Pune, Maharashtra',
        image: '/doctors/dr-mehta.jpg'
      },
      image: '/therapies/virechana.jpg',
      rating: 4.6,
      reviews: 45,
      availableSlots: ['09:30', '12:00', '15:00']
    },
    {
      id: 5,
      name: 'Marma Therapy',
      description: 'Ancient pressure point therapy to balance energy flow and promote healing.',
      duration: 90,
      price: 1800,
      category: 'energy',
      doctor: {
        id: 5,
        name: 'Dr. Sanjay Kumar',
        specialization: 'Marma Therapy Expert',
        experience: 18,
        rating: 4.9,
        clinic: 'Energy Balance Center',
        location: 'Chennai, Tamil Nadu',
        image: '/doctors/dr-kumar.jpg'
      },
      image: '/therapies/marma.jpg',
      rating: 4.8,
      reviews: 156,
      availableSlots: ['08:30', '10:30', '13:30', '16:00']
    },
    {
      id: 6,
      name: 'Nasya Treatment',
      description: 'Nasal administration of medicated oils to cleanse and rejuvenate the head region.',
      duration: 30,
      price: 1200,
      category: 'respiratory',
      doctor: {
        id: 6,
        name: 'Dr. Meera Nair',
        specialization: 'Respiratory Health',
        experience: 7,
        rating: 4.5,
        clinic: 'Ayur Health Hub',
        location: 'Kochi, Kerala',
        image: '/doctors/dr-nair.jpg'
      },
      image: '/therapies/nasya.jpg',
      rating: 4.4,
      reviews: 78,
      availableSlots: ['09:00', '11:00', '14:00', '16:30']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Therapies', count: therapies.length },
    { id: 'massage', name: 'Massage', count: therapies.filter(t => t.category === 'massage').length },
    { id: 'detox', name: 'Detox', count: therapies.filter(t => t.category === 'detox').length },
    { id: 'relaxation', name: 'Relaxation', count: therapies.filter(t => t.category === 'relaxation').length },
    { id: 'energy', name: 'Energy', count: therapies.filter(t => t.category === 'energy').length },
    { id: 'respiratory', name: 'Respiratory', count: therapies.filter(t => t.category === 'respiratory').length }
  ];

  // Filter and sort therapies
  const filteredTherapies = therapies
    .filter(therapy => 
      (selectedCategory === 'all' || therapy.category === selectedCategory) &&
      therapy.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Browse Therapies</h1>
          <p className="text-amber-100 mt-2">Explore our expert Ayurvedic treatments</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search therapies..."
                className="block text-black w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                className="border text-black border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapies.map(therapy => (
            <div key={therapy.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Therapy Image */}
              <div className="h-48 bg-gradient-to-br from-green-400 to-amber-400 relative">
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <FaBookmark className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Therapy Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-green-800">{therapy.name}</h3>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                    ₹{therapy.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{therapy.description}</p>

                {/* Doctor Info */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {therapy.doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{therapy.doctor.name}</p>
                    <p className="text-xs text-gray-500">{therapy.doctor.specialization}</p>
                  </div>
                </div>

                {/* Therapy Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2 text-green-600" />
                    {therapy.duration} mins
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    {therapy.doctor.location}
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{therapy.rating}</span>
                    </div>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{therapy.reviews} reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FaShare className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* View Details Button */}
                <Link 
                  href={`/patientdashboard/navcomp/therapybookin/${therapy.id}`}
                  className="w-full bg-gradient-to-r from-green-600 to-amber-600 text-white py-2 px-4 rounded-md hover:from-green-700 hover:to-amber-700 transition-colors font-medium text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTherapies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No therapies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapyScheduling;