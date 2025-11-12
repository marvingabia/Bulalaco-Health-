import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { roomsAPI } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { 
  DoorOpen, 
  Plus, 
  X, 
  Users, 
  Bed,
  Activity,
  Heart,
  Baby,
  Shield,
  Stethoscope,
  Siren,
  Microscope,
  Scan,
  Pill,
  Briefcase
} from 'lucide-react';

const ROOM_CATEGORIES = [
  // Patient Rooms
  { 
    id: 'patient_rooms',
    name: 'Patient Rooms', 
    icon: Bed, 
    category: 'Patient Care', 
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop',
    description: 'Standard hospital rooms for patient care'
  },
  { 
    id: 'private_rooms',
    name: 'Private Rooms', 
    icon: DoorOpen, 
    category: 'Patient Care', 
    color: 'green',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop',
    description: 'Private single-occupancy rooms'
  },
  { 
    id: 'isolation_rooms',
    name: 'Isolation Rooms', 
    icon: Shield, 
    category: 'Patient Care', 
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Isolation rooms for infectious diseases'
  },
  { 
    id: 'icu_rooms',
    name: 'ICU Rooms', 
    icon: Activity, 
    category: 'Patient Care', 
    color: 'red',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
    description: 'Intensive Care Unit rooms'
  },
  { 
    id: 'nicu_rooms',
    name: 'NICU Rooms', 
    icon: Baby, 
    category: 'Patient Care', 
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
    description: 'Neonatal Intensive Care Unit'
  },
  
  // Treatment and Procedure
  { 
    id: 'operating_rooms',
    name: 'Operating Rooms', 
    icon: Stethoscope, 
    category: 'Treatment & Procedure', 
    color: 'indigo',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop',
    description: 'Surgical operating rooms'
  },
  { 
    id: 'delivery_rooms',
    name: 'Delivery Rooms', 
    icon: Baby, 
    category: 'Treatment & Procedure', 
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Labor and delivery rooms'
  },
  { 
    id: 'emergency_rooms',
    name: 'Emergency Rooms', 
    icon: Siren, 
    category: 'Treatment & Procedure', 
    color: 'red',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop',
    description: '24/7 emergency care rooms'
  },
  
  // Diagnostic
  { 
    id: 'xray_rooms',
    name: 'X-Ray Rooms', 
    icon: Scan, 
    category: 'Diagnostic', 
    color: 'gray',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop',
    description: 'Radiography imaging rooms'
  },
  { 
    id: 'mri_rooms',
    name: 'MRI Rooms', 
    icon: Scan, 
    category: 'Diagnostic', 
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    description: 'Magnetic resonance imaging'
  },
  { 
    id: 'ct_scan_rooms',
    name: 'CT Scan Rooms', 
    icon: Scan, 
    category: 'Diagnostic', 
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop',
    description: 'CT scanning rooms'
  },
  { 
    id: 'laboratory_rooms',
    name: 'Laboratory Rooms', 
    icon: Microscope, 
    category: 'Diagnostic', 
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop',
    description: 'Medical laboratory and testing'
  },
  
  // Administrative
  { 
    id: 'admin_offices',
    name: 'Administrative Offices', 
    icon: Briefcase, 
    category: 'Administrative', 
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    description: 'Hospital administration offices'
  },
  { 
    id: 'medical_records',
    name: 'Medical Records', 
    icon: Microscope, 
    category: 'Administrative', 
    color: 'indigo',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
    description: 'Medical records department'
  },
  { 
    id: 'billing_dept',
    name: 'Billing Department', 
    icon: Pill, 
    category: 'Administrative', 
    color: 'green',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    description: 'Billing and payments'
  },
  { 
    id: 'it_dept',
    name: 'IT Department', 
    icon: Activity, 
    category: 'Administrative', 
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    description: 'Information technology'
  },
  
  // Support
  { 
    id: 'nurse_stations',
    name: 'Nurse Stations', 
    icon: Heart, 
    category: 'Support', 
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Nursing staff stations'
  },
  { 
    id: 'doctor_offices',
    name: 'Doctor Offices', 
    icon: Stethoscope, 
    category: 'Support', 
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Physician offices'
  },
  { 
    id: 'waiting_rooms',
    name: 'Waiting Rooms', 
    icon: Users, 
    category: 'Support', 
    color: 'gray',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Patient and family waiting areas'
  },
];

