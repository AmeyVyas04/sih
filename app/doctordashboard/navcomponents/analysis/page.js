'use client';
import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaHeart,
  FaWeight,
  FaThermometerHalf,
  FaTint,
  FaStethoscope,
  FaCalendarAlt,
  FaUser,
  FaArrowUp,
  FaArrowDown,
  FaSync,
  FaDownload,
  FaFilter,
  FaSearch,
  FaNotesMedical,
  FaProcedures
} from 'react-icons/fa';
import {
  MdTrendingUp,
  MdTrendingDown,
  MdShowChart,
  MdAnalytics,
  MdSick,
  MdHealthAndSafety
} from 'react-icons/md';
import { 
  GiLungs, 
  GiHeartBeats, 
  GiMuscleUp 
} from 'react-icons/gi';
import DoctorNavbar from '../../navbar/navbar';

const PatientAnalysis = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      condition: 'Arthritis',
      therapy: 'Abhyanga + Panchakarma',
      sessionsCompleted: 12,
      totalSessions: 20,
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-22',
      status: 'improving'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      condition: 'Stress & Anxiety',
      therapy: 'Shirodhara + Meditation',
      sessionsCompleted: 8,
      totalSessions: 15,
      lastVisit: '2024-01-14',
      nextAppointment: '2024-01-21',
      status: 'stable'
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 58,
      gender: 'Male',
      condition: 'Digestive Issues',
      therapy: 'Basti + Dietary Therapy',
      sessionsCompleted: 6,
      totalSessions: 12,
      lastVisit: '2024-01-13',
      nextAppointment: '2024-01-20',
      status: 'improving'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 28,
      gender: 'Female',
      condition: 'Skin Allergy',
      therapy: 'Detox Panchakarma',
      sessionsCompleted: 10,
      totalSessions: 10,
      lastVisit: '2024-01-12',
      nextAppointment: '2024-02-12',
      status: 'recovered'
    }
  ]);

  const [healthMetrics, setHealthMetrics] = useState({
    vitalSigns: [
      { date: '2024-01-01', bp: '120/80', heartRate: 72, temperature: 98.6, weight: 75, oxygen: 98 },
      { date: '2024-01-08', bp: '118/78', heartRate: 70, temperature: 98.4, weight: 74, oxygen: 99 },
      { date: '2024-01-15', bp: '116/76', heartRate: 68, temperature: 98.2, weight: 73, oxygen: 99 }
    ],
    painLevels: [
      { date: '2024-01-01', jointPain: 7, fatigue: 8, sleepQuality: 5 },
      { date: '2024-01-08', jointPain: 5, fatigue: 6, sleepQuality: 6 },
      { date: '2024-01-15', jointPain: 3, fatigue: 4, sleepQuality: 8 }
    ],
    therapyProgress: [
      { session: 1, flexibility: 3, strength: 4, mobility: 2 },
      { session: 4, flexibility: 4, strength: 5, mobility: 3 },
      { session: 8, flexibility: 6, strength: 6, mobility: 5 },
      { session: 12, flexibility: 8, strength: 7, mobility: 7 }
    ]
  });

  const [progressStats, setProgressStats] = useState({
    overallProgress: 75,
    sessionAttendance: 92,
    treatmentAdherence: 88,
    symptomImprovement: 80
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'stable': return 'text-blue-600 bg-blue-100';
      case 'recovered': return 'text-purple-600 bg-purple-100';
      case 'deteriorating': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'improving': return <MdTrendingUp className="text-green-500" />;
      case 'stable': return <FaSync className="text-blue-500" />;
      case 'recovered': return <MdHealthAndSafety className="text-purple-500" />;
      case 'deteriorating': return <MdTrendingDown className="text-red-500" />;
      default: return <MdShowChart className="text-gray-500" />;
    }
  };

  const calculateProgress = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const PatientCard = ({ patient }) => (
    <div 
      className={`bg-white rounded-2xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md border-2 ${
        selectedPatient?.id === patient.id ? 'border-blue-500' : 'border-transparent'
      }`}
      onClick={() => setSelectedPatient(patient)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{patient.name}</h3>
            <p className="text-gray-600 text-sm">{patient.age} years • {patient.gender}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(patient.status)}`}>
          {getStatusIcon(patient.status)}
          <span className="capitalize">{patient.status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Condition</p>
          <p className="font-medium text-gray-800 flex items-center">
            <MdSick className="mr-2 text-red-500" />
            {patient.condition}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Therapy Plan</p>
          <p className="font-medium text-gray-800 flex items-center">
            <FaProcedures className="mr-2 text-green-500" />
            {patient.therapy}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Treatment Progress</span>
            <span className="text-sm font-semibold text-blue-600">
              {calculateProgress(patient.sessionsCompleted, patient.totalSessions)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress(patient.sessionsCompleted, patient.totalSessions)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{patient.sessionsCompleted} sessions completed</span>
            <span>{patient.totalSessions} total</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-600">Last Visit</p>
            <p className="font-medium text-gray-800">{patient.lastVisit}</p>
          </div>
          <div>
            <p className="text-gray-600">Next Appointment</p>
            <p className="font-medium text-green-600">{patient.nextAppointment}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, change, icon, color = 'blue' }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          {React.cloneElement(icon, { className: `text-${color}-600 text-xl` })}
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
        }`}>
          {change > 0 ? <FaArrowUp /> : change < 0 ? <FaArrowDown /> : <FaSync />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  const VitalSignChart = ({ data }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaHeart className="mr-2 text-red-500" />
        Vital Signs Trend
      </h3>
      <div className="space-y-4">
        {data.map((record, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700">{record.date}</div>
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">{record.bp}</div>
                <div className="text-xs text-gray-500">BP</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{record.heartRate}</div>
                <div className="text-xs text-gray-500">BPM</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">{record.temperature}°F</div>
                <div className="text-xs text-gray-500">Temp</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">{record.weight}kg</div>
                <div className="text-xs text-gray-500">Weight</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-cyan-600">{record.oxygen}%</div>
                <div className="text-xs text-gray-500">O2</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PainLevelChart = ({ data }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaNotesMedical className="mr-2 text-orange-500" />
        Symptom Progress
      </h3>
      <div className="space-y-3">
        {data.map((record, index) => (
          <div key={index} className="space-y-2">
            <div className="text-sm font-medium text-gray-700">{record.date}</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-red-50 rounded-lg">
                <div className="font-semibold text-red-600">{record.jointPain}/10</div>
                <div className="text-xs text-gray-500">Joint Pain</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-600">{record.fatigue}/10</div>
                <div className="text-xs text-gray-500">Fatigue</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600">{record.sleepQuality}/10</div>
                <div className="text-xs text-gray-500">Sleep Quality</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProgressChart = ({ data }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <GiMuscleUp className="mr-2 text-green-500" />
        Therapy Progress
      </h3>
      <div className="space-y-4">
        {data.map((session, index) => (
          <div key={index} className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Session {session.session}</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-600">{session.flexibility}/10</div>
                <div className="text-xs text-gray-500">Flexibility</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-600">{session.strength}/10</div>
                <div className="text-xs text-gray-500">Strength</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600">{session.mobility}/10</div>
                <div className="text-xs text-gray-500">Mobility</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
                <MdAnalytics className="mr-3 text-blue-600" />
                Patient Analysis & Performance
              </h1>
              <p className="text-gray-600 mt-2">
                Track patient progress, health metrics, and treatment effectiveness
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-xl flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
                <FaDownload className="mr-2" />
                Export Report
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                />
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
                  <FaFilter className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patients</h2>
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>

          {/* Analysis Dashboard */}
          <div className="lg:col-span-3">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600 text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                        <p className="text-gray-600">
                          {selectedPatient.condition} • {selectedPatient.therapy}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(selectedPatient.status)}`}>
                      {getStatusIcon(selectedPatient.status)}
                      <span className="capitalize">{selectedPatient.status}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Overall Progress"
                    value={`${progressStats.overallProgress}%`}
                    change={12}
                    icon={<FaChartLine />}
                    color="blue"
                  />
                  <MetricCard
                    title="Session Attendance"
                    value={`${progressStats.sessionAttendance}%`}
                    change={5}
                    icon={<FaCalendarAlt />}
                    color="green"
                  />
                  <MetricCard
                    title="Treatment Adherence"
                    value={`${progressStats.treatmentAdherence}%`}
                    change={8}
                    icon={<FaStethoscope />}
                    color="purple"
                  />
                  <MetricCard
                    title="Symptom Improvement"
                    value={`${progressStats.symptomImprovement}%`}
                    change={15}
                    icon={<GiHeartBeats />}
                    color="red"
                  />
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                      {['overview', 'vitals', 'symptoms', 'progress'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-4 px-2 font-medium capitalize border-b-2 transition-colors ${
                            activeTab === tab
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <VitalSignChart data={healthMetrics.vitalSigns} />
                        <PainLevelChart data={healthMetrics.painLevels} />
                      </div>
                    )}

                    {activeTab === 'vitals' && (
                      <VitalSignChart data={healthMetrics.vitalSigns} />
                    )}

                    {activeTab === 'symptoms' && (
                      <PainLevelChart data={healthMetrics.painLevels} />
                    )}

                    {activeTab === 'progress' && (
                      <ProgressChart data={healthMetrics.therapyProgress} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <MdAnalytics className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Select a Patient to View Analysis
                </h3>
                <p className="text-gray-500">
                  Choose a patient from the list to see detailed health metrics and progress analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div></>
  );
};

export default PatientAnalysis; 