import { Heart, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About Bulalacao Health Hub</h1>
          <p className="text-xl text-blue-100">Your health, our priority</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, quality healthcare services to the community of Bulalacao and surrounding areas. 
              We are committed to delivering compassionate care with modern medical technology and highly trained professionals.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the leading healthcare provider in the region, recognized for excellence in patient care, 
              medical innovation, and community health programs. We envision a healthier future for all.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Compassion</h3>
              <p className="text-gray-600 text-sm">We care deeply about every patient</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Committed to the highest standards</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Teamwork</h3>
              <p className="text-gray-600 text-sm">Collaboration for better outcomes</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">Honest and ethical in all we do</p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Bulalacao Health Hub was established to serve the healthcare needs of our growing community. 
              What started as a small clinic has grown into a comprehensive healthcare facility equipped with 
              modern medical technology and staffed by dedicated healthcare professionals.
            </p>
            <p className="mb-4">
              Over the years, we have expanded our services to include emergency care, specialized treatments, 
              diagnostic services, and preventive health programs. Our commitment to the community remains 
              unwavering as we continue to grow and improve our facilities.
            </p>
            <p>
              Today, we serve thousands of patients annually, providing quality healthcare that is accessible 
              and affordable. We are proud to be a trusted healthcare partner for families in Bulalacao and beyond.
            </p>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Emergency Care</h3>
              <p className="text-blue-100">24/7 emergency services for urgent medical needs</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Patient Care</h3>
              <p className="text-blue-100">Comprehensive inpatient and outpatient services</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Diagnostics</h3>
              <p className="text-blue-100">Advanced diagnostic and laboratory services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