export default function Rooms() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editForm, setEditForm] = useState({
    total_rooms: 0,
    available: 0,
    occupied: 0,
    maintenance: 0,
  });

  useEffect(() => {
    loadRoomData();
  }, []);

  const loadRoomData = () => {
    // Initialize with default data
    const initialData = ROOM_CATEGORIES.map(cat => ({
      ...cat,
      total_rooms: 0,
      available: 0,
      occupied: 0,
      maintenance: 0,
    }));
    
    // Load from localStorage if exists
    const saved = localStorage.getItem('hospitalRoomsData');
    if (saved) {
      setRoomData(JSON.parse(saved));
    } else {
      setRoomData(initialData);
    }
    setLoading(false);
  };

  const saveRoomData = (data) => {
    localStorage.setItem('hospitalRoomsData', JSON.stringify(data));
    setRoomData(data);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setEditForm({
      total_rooms: room.total_rooms,
      available: room.available,
      occupied: room.occupied,
      maintenance: room.maintenance,
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    const updatedData = roomData.map(room => 
      room.id === selectedRoom.id 
        ? { ...room, ...editForm }
        : room
    );
    saveRoomData(updatedData);
    setShowEditModal(false);
  };

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      red: 'bg-red-100 text-red-800 border-red-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
      pink: 'bg-pink-100 text-pink-800 border-pink-300',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      teal: 'bg-teal-100 text-teal-800 border-teal-300',
      gray: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[color] || colors.gray;
  };

  const categories = ['all', ...new Set(ROOM_CATEGORIES.map(r => r.category))];
  
  const filteredRooms = roomData.filter(room => 
    filterCategory === 'all' || room.category === filterCategory
  );

  const totalStats = roomData.reduce((acc, room) => ({
    total: acc.total + room.total_rooms,
    available: acc.available + room.available,
    occupied: acc.occupied + room.occupied,
    maintenance: acc.maintenance + room.maintenance,
  }), { total: 0, available: 0, occupied: 0, maintenance: 0 });

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hospital Rooms</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0D2EB] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading rooms...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hospital Rooms Management</h1>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold">{totalStats.total}</p>
              </div>
              <DoorOpen className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.available}</p>
              </div>
              <Bed className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.occupied}</p>
              </div>
              <Users className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{totalStats.maintenance}</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const Icon = room.icon;
          const occupancyRate = room.total_rooms > 0 
            ? Math.round((room.occupied / room.total_rooms) * 100) 
            : 0;
          
          return (
            <Card key={room.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="flex flex-col">
                {/* Room Image */}
                <div className="h-48 relative">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Room+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(room.color)} backdrop-blur-sm border`}>
                      {room.category}
                    </span>
                  </div>
                </div>
                
                {/* Room Details */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Rooms:</span>
                      <span className="text-lg font-bold text-gray-900">{room.total_rooms}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-xs text-gray-600">Available</p>
                        <p className="text-lg font-bold text-green-600">{room.available}</p>
                      </div>
                      <div className="bg-red-50 rounded p-2">
                        <p className="text-xs text-gray-600">Occupied</p>
                        <p className="text-lg font-bold text-red-600">{room.occupied}</p>
                      </div>
                      <div className="bg-yellow-50 rounded p-2">
                        <p className="text-xs text-gray-600">Maintenance</p>
                        <p className="text-lg font-bold text-yellow-600">{room.maintenance}</p>
                      </div>
                    </div>
                    
                    {room.total_rooms > 0 && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Occupancy Rate</span>
                          <span className="font-semibold">{occupancyRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${
                              occupancyRate >= 80 ? 'bg-red-500' : 
                              occupancyRate >= 50 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${occupancyRate}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleEdit(room)} 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      Update Room Count
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Update {selectedRoom.name}</CardTitle>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Total Rooms</label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.total_rooms}
                    onChange={(e) => setEditForm({ ...editForm, total_rooms: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Available</label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.available}
                    onChange={(e) => setEditForm({ ...editForm, available: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Occupied</label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.occupied}
                    onChange={(e) => setEditForm({ ...editForm, occupied: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Maintenance</label>
                  <Input
                    type="number"
                    min="0"
                    value={editForm.maintenance}
                    onChange={(e) => setEditForm({ ...editForm, maintenance: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                  <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
