"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaCalendarAlt, FaUser, FaClock, FaStethoscope, 
  FaCheck, FaTimes, FaEdit, FaEye, FaArrowRight,
  FaFilter, FaSearch, FaSort
} from 'react-icons/fa';

const AppointmentsPanel = ({ appointments = [], showFilters = true }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('time');

  // Sample appointments data if none provided
  const sampleAppointments = [
    {
      id: 'app_001',
      patientName: 'Raj Kumar',
      patientId: 'pat_001',
      therapy: 'Abhyanga',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: '60 mins',
      status: 'confirmed',
      priority: 'high',
      notes: 'Chronic back pain treatment',
      age: 45,
      gender: 'Male'
    },
    {
      id: 'app_002',
      patientName: 'Priya Singh',
      patientId: 'pat_002',
      therapy: 'Shirodhara',
      date: '2024-12-20',
      time: '2:30 PM',
      duration: '45 mins',
      status: 'scheduled',
      priority: 'medium',
      notes: 'Stress management therapy',
      age: 32,
      gender: 'Female'
    },
    {
      id: 'app_003',
      patientName: 'Amit Patel',
      patientId: 'pat_003',
      therapy: 'Consultation',
      date: '2024-12-20',
      time: '4:00 PM',
      duration: '30 mins',
      status: 'confirmed',
      priority: 'medium',
      notes: 'Initial consultation for digestive issues',
      age: 55,
      gender: 'Male'
    },
    {
      id: 'app_004',
      patientName: 'Sneha Sharma',
      patientId: 'pat_004',
      therapy: 'Basti',
      date: '2024-12-21',
      time: '11:00 AM',
      duration: '45 mins',
      status: 'pending',
      priority: 'low',
      notes: 'Follow-up session',
      age: 28,
      gender: 'Female'
    }
  ];

  const appointmentsData = appointments.length > 0 ? appointments : sampleAppointments;

  // Filter and sort appointments
  const filteredAppointments = appointmentsData
    .filter(appt => {
      const matchesStatus = filterStatus === 'all' || appt.status === filterStatus;
      const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appt.therapy.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'time') {
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
      }
      if (sortBy === 'name') {
        return a.patientName.localeCompare(b.patientName);
      }
      if (sortBy === 'therapy') {
        return a.therapy.localeCompare(b.therapy);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-400 bg-red-50';
      case 'medium': return 'border-l-amber-400 bg-amber-50';
      case 'low': return 'border-l-green-400 bg-green-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const handleConfirmAppointment = (appointmentId) => {
    // API call to confirm appointment
    console.log('Confirm appointment:', appointmentId);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // API call to reschedule appointment
    console.log('Reschedule appointment:', appointmentId);
  };

  const handleCancelAppointment = (appointmentId) => {
    // API call to cancel appointment
    console.log('Cancel appointment:', appointmentId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FaCalendarAlt className="mr-2 text-green-600" />
            Appointments Management
          </h2>
          <Link 
            href="/doctor/schedule/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" /> New Appointment
          </Link>
        </div>

        {/* Filters and Search */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients or therapies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="scheduled">Scheduled</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="time">Sort by Time</option>
              <option value="name">Sort by Name</option>
              <option value="therapy">Sort by Therapy</option>
            </select>
          </div>
        )}
      </div>

      {/* Appointments List */}
      <div className="p-6">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <FaCalendarAlt className="mx-auto text-gray-400 text-4xl mb-3" />
            <p className="text-gray-600">No appointments found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`border-l-4 rounded-lg p-4 ${getPriorityColor(appointment.priority)} hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                          <FaUser className="mr-2 text-green-600" />
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 ml-6">
                          {appointment.age} yrs • {appointment.gender}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>

                    <div className="ml-6 space-y-1">
                      <div className="flex items-center text-sm text-gray-700">
                        <FaStethoscope className="mr-2 text-amber-600" />
                        <span className="font-medium">{appointment.therapy}</span>
                        <span className="mx-2">•</span>
                        <FaClock className="mr-1 text-blue-600" />
                        {appointment.duration}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-green-600" />
                        {appointment.date} at {appointment.time}
                      </div>

                      {appointment.notes && (
                        <p className="text-sm text-gray-500 italic">
                          Notes: {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-3 lg:mt-0 lg:ml-4">
                    <Link
                      href={`/doctor/patients/${appointment.patientId}`}
                      className="flex items-center bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <FaEye className="mr-1" /> View
                    </Link>
                    
                    {appointment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleConfirmAppointment(appointment.id)}
                          className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-200 transition-colors"
                        >
                          <FaCheck className="mr-1" /> Confirm
                        </button>
                        <button
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="flex items-center bg-amber-100 text-amber-700 px-3 py-2 rounded text-sm hover:bg-amber-200 transition-colors"
                        >
                          <FaEdit className="mr-1" /> Reschedule
                        </button>
                      </>
                    )}
                    
                    {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex items-center bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 transition-colors"
                      >
                        <FaTimes className="mr-1" /> Cancel
                      </button>
                    )}

                    <Link
                      href={`/doctor/messages?patient=${appointment.patientId}`}
                      className="flex items-center bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200 transition-colors"
                    >
                      <FaEye className="mr-1" /> Message
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredAppointments.length} of {appointmentsData.length} appointments</span>
            <Link 
              href="/doctor/schedule"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View Full Schedule <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPanel;