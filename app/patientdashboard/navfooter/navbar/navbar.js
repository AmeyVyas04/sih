// components/PatientNavbar.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaUser, 
  FaBell, 
  FaSignOutAlt, 
  FaCog, 
  FaBars, 
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaNotesMedical,
  FaFileMedical,
  FaEnvelope,
  FaCommentDots,
  FaLeaf
} from 'react-icons/fa';
import { getCookie, deleteCookie } from 'cookies-next/client';

const PatientNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Get user data from cookies
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/patient/profile', {
          method: 'GET',
          credentials: 'include', // Important for sending cookies
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          console.log('Fetched user data:', data.user);
          
          // Store user data in cookies for future use
          document.cookie = `patientdata=${JSON.stringify(data.user)}; path=/; max-age=86400`; // 1 day
        } else {
          console.error('Failed to fetch user data');
          // If unauthorized, redirect to login
          if (response.status === 401) {
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check if we already have user data in cookies
    const userDataCookie = getCookie('patientdata');
    if (userDataCookie) {
      try {
        const parsedData = JSON.parse(userDataCookie);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
        // If cookie is corrupted, fetch from API
        fetchUserData();
      }
    } else {
      // If not, fetch from API
      fetchUserData();
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (isNotificationsOpen && !event.target.closest('.notifications-dropdown')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen, isNotificationsOpen]);

  // Handle logout
  const handleLogout = () => {
    // Remove cookies
      deleteCookie('patienttoken', { 
    path: '/',
    secure: true,        // MUST match how it was set
    sameSite: 'strict'   // MUST match how it was set
  });
    deleteCookie('patientdata');
    
    // Clear local state
    setUserData(null);
    setIsProfileOpen(false);
    
    // Redirect to login page
    router.push('/patientauthfrontend/login');
    router.refresh(); // Refresh to update auth state
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Therapy Reminder',
      message: 'Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'New Message',
      message: 'Dr. Sharma sent you a message about your treatment plan',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      title: 'Health Tip',
      message: 'Remember to drink warm water with lemon in the morning for better digestion',
      time: '2 days ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: 'Dashboard', href: '/patient/dashboard', icon: <FaHome className="mr-2" /> },
    { name: 'Schedule Therapy', href: '/patient/schedule', icon: <FaCalendarAlt className="mr-2" /> },
    { name: 'My Therapies', href: '/patient/therapies', icon: <FaNotesMedical className="mr-2" /> },
    { name: 'Health Records', href: '/patient/records', icon: <FaFileMedical className="mr-2" /> },
    { name: 'Contact Us', href: '/patient/contact', icon: <FaEnvelope className="mr-2" /> },
    { name: 'Feedback', href: '/patient/feedback', icon: <FaCommentDots className="mr-2" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-700 to-amber-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/patient/dashboard" 
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaLeaf className="text-green-700 text-xl" />
              </div>
              <span className="text-xl font-serif font-bold">PanchaKarma</span>
              <span className="text-xs bg-amber-500 text-amber-900 px-2 py-1 rounded-full ml-2">Patient</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    pathname === item.href
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-100 hover:bg-amber-600 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative notifications-dropdown">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-amber-100 hover:text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white relative transition-colors"
              >
                <FaBell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-amber-50' : ''}`}
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <button className="text-xs text-amber-600 hover:text-amber-700">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
              >
                <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                  {userData ? (
                    <span className="text-sm font-semibold">
                      {getInitials(userData.name)}
                    </span>
                  ) : (
                    <FaUser className="text-amber-600" />
                  )}
                </div>
                <span className="ml-2 text-amber-100 hidden md:block">
                  {userData ? userData.name : 'Patient User'}
                </span>
              </button>

              {/* Profile dropdown menu */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userData ? userData.email : 'patient@example.com'}
                    </p>
                  </div>
                  <Link
                    href="/patient/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUser className="mr-2 text-gray-400" />
                    Your Profile
                  </Link>
                  <Link
                    href="/patient/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaCog className="mr-2 text-gray-400" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-200"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2 text-gray-400" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-100 hover:text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-100 hover:bg-amber-600 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-green-500">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-medium">
                {userData ? (
                  <span className="text-sm font-semibold">
                    {getInitials(userData.name)}
                  </span>
                ) : (
                  <FaUser className="text-amber-600" />
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {userData ? userData.name : 'Patient User'}
                </div>
                <div className="text-sm font-medium text-amber-200">
                  {userData ? userData.email : 'patient@example.com'}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/patient/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/patient/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600 hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PatientNavbar;