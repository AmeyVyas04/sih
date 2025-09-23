// app/admin/dashboard/page.js
"use client"
import { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaUserMd, 
  FaCalendarCheck, 
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaStar,
  FaFilter,
  FaHeart,
  FaStethoscope,
  FaChartPie,
  FaCalendarAlt,
  FaUserPlus,
  FaVideo,
  FaMobileAlt,
  FaShieldAlt  // Changed from FaShield to FaShieldAlt
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeView, setActiveView] = useState('overview');

  // Comprehensive dummy data
  const dummyData = {
    overview: {
      totalPatients: 1247,
      totalDoctors: 42,
      totalAppointments: 389,
      totalRevenue: 1256000,
      activeSessions: 23,
      pendingApprovals: 12,
      patientGrowth: 12.5,
      doctorGrowth: 8.2,
      appointmentGrowth: 15.3,
      revenueGrowth: 18.7
    },
    monthly: {
      patientRegistration: [65, 78, 92, 105, 120, 145, 167, 189, 156, 178, 195, 210],
      appointmentTrends: [45, 52, 38, 61, 55, 48, 65, 72, 58, 67, 74, 81],
      revenueData: [120, 145, 98, 167, 132, 189, 156, 178, 165, 192, 210, 235],
      therapyPopularity: [45, 32, 28, 18, 15, 12, 10, 8, 7, 5],
      patientSatisfaction: [4.2, 4.5, 4.3, 4.7, 4.6, 4.8, 4.9, 4.7, 4.8, 4.9, 4.8, 4.9],
      onlineBookings: [35, 42, 38, 51, 48, 55, 62, 58, 61, 67, 72, 75],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      therapyLabels: ['Abhyanga', 'Shirodhara', 'Basti', 'Virechana', 'Marma', 'Nasya', 'Netra', 'Kati', 'Udvartana', 'Pizhichil']
    },
    weekly: {
      patientRegistration: [12, 15, 18, 22, 25, 28, 30],
      appointmentTrends: [8, 12, 9, 15, 11, 14, 16],
      revenueData: [45, 52, 38, 61, 55, 48, 65],
      patientSatisfaction: [4.5, 4.6, 4.7, 4.8, 4.9, 4.8, 4.9],
      onlineBookings: [8, 12, 10, 14, 13, 16, 18],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      therapyPopularity: [22, 18, 15, 12, 10, 8, 6, 5, 4, 3], // Added for weekly view
      therapyLabels: ['Abhyanga', 'Shirodhara', 'Basti', 'Virechana', 'Marma', 'Nasya', 'Netra', 'Kati', 'Udvartana', 'Pizhichil']
    },
    recentActivities: [
      { id: 1, type: 'patient', name: 'Rajesh Kumar', action: 'registered', time: '2 min ago', icon: FaUserPlus },
      { id: 2, type: 'appointment', name: 'Dr. Priya Sharma', action: 'new booking', time: '5 min ago', icon: FaCalendarAlt },
      { id: 3, type: 'doctor', name: 'Dr. Amit Patel', action: 'joined platform', time: '10 min ago', icon: FaStethoscope },
      { id: 4, type: 'payment', name: 'Anita Desai', action: 'completed payment', time: '15 min ago', icon: FaMoneyBillWave },
      { id: 5, type: 'therapy', name: 'Abhyanga', action: 'high demand', time: '20 min ago', icon: FaHeart }
    ],
    topDoctors: [
      { id: 1, name: 'Dr. Priya Sharma', specialty: 'Panchakarma', rating: 4.9, patients: 234, revenue: 450000, image: 'PS' },
      { id: 2, name: 'Dr. Amit Patel', specialty: 'Neurology', rating: 4.8, patients: 189, revenue: 380000, image: 'AP' },
      { id: 3, name: 'Dr. Sanjay Kumar', specialty: 'Digestive Health', rating: 4.7, patients: 167, revenue: 320000, image: 'SK' },
      { id: 4, name: 'Dr. Meera Nair', specialty: 'Respiratory', rating: 4.6, patients: 145, revenue: 280000, image: 'MN' }
    ],
    platformStats: {
      onlineSessions: 15,
      mobileUsers: 68,
      websiteVisits: 1240,
      avgSessionTime: '12:34',
      conversionRate: 4.2
    },
    therapyStats: {
      totalTherapies: 15,
      activeTherapies: 12,
      popularTherapy: 'Abhyanga',
      successRate: 94.5
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(dummyData);
      setLoading(false);
    }, 1500);
  }, []);

  // Safe max value calculation
  const getMaxValue = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return 100;
    return Math.max(...data) * 1.1;
  };

  // Enhanced Bar Chart with animations
  const BarChart = ({ data, labels, color = 'blue', height = 200, title }) => {
    const maxValue = getMaxValue(data);
    
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        <div className="flex items-end space-x-2 h-64" style={{ height }}>
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1 group relative">
              <div
                className={`w-full rounded-t-xl transition-all duration-500 ease-out transform hover:scale-105 ${
                  color === 'blue' ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 
                  color === 'green' ? 'bg-gradient-to-t from-green-500 to-green-400' : 
                  color === 'orange' ? 'bg-gradient-to-t from-orange-500 to-orange-400' : 
                  'bg-gradient-to-t from-purple-500 to-purple-400'
                } shadow-lg`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-600 mt-2 font-medium">{labels[index]}</span>
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Enhanced Line Chart with gradient
  const LineChart = ({ data, labels, color = 'green', height = 200, title }) => {
    const maxValue = getMaxValue(data);
    
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        <div className="relative h-64" style={{ height }}>
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-px bg-gray-200"></div>
            ))}
          </div>
          
          {/* Line and points */}
          <div className="relative h-full flex items-center">
            <div className="flex-1 flex justify-between items-end relative">
              {data.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group relative">
                  <div
                    className={`w-3 h-3 rounded-full border-4 border-white shadow-lg transition-all duration-300 hover:scale-150 ${
                      color === 'green' ? 'bg-green-500' : 
                      color === 'orange' ? 'bg-orange-500' : 
                      'bg-purple-500'
                    }`}
                    style={{ marginBottom: `${(value / maxValue) * 80}%` }}
                  />
                  
                  {/* Connecting line */}
                  {index < data.length - 1 && (
                    <div
                      className={`absolute h-1 top-1/2 transform -translate-y-1/2 ${
                        color === 'green' ? 'bg-green-300' : 
                        color === 'orange' ? 'bg-orange-300' : 
                        'bg-purple-300'
                      }`}
                      style={{
                        width: `${90/data.length}%`,
                        left: `${(index + 0.5) * (100/data.length)}%`,
                        marginTop: `-${(value / maxValue) * 40}%`
                      }}
                    />
                  )}
                  
                  <span className="text-xs text-gray-600 mt-2 font-medium">{labels[index]}</span>
                  
              {/* Tooltip */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                {value}
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Safe Horizontal Bar Chart
  const HorizontalBarChart = ({ data, labels, height = 300, title }) => {
    if (!data || !labels) return <div>No data available</div>;
    
    const maxValue = Math.max(...data);
    
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        <div className="space-y-4" style={{ height }}>
          {data.map((value, index) => (
            <div key={index} className="flex items-center space-x-4 group">
              <span className="text-sm text-gray-700 font-medium w-32 truncate">{labels[index]}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out transform origin-left group-hover:scale-105"
                  style={{ width: `${(value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900 w-12 text-right">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // New: Pie Chart Simulation
  const PieChart = ({ data, labels, colors, title }) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    let cumulativePercent = 0;

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        <div className="flex items-center justify-center">
          <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((value, index) => {
              const percent = (value / total) * 100;
              const startPercent = cumulativePercent;
              cumulativePercent += percent;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={colors[index]}
                  strokeWidth="10"
                  strokeDasharray={`${percent} ${100 - percent}`}
                  strokeDashoffset={-startPercent}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
              <span className="text-xs text-gray-700">{label} ({data[index]}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm">Preparing insights and analytics</p>
        </div>
      </div>
    );
  }

  const currentData = stats[timeRange];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your clinic.</p>
        </div>
        
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
            <FaFilter className="text-gray-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-gray-700 font-medium"
            >
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly View</option>
            </select>
          </div>
          
          <div className="flex space-x-2 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
            {['overview', 'analytics', 'performance'].map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  activeView === view 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: FaUsers, label: 'Total Patients', value: stats.overview.totalPatients, growth: stats.overview.patientGrowth, color: 'blue', trend: 'up' },
          { icon: FaUserMd, label: 'Active Doctors', value: stats.overview.totalDoctors, growth: stats.overview.doctorGrowth, color: 'green', trend: 'up' },
          { icon: FaCalendarCheck, label: 'Appointments', value: stats.overview.totalAppointments, growth: stats.overview.appointmentGrowth, color: 'purple', trend: 'up' },
          { icon: FaMoneyBillWave, label: 'Total Revenue', value: `₹${(stats.overview.totalRevenue / 100000).toFixed(1)}L`, growth: stats.overview.revenueGrowth, color: 'orange', trend: 'up' },
          { icon: FaVideo, label: 'Online Sessions', value: stats.platformStats.onlineSessions, growth: 25, color: 'red', trend: 'up' },
          { icon: FaMobileAlt, label: 'Mobile Users', value: `${stats.platformStats.mobileUsers}%`, growth: 8, color: 'indigo', trend: 'up' },
          { icon: FaHeart, label: 'Success Rate', value: `${stats.therapyStats.successRate}%`, growth: 2.5, color: 'pink', trend: 'up' },
          { icon: FaShieldAlt, label: 'Pending Approvals', value: stats.overview.pendingApprovals, growth: -5, color: 'yellow', trend: 'down' }
        ].map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className={`flex items-center mt-2 ${stat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.growth > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span className="text-sm font-medium">{stat.growth}% from last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl shadow-lg ${
                stat.color === 'blue' ? 'bg-blue-500' : 
                stat.color === 'green' ? 'bg-green-500' : 
                stat.color === 'purple' ? 'bg-purple-500' : 
                stat.color === 'orange' ? 'bg-orange-500' :
                stat.color === 'red' ? 'bg-red-500' :
                stat.color === 'indigo' ? 'bg-indigo-500' :
                stat.color === 'pink' ? 'bg-pink-500' : 'bg-yellow-500'
              }`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChart 
          data={currentData.patientRegistration} 
          labels={currentData.labels} 
          color="blue"
          title="Patient Registration Trend"
        />

        <LineChart 
          data={currentData.appointmentTrends} 
          labels={currentData.labels} 
          color="green"
          title="Appointment Trends"
        />

        <LineChart 
          data={currentData.revenueData} 
          labels={currentData.labels} 
          color="orange"
          title="Revenue Trend (in ₹1000)"
        />

        <HorizontalBarChart 
          data={currentData.therapyPopularity} 
          labels={currentData.therapyLabels}
          title="Therapy Popularity Distribution"
        />

        <LineChart 
          data={currentData.patientSatisfaction} 
          labels={currentData.labels} 
          color="purple"
          title="Patient Satisfaction Score"
        />

        <PieChart
          data={[40, 30, 20, 10]}
          labels={['Abhyanga', 'Shirodhara', 'Basti', 'Others']}
          colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']}
          title="Therapy Distribution"
        />
      </div>

      {/* Enhanced Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <span className="text-sm text-blue-600 font-medium">View All</span>
          </div>
          <div className="space-y-4">
            {stats.recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className={`p-3 rounded-xl ${
                  activity.type === 'patient' ? 'bg-blue-100' :
                  activity.type === 'appointment' ? 'bg-green-100' :
                  activity.type === 'doctor' ? 'bg-purple-100' :
                  activity.type === 'payment' ? 'bg-orange-100' : 'bg-pink-100'
                }`}>
                  <activity.icon className={
                    activity.type === 'patient' ? 'text-blue-600' :
                    activity.type === 'appointment' ? 'text-green-600' :
                    activity.type === 'doctor' ? 'text-purple-600' :
                    activity.type === 'payment' ? 'text-orange-600' : 'text-pink-600'
                  } />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {activity.name} <span className="text-gray-600 font-normal">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.type === 'patient' ? 'bg-blue-50 text-blue-700' :
                  activity.type === 'appointment' ? 'bg-green-50 text-green-700' :
                  activity.type === 'doctor' ? 'bg-purple-50 text-purple-700' :
                  activity.type === 'payment' ? 'bg-orange-50 text-orange-700' : 'bg-pink-50 text-pink-700'
                }`}>
                  {activity.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top Performing Doctors</h3>
            <span className="text-sm text-blue-600 font-medium">View All</span>
          </div>
          <div className="space-y-4">
            {stats.topDoctors.map(doctor => (
              <div key={doctor.id} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {doctor.image}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-xs text-gray-700 ml-1 font-medium">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-700 font-medium">{doctor.patients} patients</span>
                    </div>
                    <span className="text-xs font-bold text-green-600">₹{(doctor.revenue/1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}