import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Activity, ArrowRight, Pill, Heart, Shield, Stethoscope } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0D2EB]"></div>
      </div>
    );
  }

  const medicines = [
    {
      name: 'Paracetamol',
      description: 'Pain reliever and fever reducer',
      price: '₱15.00',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
      category: 'Pain Relief'
    },
    {
      name: 'Amoxicillin',
      description: 'Antibiotic for bacterial infections',
      price: '₱25.00',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
      category: 'Antibiotics'
    },
    {
      name: 'Ibuprofen',
      description: 'Anti-inflammatory pain reliever',
      price: '₱20.00',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop',
      category: 'Pain Relief'
    },
    {
      name: 'Cetirizine',
      description: 'Antihistamine for allergies',
      price: '₱18.00',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=300&fit=crop',
      category: 'Allergy'
    },
    {
      name: 'Omeprazole',
      description: 'Acid reflux and stomach ulcer treatment',
      price: '₱30.00',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=300&h=300&fit=crop',
      category: 'Gastric'
    },
    {
      name: 'Metformin',
      description: 'Diabetes medication',
      price: '₱35.00',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop',
      category: 'Diabetes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Activity className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">
            Bulalacao Health Hub
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your trusted healthcare partner in Oriental Mindoro. Comprehensive medical services with modern facilities and experienced professionals.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-cyan-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Login
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-bold py-4 px-8 rounded-full transition-all duration-200 flex items-center gap-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">Comprehensive healthcare solutions for your family</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Medical Care</h3>
            <p className="text-gray-600 text-sm">Expert medical consultation and treatment</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Pharmacy</h3>
            <p className="text-gray-600 text-sm">Complete range of medicines and health products</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Emergency</h3>
            <p className="text-gray-600 text-sm">24/7 emergency medical services</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Prevention</h3>
            <p className="text-gray-600 text-sm">Health screening and preventive care</p>
          </div>
        </div>
      </div>

      {/* Pharmacy Medicine Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Pill className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Pharmacy</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We stock a comprehensive range of quality medicines and health products at affordable prices. 
              All medications are sourced from trusted suppliers and properly stored.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {medicines.map((medicine, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={medicine.image} 
                    alt={medicine.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=Medicine';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full font-semibold">
                      {medicine.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{medicine.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{medicine.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-cyan-600">{medicine.price}</span>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm hover:shadow-lg transition-all">
                      Available
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register to Access Pharmacy
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Bulalacao Health Hub</h3>
          <p className="text-gray-300 mb-4">Serving the community with quality healthcare since 2010</p>
          <p className="text-sm text-gray-400">
            The first user to register will automatically become the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
