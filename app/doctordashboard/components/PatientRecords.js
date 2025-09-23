"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaUser, FaStethoscope, FaHeart, FaWeight, 
  FaThermometerHalf, FaTint, FaNotesMedical,
  FaCalendarAlt, FaChartLine, FaEdit, FaEye,
  FaCommentMedical, FaFileMedical, FaSearch,
  FaFilter, FaSort, FaPlus, FaHistory,
  FaVenusMars, FaBirthdayCake, FaPhone, FaEnvelope, FaArrowRight
} from 'react-icons/fa';

const PatientRecords = ({ patients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Sample patient data if none provided
  const samplePatients = [
    {
      id: 'pat_001',
      name: 'Raj Kumar',
      age: 45,
      gender: 'Male',
      email: 'raj.kumar@email.com',
      phone: '+91 9876543210',
      condition: 'Chronic Back Pain',
      primaryTherapy: 'Abhyanga',
      progress: 85,
      lastSession: '2025-12-18',
      nextSession: '2025-12-20',
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      weight: '75 kg',
      temperature: '98.6°F',
      notes: 'Responding well to treatment. Pain reduced by 60%.',
      joinDate: '2025-11-15',
      sessionsCompleted: 8,
      satisfaction: 5,
      medicalHistory: [
        { date: '2025-12-18', therapy: 'Abhyanga', notes: 'Good response', therapist: 'Dr. Sharma' },
        { date: '2025-12-15', therapy: 'Abhyanga', notes: 'Mild improvement', therapist: 'Dr. Sharma' },
        { date: '2025-12-12', therapy: 'Consultation', notes: 'Initial assessment', therapist: 'Dr. Sharma' }
      ]
    },
    {
      id: 'pat_002',
      name: 'Priya Singh',
      age: 32,
      gender: 'Female',
      email: 'priya.singh@email.com',
      phone: '+91 9876543211',
      condition: 'Stress Management',
      primaryTherapy: 'Shirodhara',
      progress: 60,
      lastSession: '2025-12-17',
      nextSession: '2025-12-20',
      bloodPressure: '118/78',
      heartRate: '68 bpm',
      weight: '58 kg',
      temperature: '98.4°F',
      notes: 'Showing good stress reduction. Sleep quality improved.',
      joinDate: '2025-11-20',
      sessionsCompleted: 6,
      satisfaction: 4,
      medicalHistory: [
        { date: '2025-12-17', therapy: 'Shirodhara', notes: 'Very relaxed', therapist: 'Dr. Sharma' },
        { date: '2025-12-14', therapy: 'Shirodhara', notes: 'Good session', therapist: 'Dr. Sharma' }
      ]
    },
    {
      id: 'pat_003',
      name: 'Amit Patel',
      age: 55,
      gender: 'Male',
      email: 'amit.patel@email.com',
      phone: '+91 9876543212',
      condition: 'Digestive Issues',
      primaryTherapy: 'Virechana',
      progress: 45,
      lastSession: '2025-12-16',
      nextSession: '2025-12-21',
      bloodPressure: '125/82',
      heartRate: '75 bpm',
      weight: '82 kg',
      temperature: '98.8°F',
      notes: 'Initial phase. Monitoring digestive response.',
      joinDate: '2025-12-01',
      sessionsCompleted: 3,
      satisfaction: 4,
      medicalHistory: [
        { date: '2025-12-16', therapy: 'Virechana Prep', notes: 'Preparatory phase', therapist: 'Dr. Sharma' },
        { date: '2025-12-10', therapy: 'Consultation', notes: 'Treatment plan discussion', therapist: 'Dr. Sharma' }
      ]
    },
    {
      id: 'pat_004',
      name: 'Sneha Sharma',
      age: 28,
      gender: 'Female',
      email: 'sneha.sharma@email.com',
      phone: '+91 9876543213',
      condition: 'Skin Conditions',
      primaryTherapy: 'Basti',
      progress: 30,
      lastSession: '2025-12-15',
      nextSession: '2025-12-22',
      bloodPressure: '116/76',
      heartRate: '70 bpm',
      weight: '55 kg',
      temperature: '98.2°F',
      notes: 'Early stage treatment. Skin showing slight improvement.',
      joinDate: '2025-12-05',
      sessionsCompleted: 2,
      satisfaction: 3,
      medicalHistory: [
        { date: '2025-12-15', therapy: 'Basti', notes: 'First session completed', therapist: 'Dr. Sharma' },
        { date: '2025-12-08', therapy: 'Consultation', notes: 'Initial diagnosis', therapist: 'Dr. Sharma' }
      ]
    }
  ];

  const patientsData = patients.length > 0 ? patients : samplePatients;

  // Filter and sort patients
  const filteredPatients = patientsData
    .filter(patient => {
      const matchesCondition = filterCondition === 'all' || 
        patient.condition.toLowerCase().includes(filterCondition.toLowerCase());
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCondition && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'recent') return new Date(b.lastSession) - new Date(a.lastSession);
      return 0;
    });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 60) return 'text-amber-600 bg-amber-100';
    if (progress >= 40) return 'text-blue-600 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };

  const PatientDetailModal = ({ patient, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Patient Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-2" />
                  <span>{patient.name}</span>
                </div>
                <div className="flex items-center">
                  <FaBirthdayCake className="text-gray-400 mr-2" />
                  <span>{patient.age} years</span>
                </div>
                <div className="flex items-center">
                  <FaVenusMars className="text-gray-400 mr-2" />
                  <span>{patient.gender}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-2" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Medical Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Condition:</span>
                  <span className="font-medium">{patient.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span>Primary Therapy:</span>
                  <span className="font-medium">{patient.primaryTherapy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sessions Completed:</span>
                  <span className="font-medium">{patient.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Join Date:</span>
                  <span className="font-medium">{patient.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Vital Signs</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <FaHeart className="mx-auto text-red-500 mb-1" />
                <div className="text-sm text-gray-600">Blood Pressure</div>
                <div className="font-semibold">{patient.bloodPressure}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <FaHeart className="mx-auto text-red-500 mb-1" />
                <div className="text-sm text-gray-600">Heart Rate</div>
                <div className="font-semibold">{patient.heartRate}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <FaWeight className="mx-auto text-blue-500 mb-1" />
                <div className="text-sm text-gray-600">Weight</div>
                <div className="font-semibold">{patient.weight}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <FaThermometerHalf className="mx-auto text-amber-500 mb-1" />
                <div className="text-sm text-gray-600">Temperature</div>
                <div className="font-semibold">{patient.temperature}</div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Sessions</h4>
            <div className="space-y-2">
              {patient.medicalHistory.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{session.therapy}</div>
                    <div className="text-sm text-gray-600">{session.date} • {session.therapist}</div>
                  </div>
                  <div className="text-sm text-gray-500">{session.notes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Treatment Notes</h4>
            <p className="text-gray-700 bg-amber-50 p-3 rounded-lg">{patient.notes}</p>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-3">
          <Link
            href={`/doctor/messages?patient=${patient.id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FaCommentMedical className="mr-2" /> Send Message
          </Link>
          <Link
            href={`/doctor/patients/${patient.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Record
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FaUser className="mr-2 text-green-600" />
            Patient Records
          </h2>
          <Link 
            href="/doctor/patients/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> New Patient
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
            className="border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Conditions</option>
            <option value="back pain">Chronic Back Pain</option>
            <option value="stress">Stress Management</option>
            <option value="digestive">Digestive Issues</option>
            <option value="skin">Skin Conditions</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
      </div>

      {/* Patients List */}
      <div className="p-6">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-8">
            <FaUser className="mx-auto text-gray-400 text-4xl mb-3" />
            <p className="text-gray-600">No patients found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                          <FaUser className="mr-2 text-green-600" />
                          {patient.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 ml-6 space-x-4">
                          <span>{patient.age} years</span>
                          <span>{patient.gender}</span>
                          <span className="flex items-center">
                            <FaPhone className="mr-1" /> {patient.phone}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(patient.progress)}`}>
                          {patient.progress}% Progress
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Next: {patient.nextSession}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-700 mb-1">
                          <FaStethoscope className="mr-2 text-amber-600" />
                          <span className="font-medium">Condition:</span>
                          <span className="ml-2">{patient.condition}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700 mb-1">
                          <FaNotesMedical className="mr-2 text-blue-600" />
                          <span className="font-medium">Therapy:</span>
                          <span className="ml-2">{patient.primaryTherapy}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-700 mb-1">
                          <FaCalendarAlt className="mr-2 text-green-600" />
                          <span className="font-medium">Last Session:</span>
                          <span className="ml-2">{patient.lastSession}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FaHistory className="mr-2 text-purple-600" />
                          <span className="font-medium">Sessions:</span>
                          <span className="ml-2">{patient.sessionsCompleted} completed</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="ml-6 mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Treatment Progress</span>
                        <span>{patient.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${patient.progress >= 80 ? 'bg-green-600' : patient.progress >= 60 ? 'bg-amber-500' : patient.progress >= 40 ? 'bg-blue-500' : 'bg-red-500'}`}
                          style={{ width: `${patient.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-4 lg:flex-nowrap">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="flex items-center bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <FaEye className="mr-1" /> Details
                    </button>
                    
                    <Link
                      href={`/doctor/messages?patient=${patient.id}`}
                      className="flex items-center bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <FaCommentMedical className="mr-1" /> Message
                    </Link>

                    <Link
                      href={`/doctor/schedule?patient=${patient.id}`}
                      className="flex items-center bg-amber-600 text-white px-3 py-2 rounded text-sm hover:bg-amber-700 transition-colors"
                    >
                      <FaCalendarAlt className="mr-1" /> Schedule
                    </Link>

                    <Link
                      href={`/doctor/patients/${patient.id}/history`}
                      className="flex items-center bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
                    >
                      <FaFileMedical className="mr-1" /> History
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
            <span>Showing {filteredPatients.length} of {patientsData.length} patients</span>
            <Link 
              href="/doctor/patients"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All Patients <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
    </div>
  );
};

export default PatientRecords;