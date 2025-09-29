"use client"
import { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaSpa, FaHeart, FaUserMd, FaComments, FaTimes, FaPaperPlane, FaClinicMedical, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from './navbar';

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! I'm your AI Ayurvedic assistant. How can I guide you on your wellness journey today?", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const messagesEndRef = useRef(null);

  // Initialize Gemini AI with correct configuration
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  // Add this check to ensure your API key is available
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.error("Gemini API key is missing");
}

  const testimonials = [
    { name: "Dr. Priya Sharma", role: "Ayurvedic Practitioner", text: "This platform has revolutionized how I manage my Panchakarma treatments. The automation saves me hours daily.", image: "👩‍⚕️" },
    { name: "Rajesh Kumar", role: "Patient", text: "The personalized treatment tracking helped me achieve better results than ever before. Truly transformative!", image: "🧘‍♂️" },
    { name: "Dr. Anand Patel", role: "Wellness Center Director", text: "Our patient satisfaction increased by 40% after implementing this system. Outstanding results!", image: "👨‍⚕️" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

const generateGeminiResponse = async (userMessage) => {
  try {
    setIsLoading(true);
    
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!API_KEY) {
      throw new Error("API key not configured");
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert in ayurveda. Provide helpful information about: ${userMessage} in minimum possible words and in simple language also do not provide * like symbols `
            }]
          }]
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return getFallbackResponse(userMessage);
  } finally {
    setIsLoading(false);
  }
};

// Add the missing fallback function
const getFallbackResponse = (userMessage) => {
  const fallbacks = [
    "I apologize, but I'm experiencing technical difficulties connecting to my knowledge base. Please try again shortly.",
    "I'm having trouble accessing that information right now. Could you try rephrasing your question?",
    "I'm currently unable to process your request. Please try again in a moment.",
    "I'm experiencing connectivity issues with my Ayurvedic database. Please try your question again."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;
    
    // Add user message
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInputMessage("");
    
    // Generate AI response
    const aiResponse = await generateGeminiResponse(userMessage);
    
    // Add AI response
    setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const therapies = [
    {
      icon: <FaLeaf className="text-4xl text-emerald-600" />,
      title: "Abhyanga",
      description: "Traditional oil massage that promotes relaxation and detoxification"
    },
    {
      icon: <FaSpa className="text-4xl text-emerald-600" />,
      title: "Shirodhara",
      description: "Warm oil poured on forehead to calm the mind and nervous system"
    },
    {
      icon: <FaHeart className="text-4xl text-emerald-600" />,
      title: "Virechana",
      description: "Therapeutic purgation therapy for cleansing the body"
    },
    {
      icon: <FaUserMd className="text-4xl text-emerald-600" />,
      title: "Basti",
      description: "Herbal enema therapy for nourishing and rejuvenating the body"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
     
       <Navbar/>
        <br/>

      {/* Hero Section */}
      <section id="home" className="relative py-20 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-amber-200 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Trusted by 500+ Practitioners
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent"> Ayurvedic </span>
                  Practice
                </h1>
                <p className="text-xl text-emerald-100 leading-relaxed">
                  The worlds most advanced Panchakarma management platform. Seamlessly blend ancient wisdom with cutting-edge technology for unparalleled patient outcomes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Start Free Trial →
                </button>
                <button className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                  📺 Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">500+</div>
                  <div className="text-sm text-emerald-200">Active Practitioners</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">10K+</div>
                  <div className="text-sm text-emerald-200">Treatments Managed</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">98%</div>
                  <div className="text-sm text-emerald-200">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:pl-12">
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-r from-emerald-500 to-amber-500 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-semibold">Patient Dashboard</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        🧘‍♀️
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Abhyanga Therapy</div>
                        <div className="text-sm text-gray-500">Next session: Tomorrow 10:00 AM</div>
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-emerald-700">Progress</span>
                        <span className="text-sm text-emerald-600">85%</span>
                      </div>
                      <div className="w-full bg-emerald-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-8 -right-8 bg-amber-400 rounded-full p-4 shadow-lg animate-bounce delay-500">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-emerald-500 rounded-xl p-3 shadow-lg">
                  <div className="text-white text-sm font-medium">📊 Analytics</div>
                  <div className="text-emerald-100 text-xs">Real-time insights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapies Section */}
      <section id="therapies" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold">Traditional Therapies</span>
            <h2 className="text-3xl font-bold text-emerald-800 mt-2">Our Healing Treatments</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {therapies.map((therapy, index) => (
              <div key={index} className="bg-emerald-50 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-emerald-200">
                <div className="flex justify-center mb-4">
                  {therapy.icon}
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 text-center mb-2">{therapy.title}</h3>
                <p className="text-emerald-700 text-center">{therapy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 text-emerald-600 font-medium mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Powerful Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent"> Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary features designed to elevate your Ayurvedic practice and enhance patient outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCalendarAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
              <p className="text-gray-600 mb-4">AI-powered scheduling that optimizes therapy sessions based on availability and treatment protocols.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClinicMedical className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Patient Management</h3>
              <p className="text-gray-600 mb-4">Comprehensive patient tracking with personalized treatment plans and progress monitoring.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">Comprehensive progress tracking with visualizations, outcome predictions, and personalized insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-white to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold">Why Choose Panchakarma</span>
            <h2 className="text-3xl font-bold text-emerald-800 mt-2">Holistic Benefits</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <FaLeaf className="text-emerald-700 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Detoxification</h3>
              <p className="text-emerald-700">Eliminate deep-rooted toxins from your body and restore natural balance.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-amber-700 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Rejuvenation</h3>
              <p className="text-amber-700">Revitalize your body, mind and spirit for optimal wellness and longevity.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <FaSpa className="text-emerald-700 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Balance Restoration</h3>
              <p className="text-emerald-700">Restore harmony to your doshas for complete wellbeing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Loved by Practitioners
              <span className="text-amber-300"> Worldwide</span>
            </h2>
          </div>

          <div className="relative">
            <div className="flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-4xl shadow-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-3xl">
                      {testimonials[currentTestimonial].image}
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-relaxed">
                      {testimonials[currentTestimonial].text}
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                      <div className="font-bold text-emerald-700 text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-amber-400 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100 via-white to-emerald-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-emerald-800 mb-6">
              Start Your
              <span className="text-amber-600"> Wellness Journey </span>
              Today
            </h2>
            
            <p className="text-xl text-emerald-700 mb-12 leading-relaxed">
              Join over 500 practitioners who have revolutionized their Ayurvedic practice. 
              <span className="font-semibold text-amber-600"> Get 30 days free trial!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                Book a Consultation
              </button>
              
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                Explore Treatments
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-600">
              <div className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                <span className="font-medium">30-Day Free Trial</span>
              </div>
              <div className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                <span className="font-medium">No Setup Fees</span>
              </div>
              <div className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-amber-200">Panchakarma Therapy</h3>
              <p className="mb-4">Ancient healing for modern wellness. Rejuvenate your body, mind and spirit through authentic Ayurvedic practices.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-200 hover:text-amber-400 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-400 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-amber-200 hover:text-amber-400 transition">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-amber-200">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-amber-400 transition">Home</a></li>
                <li><a href="#therapies" className="hover:text-amber-400 transition">Therapies</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-amber-200">Contact Us</h3>
              <p className="mb-2">123 Ayurveda Lane</p>
              <p className="mb-2">Wellness City, WC 12345</p>
              <p className="mb-2">info@ayurvedapanchakarma.com</p>
              <p>(555) 123-HEAL</p>
            </div>
          </div>
          
          <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-amber-200">
            <p>© {new Date().getFullYear()} Ayurvedic Panchakarma Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Enhanced Chatbot with increased width */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-96 h-[32rem] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col border border-emerald-200">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm">
                  <FaComments className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Ayurvedic Assistant</h3>
                  <p className="text-emerald-100 text-xs">Online • Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="text-white hover:bg-emerald-800 rounded-full p-1 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-emerald-50 to-white space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs lg:max-w-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-white rounded-b-2xl border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Panchakarma treatments..."
                  className="flex-1 border text-black text-blackgit border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || inputMessage.trim() === ""}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <p className="text-xs text-gray-400">Powered by Gemini AI • Ayurvedic expertise</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="group w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <div className="relative">
              <FaComments className="text-2xl" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;