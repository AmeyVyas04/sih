// app/patientdashboard/navcomp/contactus/page.js
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaPaperPlane,
  FaHeadset,
  FaExclamationTriangle,
  FaLightbulb,
  FaQuestionCircle
} from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: 'general',
    subject: '',
    message: '',
    urgency: 'medium',
    therapyRelated: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryTypes = [
    { value: 'general', label: 'General Inquiry', icon: FaQuestionCircle },
    { value: 'technical', label: 'Technical Support', icon: FaHeadset },
    { value: 'therapy', label: 'Therapy Related', icon: FaClipboardList },
    { value: 'billing', label: 'Billing Issue', icon: FaExclamationTriangle },
    { value: 'complaint', label: 'Complaint', icon: FaExclamationTriangle },
    { value: 'suggestion', label: 'Suggestion', icon: FaLightbulb },
    { value: 'emergency', label: 'Emergency', icon: FaExclamationTriangle }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to notify admin
    try {
      // This would be your actual API call to notify admin
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        queryType: 'general',
        subject: '',
        message: '',
        urgency: 'medium',
        therapyRelated: '',
        preferredContact: 'email'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-amber-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4">
              <FaArrowLeft className="mr-2" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
            <p className="text-amber-100 mt-2">We are here to help you</p>
          </div>
        </div>

        {/* Success Message */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPaperPlane className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out to us. We have received your message and our support team will get back to you within 24 hours.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>📧 A confirmation email has been sent to your inbox</p>
              <p>⏰ Average response time: 2-4 hours</p>
              <p>🔔 Admin has been notified about your query</p>
            </div>
            <div className="mt-8 space-x-4">
              <Link 
                href="/patientdashboard/homepage"
                className="bg-gradient-to-r from-green-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-amber-700 transition-all"
              >
                Back to Dashboard
              </Link>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/patientdashboard/homepage" className="inline-flex items-center text-amber-100 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="text-amber-100 mt-2">Get in touch with our support team</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get Help & Support</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHeadset className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support Hours</h3>
                    <p className="text-sm text-gray-600">Mon - Sun: 7:00 AM - 10:00 PM</p>
                    <p className="text-sm text-gray-600">Emergency: 24/7 Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                    <p className="text-sm text-gray-600">support@ayurvedaclinic.com</p>
                    <p className="text-sm text-gray-600">response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                    <p className="text-sm text-gray-600">For urgent queries only</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-green-800 mb-2">Before Contacting</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Check our FAQ section first</li>
                  <li>• Have your therapy details ready</li>
                  <li>• For emergencies, call directly</li>
                  <li>• Include relevant screenshots if any</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2 text-green-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2 text-green-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2 text-green-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>

                {/* Query Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Query Type *
                    </label>
                    <select
                      name="queryType"
                      value={formData.queryType}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {queryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level *
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low - Can wait 24-48 hours</option>
                      <option value="medium">Medium - Response within 12 hours</option>
                      <option value="high">High - Need response in 4 hours</option>
                      <option value="urgent">Urgent - Immediate attention needed</option>
                    </select>
                  </div>
                </div>

                {/* Therapy Related (Conditional) */}
                {formData.queryType === 'therapy' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related Therapy
                    </label>
                    <select
                      name="therapyRelated"
                      value={formData.therapyRelated}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select a therapy</option>
                      <option value="abhyanga">Abhyanga Therapy</option>
                      <option value="shirodhara">Shirodhara Treatment</option>
                      <option value="basti">Basti Therapy</option>
                      <option value="marma">Marma Therapy</option>
                      <option value="nasya">Nasya Treatment</option>
                      <option value="other">Other Therapy</option>
                    </select>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief description of your query"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Please provide detailed information about your query, issue, or suggestion. Include any relevant details that can help us assist you better."
                  />
                </div>

                {/* Emergency Notice */}
                {formData.urgency === 'urgent' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="text-red-500 mr-2" />
                      <span className="font-semibold text-red-800">Urgent Query</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      For urgent medical emergencies, please call our emergency line immediately: 
                      <strong> +91 98765 43210</strong>
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    * Required fields
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;