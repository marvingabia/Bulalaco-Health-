import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/Card';
import { Users, Bed, UserCog, Pill, Calendar, FileText, Truck, Heart, Phone, Clock, Activity, AlertCircle, Home, Info, UserCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { patientsAPI, staffAPI } from '../services/api';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    roomOccupancy: 0,
    staffOnDuty: 0,
    pharmacyInventory: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch patients count
      const patientsResponse = await patientsAPI.getAll();
      const totalPatients = patientsResponse.data.data?.length || 0;
      
      // Fetch staff count
      const staffResponse = await staffAPI.getAll();
      const allStaff = staffResponse.data.data || [];
      const staffOnDuty = allStaff.filter(s => s.status === 'on-duty').length;
      
      // Get room occupancy from localStorage
      const roomsData = localStorage.getItem('hospitalRoomsNew');
      let roomOccupancy = 0;
      if (roomsData) {
        const rooms = JSON.parse(roomsData);
        const totalRooms = rooms.reduce((sum, room) => sum + room.totalRooms, 0);
        const occupiedRooms = rooms.reduce((sum, room) => sum + room.occupiedRooms, 0);
        roomOccupancy = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
      }
      
      // Get pharmacy inventory from localStorage
      const pharmacyData = localStorage.getItem('pharmacyMedicines');
      let pharmacyInventory = 0;
      if (pharmacyData) {
        const medicines = JSON.parse(pharmacyData);
        pharmacyInventory = medicines.length;
      }
      
      setStats({
        totalPatients,
        roomOccupancy,
        staffOnDuty,
        pharmacyInventory,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    { title: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Room Occupancy', value: `${stats.roomOccupancy}%`, icon: Bed, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Staff on Duty', value: stats.staffOnDuty, icon: UserCog, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Pharmacy Inventory', value: stats.pharmacyInventory, icon: Pill, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const patientQuickActions = [
    {
      title: 'My Medical Records',
      description: 'View your medical history and records',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      path: '/dashboard/my-records'
    },
    {
      title: 'Request Ambulance',
      description: 'Emergency ambulance service',
      icon: Truck,
      color: 'from-red-500 to-pink-500',
      path: '/dashboard/ambulance'
    },
    {
      title: 'View Rooms',
      description: 'Check available hospital rooms',
      icon: Bed,
      color: 'from-green-500 to-emerald-500',
      path: '/dashboard/rooms'
    },
    {
      title: 'Pharmacy',
      description: 'Browse available medicines',
      icon: Pill,
      color: 'from-purple-500 to-indigo-500',
      path: '/dashboard/pharmacy'
    }
  ];

  const healthTips = [
    {
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily',
      icon: Heart,
      color: 'text-blue-500'
    },
    {
      title: 'Regular Exercise',
      description: 'Exercise for 30 minutes daily',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      title: 'Healthy Diet',
      description: 'Eat balanced meals with fruits and vegetables',
      icon: Heart,
      color: 'text-red-500'
    }
  ];

  const emergencyContacts = [
    { name: 'Emergency Hotline', number: '+63 912 345 6789', available: '24/7' },
    { name: 'Ambulance Service', number: '+63 923 456 7890', available: '24/7' },
    { name: 'Reception Desk', number: '+63 934 567 8901', available: '8AM - 5PM' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
      </div>

      {isAdmin ? (
        <>
          {/* Quick Links Section - Only Home, About, Profile, Contact */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/home')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <Home className="w-8 h-8" />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <Info className="w-8 h-8" />
                <span>About Us</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/profile')}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <UserCircle className="w-8 h-8" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <Mail className="w-8 h-8" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsDisplay.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`${stat.bgColor} p-3 rounded-lg`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <p className="text-gray-600">No recent activity to display.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">System Overview</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Patients</span>
                    <span className="text-lg font-bold text-blue-600">{stats.totalPatients}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Staff on Duty</span>
                    <span className="text-lg font-bold text-green-600">{stats.staffOnDuty}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Medicines Available</span>
                    <span className="text-lg font-bold text-purple-600">{stats.pharmacyInventory}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* Patient Welcome Banner */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
                <p className="text-cyan-100 text-lg">We hope you're feeling well today</p>
              </div>
              <div className="hidden md:block">
                <Heart className="w-24 h-24 text-white opacity-20" />
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {patientQuickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    onClick={() => navigate(action.path)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                  >
                    <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
                    <div className="p-6">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Tips */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Health Tips</h3>
                  </div>
                  <div className="space-y-4">
                    {healthTips.map((tip, index) => {
                      const Icon = tip.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-shrink-0">
                            <Icon className={`w-8 h-8 ${tip.color}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                            <p className="text-gray-600 text-sm">{tip.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900">Regular Check-ups</p>
                        <p className="text-sm text-blue-700">Don't forget to schedule your regular health check-ups</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contacts */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
                  </div>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-100">
                        <h4 className="font-bold text-gray-900 mb-1">{contact.name}</h4>
                        <a 
                          href={`tel:${contact.number}`}
                          className="text-red-600 font-semibold hover:underline block mb-1"
                        >
                          {contact.number}
                        </a>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{contact.available}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="w-6 h-6" />
                      <h4 className="font-bold">Need Ambulance?</h4>
                    </div>
                    <p className="text-sm text-red-50 mb-3">Emergency ambulance service available 24/7</p>
                    <button
                      onClick={() => navigate('/dashboard/ambulance')}
                      className="w-full bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Request Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activity to display</p>
                  <p className="text-sm text-gray-500 mt-2">Your appointments and medical records will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
