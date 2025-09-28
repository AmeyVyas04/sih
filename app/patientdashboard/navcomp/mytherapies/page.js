// app/patientdashboard/navcomp/mytherapies/page.js
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaArrowLeft,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUserMd,
  FaCalendarCheck,
  FaHeart,
  FaLeaf
} from 'react-icons/fa';

const MyTherapies = () => {
  // Only 2 therapies as requested
  const therapies = [
    {
      id: 1,
      name: 'Abhyanga Therapy',
      description: 'Traditional full-body oil massage that promotes relaxation, improves circulation, and removes toxins from the body.',
      duration: 60,
      category: 'massage',
      doctor: {
        name: 'Dr. Rajesh Sharma',
        specialization: 'Panchakarma Specialist',
        experience: 12,
        rating: 4.8,
        clinic: 'Ayurveda Healing Center',
        location: 'Mumbai, Maharashtra'
      },
      image: '/therapies/abhyanga.jpg',
      rating: 4.7,
      reviews: 124,
      nextSession: '2024-01-15 at 10:00 AM',
      progress: 3,
      totalSessions: 7,
      benefits: ['Stress Relief', 'Improved Circulation', 'Better Sleep', 'Detoxification'],
      status: 'ongoing'
    },
    {
      id: 2,
      name: 'Shirodhara Treatment',
      description: 'Continuous flow of warm herbal oil on the forehead to calm the nervous system and promote mental clarity.',
      duration: 45,
      category: 'relaxation',
      doctor: {
        name: 'Dr. Priya Patel',
        specialization: 'Neurological Ayurveda',
        experience: 8,
        rating: 4.9,
        clinic: 'Vedic Wellness Clinic',
        location: 'Delhi, NCR'
      },
      image: '/therapies/shirodhara.jpg',
      rating: 4.9,
      reviews: 89,
      nextSession: '2024-01-16 at 02:00 PM',
      progress: 1,
      totalSessions: 5,
      benefits: ['Mental Clarity', 'Stress Reduction', 'Headache Relief', 'Improved Focus'],
      status: 'ongoing'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">My Therapies</h1>
          <p className="text-amber-100 mt-2">Your ongoing Ayurvedic treatments and progress</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaHeart className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Ongoing Therapies</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">2</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCalendarCheck className="text-amber-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Sessions</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">12</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaLeaf className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">65%</p>
          </div>
        </div>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapies.map(therapy => (
            <div key={therapy.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Therapy Header */}
              <div className="bg-gradient-to-r from-green-600 to-amber-600 text-white p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{therapy.name}</h3>
                  <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {therapy.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </span>
                </div>
                <p className="text-green-100 mt-1">{therapy.description}</p>
              </div>

              {/* Therapy Content */}
              <div className="p-6">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{therapy.progress} of {therapy.totalSessions} sessions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(therapy.progress / therapy.totalSessions) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Session */}
                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-amber-800">
                    <FaCalendarCheck className="mr-2" />
                    <span className="font-medium">Next Session:</span>
                  </div>
                  <p className="text-amber-700 ml-6 mt-1">{therapy.nextSession}</p>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {therapy.doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{therapy.doctor.name}</p>
                    <p className="text-xs text-gray-500">{therapy.doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="text-xs text-gray-600 ml-1">{therapy.doctor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Therapy Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2 text-green-600" />
                    {therapy.duration} mins/session
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    {therapy.doctor.location}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {therapy.benefits.map((benefit, index) => (
                      <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link 
                    href={`/patientdashboard/navcomp/therapydetails/${therapy.id}`}
                    className="flex-1 bg-gradient-to-r from-green-600 to-amber-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-amber-700 transition-colors font-medium text-center"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {therapies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💆‍♀️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No therapies booked yet</h3>
            <p className="text-gray-500">Start your Ayurvedic journey by booking a therapy session</p>
            <Link 
              href="/patient/schedule"
              className="inline-block mt-4 bg-gradient-to-r from-green-600 to-amber-600 text-white py-2 px-6 rounded-md hover:from-green-700 hover:to-amber-700 transition-colors font-medium"
            >
              Book Therapy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTherapies;