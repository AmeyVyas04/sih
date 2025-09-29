'use client';
import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaStethoscope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaPlus
} from 'react-icons/fa';
import { 
  MdSick, 
  MdAccessTime,
  MdToday,
  MdSchedule
} from 'react-icons/md';
import DoctorNavbar from '../../navbar/navbar';

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day'); // 'day' or 'week'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      patientPhone: '+91 9876543210',
      patientAge: 45,
      condition: 'Arthritis',
      sessionType: 'Abhyanga Therapy',
      time: '09:00 AM',
      duration: 60,
      status: 'confirmed', // confirmed, completed, cancelled, pending
      notes: 'Follow-up session for pain management',
      address: '123 Main St, Mumbai',
      emergencyContact: '+91 9876543211'
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      patientPhone: '+91 9876543212',
      patientAge: 32,
      condition: 'Stress Management',
      sessionType: 'Shirodhara',
      time: '10:30 AM',
      duration: 45,
      status: 'confirmed',
      notes: 'First session - anxiety relief',
      address: '456 Park Ave, Delhi',
      emergencyContact: '+91 9876543213'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      patientPhone: '+91 9876543214',
      patientAge: 58,
      condition: 'Digestive Issues',
      sessionType: 'Basti Therapy',
      time: '02:00 PM',
      duration: 90,
      status: 'pending',
      notes: 'Consultation for chronic digestion problems',
      address: '789 Cross Rd, Bangalore',
      emergencyContact: '+91 9876543215'
    },
    {
      id: 4,
      patientName: 'Sneha Reddy',
      patientPhone: '+91 9876543216',
      patientAge: 28,
      condition: 'Skin Allergy',
      sessionType: 'Panchakarma',
      time: '04:00 PM',
      duration: 120,
      status: 'completed',
      notes: 'Final session of detoxification',
      address: '321 Green Park, Hyderabad',
      emergencyContact: '+91 9876543217'
    }
  ]);

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Group appointments by time
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const getAppointmentsForTimeSlot = (timeSlot) => {
    return filteredAppointments.filter(apt => apt.time === timeSlot);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'completed':
        return <FaCheckCircle className="text-blue-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'pending':
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  return (
  <>
  <DoctorNavbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <MdSchedule className="mr-3 text-blue-600" />
                Today's Schedule
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <MdToday className="mr-2" />
                {formatDate(selectedDate)}
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center transition-colors">
              <FaPlus className="mr-2" />
              New Appointment
            </button>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              {/* Date Navigation */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl p-2">
                  <button 
                    onClick={() => navigateDate('prev')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>
                  <span className="px-4 py-2 text-gray-700 font-medium min-w-[200px] text-center">
                    {formatDate(selectedDate)}
                  </span>
                  <button 
                    onClick={() => navigateDate('next')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setView('day')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'day' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Day View
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'week' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Week View
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients or conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 w-full lg:w-64"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaClock className="mr-2 text-blue-600" />
              Daily Timeline
            </h2>
            
            <div className="space-y-4">
              {timeSlots.map((timeSlot) => {
                const slotAppointments = getAppointmentsForTimeSlot(timeSlot);
                
                return (
                  <div key={timeSlot} className="flex border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="w-24 flex-shrink-0">
                      <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-medium">
                        {timeSlot}
                      </div>
                    </div>
                    
                    <div className="flex-1 ml-4">
                      {slotAppointments.length > 0 ? (
                        <div className="space-y-3">
                          {slotAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className={`border-l-4 p-4 rounded-r-xl shadow-sm transition-all hover:shadow-md ${
                                appointment.status === 'confirmed' ? 'border-l-green-500' :
                                appointment.status === 'completed' ? 'border-l-blue-500' :
                                appointment.status === 'cancelled' ? 'border-l-red-500' :
                                'border-l-yellow-500'
                              } ${getStatusColor(appointment.status)}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FaUser className="text-blue-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-800">
                                      {appointment.patientName}
                                    </h3>
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <MdSick className="mr-1" />
                                      {appointment.condition}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(appointment.status)}
                                  <span className="text-sm font-medium capitalize">
                                    {appointment.status}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <FaStethoscope className="mr-2 text-blue-500" />
                                  {appointment.sessionType}
                                </div>
                                <div className="flex items-center">
                                  <MdAccessTime className="mr-2 text-green-500" />
                                  {appointment.duration} minutes
                                </div>
                                <div className="flex items-center">
                                  <FaPhone className="mr-2 text-purple-500" />
                                  {appointment.patientPhone}
                                </div>
                                <div className="flex items-center">
                                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                                  {appointment.address}
                                </div>
                              </div>
                              
                              {appointment.notes && (
                                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                  <p className="text-sm text-gray-700">
                                    <strong>Notes:</strong> {appointment.notes}
                                  </p>
                                </div>
                              )}
                              
                              <div className="mt-3 flex space-x-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                                  Start Session
                                </button>
                                <button className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors">
                                  Reschedule
                                </button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-400 italic py-4 text-center">
                          No appointments scheduled for this time slot
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Quick Stats */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Today's Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Confirmed</span>
                  <span className="font-bold text-green-700">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Completed</span>
                  <span className="font-bold text-blue-700">
                    {appointments.filter(a => a.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">Pending</span>
                  <span className="font-bold text-yellow-700">
                    {appointments.filter(a => a.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700">Cancelled</span>
                  <span className="font-bold text-red-700">
                    {appointments.filter(a => a.status === 'cancelled').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Next Appointments
              </h3>
              <div className="space-y-3">
                {appointments
                  .filter(a => a.status === 'confirmed')
                  .slice(0, 3)
                  .map(appointment => (
                    <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-800">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <FaClock className="mr-1 text-blue-500" />
                        {appointment.time}
                      </div>
                      <div className="text-sm text-gray-600">{appointment.sessionType}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default DoctorSchedule;