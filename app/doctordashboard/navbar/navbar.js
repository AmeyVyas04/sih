"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaUserMd, FaBell, FaCommentMedical, FaSignOutAlt, 
  FaCog, FaEdit, FaCalendarAlt, FaUsers, 
  FaChartLine, FaStethoscope, FaHome, FaBars
} from 'react-icons/fa';

const DoctorNavbar = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const doctorDataStorage = localStorage.getItem('doctorData');
      if (doctorDataStorage) {
        try {
          const data = JSON.parse(doctorDataStorage);
          setDoctorData(data);
          setEditForm(data);
        } catch (error) {
          console.error('Error parsing doctor data:', error);
        }
      }

      // Sample notifications
      setNotifications([
        {
          id: 1,
          type: 'new_appointment',
          message: 'New appointment request from Patient Raj Kumar',
          time: '2 mins ago',
          read: false,
          patientId: 'pat_001'
        },
        {
          id: 2,
          type: 'feedback',
          message: 'Patient Priya Singh submitted therapy feedback',
          time: '1 hour ago',
          read: false,
          patientId: 'pat_002'
        },
        {
          id: 3,
          type: 'reminder',
          message: 'Therapy session with Amit Patel in 30 minutes',
          time: 'Today 9:30 AM',
          read: true,
          patientId: 'pat_003'
        }
      ]);
    }
  }, []);

  const unreadNotifications = notifications.filter(notif => !notif.read).length;
  const unreadMessages = 3; // Sample message count

  const handleNotificationClick = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update doctor data in localStorage
    localStorage.setItem('doctorData', JSON.stringify(editForm));
    setDoctorData(editForm);
    setIsEditing(false);
    setShowProfileDropdown(false);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorData');
    window.location.href = '/';
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-700 to-amber-700 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and main nav */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
              >
                <FaBars className="h-5 w-5" />
              </button>

              {/* Logo */}
              <Link href="/doctordashboard/homepage" className="flex-shrink-0 flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <FaUserMd className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-xl font-bold">AyurSutra</h1>
                  <p className="text-amber-100 text-xs">Doctor Portal</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
                <Link
                  href="/doctordashboard/homepage"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <FaHome className="mr-2" /> Dashboard
                </Link>
                <Link
                  href="/doctor/schedule"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <FaCalendarAlt className="mr-2" /> Schedule
                </Link>
                <Link
                  href="/doctor/patients"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <FaUsers className="mr-2" /> Patients
                </Link>
                <Link
                  href="/doctor/analytics"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <FaChartLine className="mr-2" /> Analytics
                </Link>
                <Link
                  href="/doctor/therapies"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <FaStethoscope className="mr-2" /> Therapies
                </Link>
              </div>
            </div>

            {/* Right side - Notifications and profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-white hover:bg-green-600 rounded-full relative transition-colors"
                >
                  <FaBell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-600">{unreadNotifications} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center">No notifications</p>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`text-sm font-medium ${
                                notification.type === 'new_appointment' ? 'text-green-600' : 'text-gray-700'
                              }`}>
                                {notification.message}
                              </span>
                              {!notification.read && (
                                <span className="bg-green-500 rounded-full w-2 h-2"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2 border-t">
                      <Link 
                        href="/doctor/notifications"
                        className="block text-center text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <Link
                href="/doctor/messages"
                className="p-2 text-white hover:bg-green-600 rounded-full relative transition-colors"
              >
                <FaCommentMedical className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-semibold">DR</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-white font-medium">Dr. {doctorData?.name || 'Sharma'}</p>
                    <p className="text-amber-100 text-xs">Panchakarma Specialist</p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    {isEditing ? (
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Edit Profile</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={editForm.name || ''}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={editForm.email || ''}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={editForm.phone || ''}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="submit"
                              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="flex-1 bg-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">DR</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Dr. {doctorData?.name || 'Sharma'}</h3>
                              <p className="text-sm text-gray-600">{doctorData?.specialization || 'Panchakarma Specialist'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <FaEdit className="mr-2 text-gray-400" /> Edit Profile
                          </button>
                          <Link
                            href="/doctor/settings"
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <FaCog className="mr-2 text-gray-400" /> Settings
                          </Link>
                        </div>
                        
                        <div className="border-t p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <FaSignOutAlt className="mr-2" /> Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-green-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/doctordashboard/homepage"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaHome className="mr-2" /> Dashboard
              </Link>
              <Link
                href="/doctor/schedule"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaCalendarAlt className="mr-2" /> Schedule
              </Link>
              <Link
                href="/doctor/patients"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaUsers className="mr-2" /> Patients
              </Link>
              <Link
                href="/doctor/analytics"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaChartLine className="mr-2" /> Analytics
              </Link>
              <Link
                href="/doctor/therapies"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaStethoscope className="mr-2" /> Therapies
              </Link>
              <Link
                href="/doctor/messages"
                className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaCommentMedical className="mr-2" /> Messages
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for dropdowns */}
      {(showProfileDropdown || showNotifications) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileDropdown(false);
            setShowNotifications(false);
          }}
        ></div>
      )}
    </>
  );
};

export default DoctorNavbar;