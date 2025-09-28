"use client"
import Navbar from '@/app/navbar';
import { FaHeart, FaUsers, FaAward, FaLeaf, FaShieldAlt, FaHandHoldingHeart, FaUser } from 'react-icons/fa';

const AboutUs = () => {
  const features = [
    {
      icon: <FaLeaf className="h-12 w-12 text-green-600" />,
      title: "Authentic Ayurveda",
      description: "Rooted in 5000-year-old traditional Ayurvedic wisdom with authentic Panchakarma therapies"
    },
    {
      icon: <FaShieldAlt className="h-12 w-12 text-amber-600" />,
      title: "Quality Assured",
      description: "Certified practitioners and standardized protocols ensuring consistent therapy quality"
    },
    {
      icon: <FaHandHoldingHeart className="h-12 w-12 text-green-600" />,
      title: "Patient-Centric Care",
      description: "Personalized treatment plans based on individual Prakriti and health requirements"
    },
    {
      icon: <FaUsers className="h-12 w-12 text-amber-600" />,
      title: "Expert Team",
      description: "Highly qualified Ayurvedic doctors and therapists with decades of combined experience"
    }
  ];

  const stats = [
    { number: "5000+", label: "Patients Treated" },
    { number: "98%", label: "Success Rate" },
    { number: "50+", label: "Certified Practitioners" },
    { number: "15+", label: "Years of Experience" }
  ];

  const team = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Chief Ayurvedic Consultant",
      experience: "25+ years",
      specialization: "Panchakarma & Chronic Diseases"
    },
    {
      name: "Dr. Priya Mehta",
      role: "Senior Therapy Specialist",
      experience: "18+ years",
      specialization: "Abhyanga & Shirodhara"
    },
    {
      name: "Dr. Amit Kumar",
      role: "Nutrition & Lifestyle Expert",
      experience: "15+ years",
      specialization: "Ayurvedic Dietetics"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-amber-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547981609-4b6bfc67c272?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About PanchaKarma</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Integrating ancient Ayurvedic wisdom with modern technology to provide authentic 
              detoxification, rejuvenation, and chronic disease management.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To make authentic Panchakarma therapies accessible to everyone through our innovative 
                digital platform that bridges traditional Ayurvedic practices with modern healthcare management.
              </p>
              <p className="text-lg text-gray-600">
                We believe in the power of ancient wisdom combined with contemporary technology 
                to deliver holistic healing and sustainable wellness.
              </p>
            </div>
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200">
              <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600">
                To become the world's most trusted platform for authentic Ayurvedic care, 
                transforming lives through personalized Panchakarma therapies and digital wellness solutions.
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <FaHeart className="h-8 w-8 text-green-600 mb-3" />
                <p className="text-green-800 font-semibold">
                  "Healing the world, one person at a time, through authentic Ayurveda"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-4">Why Choose PanchaKarma?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine traditional authenticity with modern efficiency to deliver exceptional Ayurvedic care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-green-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-amber-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of certified Ayurvedic practitioners brings decades of experience and deep knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="h-10 w-10 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{member.name}</h3>
                <p className="text-green-700 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 mb-2">Experience: {member.experience}</p>
                <p className="text-sm text-gray-500">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Core Values</h2>
            <p className="text-green-100 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <FaAward className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-green-100">
                Staying true to classical Ayurvedic texts and traditional Panchakarma practices
              </p>
            </div>
            <div className="text-center p-6">
              <FaHeart className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-green-100">
                Treating every patient with empathy, respect, and personalized care
              </p>
            </div>
            <div className="text-center p-6">
              <FaShieldAlt className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-green-100">
                Maintaining the highest standards in therapy quality and patient safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Begin Your Wellness Journey?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have transformed their health through authentic Panchakarma therapies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Book a Consultation
            </button>
            <button className="border border-white text-white hover:bg-amber-700 px-8 py-3 rounded-md font-medium transition-colors">
              Learn More About Therapies
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
    
  );
};

export default AboutUs;