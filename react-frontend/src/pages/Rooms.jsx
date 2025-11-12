import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { patientsAPI } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { 
  DoorOpen, 
  Plus, 
  X, 
  Users, 
  Bed,
  Activity,
  Baby,
  Shield,
  Stethoscope,
  Siren,
  Microscope,
  Scan,
  ArrowLeft,
  Calendar,
  User,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

// Room Categories
const ROOM_CATEGORIES = [
  { id: 'patient_room', name: 'Patient Rooms', icon: Bed, color: 'blue', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop' },
  { id: 'private_room', name: 'Private Rooms', icon: DoorOpen, color: 'green', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop' },
  { id: 'isolation_room', name: 'Isolation Rooms', icon: Shield, color: 'yellow', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop' },
  { id: 'icu_room', name: 'ICU Rooms', icon: Activity, color: 'red', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop' },
  { id: 'nicu_room', name: 'NICU Rooms', icon: Baby, color: 'pink', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop' },
  { id: 'operating_room', name: 'Operating Rooms', icon: Stethoscope, color: 'indigo', image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop' },
  { id: 'delivery_room', name: 'Delivery Rooms', icon: Baby, color: 'pink', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop' },
  { id: 'emergency_room', name: 'Emergency Rooms', icon: Siren, color: 'red', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop' },
  { id: 'xray_room', name: 'X-Ray Rooms', icon: Scan, color: 'gray', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop' },
  { id: 'mri_room', name: 'MRI Rooms', icon: Scan, color: 'blue', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop' },
  { id: 'ct_scan_room', name: 'CT Scan Rooms', icon: Scan, color: 'blue', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop' },
  { id: 'laboratory_room', name: 'Laboratory Rooms', icon: Microscope, color: 'teal', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop' },
  { id: 'waiting_room', name: 'Waiting Rooms', icon: Users, color: 'gray', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop' },
];

export default function Rooms() {
  const { isAdmin } = useAuth();
  const [view, setView] = useState('categories'); // 'categories' or 'rooms'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showAssignPatientModal, setShowAssignPatientModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newRoom, setNewRoom] = useState({
    room_number: '',
    capacity: 1,
  });

  const [assignment, setAssignment] = useState({
    patient_id: '',
    admission_date: new Date().toISOString().split('T')[0],
    expected_discharge: '',
  });

  useEffect(() => {
    loadRooms();
    loadPatients();
  }, []);

  const loadRooms = () => {
    const saved = localStorage.getItem('hospitalRooms');
    if (saved) {
      setRooms(JSON.parse(saved));
    }
  };

  const saveRooms = (roomsData) => {
    localStorage.setItem('hospitalRooms', JSON.stringify(roomsData));
    setRooms(roomsData);
  };

  const loadPatients = async () => {
    try {
      const response = await patientsAPI.getAll();
      setPatients(response.data.data || []);
    } catch (err) {
      console.error('Error loading patients:', err);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setView('rooms');
  };

  const handleAddRoom = () => {
    const room = {
      id: Date.now(),
      category_id: selectedCategory.id,
      room_number: newRoom.room_number,
      capacity: newRoom.capacity,
      status: 'available',
      patients: [],
    };
    
    const updatedRooms = [...rooms, room];
    saveRooms(updatedRooms);
    setShowAddRoomModal(false);
    setNewRoom({ room_number: '', capacity: 1 });
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditRoomModal(true);
  };

  const handleUpdateRoom = () => {
    const updatedRooms = rooms.map(room =>
      room.id === editingRoom.id ? editingRoom : room
    );
    saveRooms(updatedRooms);
    setShowEditRoomModal(false);
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId) => {
    if (confirm('Are you sure you want to delete this room?')) {
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      saveRooms(updatedRooms);
    }
  };

  const handleAssignPatient = () => {
    const patient = patients.find(p => p.id === parseInt(assignment.patient_id));
    if (!patient) return;

    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          patients: [...room.patients, {
            ...patient,
            admission_date: assignment.admission_date,
            expected_discharge: assignment.expected_discharge,
          }],
          status: room.patients.length + 1 >= room.capacity ? 'occupied' : 'available',
        };
      }
      return room;
    });

    saveRooms(updatedRooms);
    setShowAssignPatientModal(false);
    setAssignment({ patient_id: '', admission_date: new Date().toISOString().split('T')[0], expected_discharge: '' });
  };

  const handleRemovePatient = (roomId, patientId) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        const newPatients = room.patients.filter(p => p.id !== patientId);
        return {
          ...room,
          patients: newPatients,
          status: newPatients.length >= room.capacity ? 'occupied' : 'available',
        };
      }
      return room;
    });
    saveRooms(updatedRooms);
  };

  const getCategoryRooms = (categoryId) => {
    return rooms.filter(r => r.category_id === categoryId);
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

  // Categories View
  if (view === 'categories') {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hospital Rooms</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ROOM_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const categoryRooms = getCategoryRooms(category.id);
            const totalRooms = categoryRooms.length;
            const occupiedRooms = categoryRooms.filter(r => r.status === 'occupied').length;
            const availableRooms = totalRooms - occupiedRooms;
            
            // Calculate folding bed statistics
            const totalCapacity = categoryRooms.reduce((sum, room) => sum + room.capacity, 0);
            const occupiedBeds = categoryRooms.reduce((sum, room) => sum + room.patients.length, 0);
            const availableBeds = totalCapacity - occupiedBeds;

            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => handleSelectCategory(category)}
              >
                <div className="h-40 relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
                      <p className="text-xs text-gray-600">Total Rooms</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
                      <p className="text-xs text-gray-600">Available</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{occupiedRooms}</p>
                      <p className="text-xs text-gray-600">Occupied</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 font-semibold mb-2 text-center">Folding Beds</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xl font-bold text-blue-600">{totalCapacity}</p>
                        <p className="text-xs text-gray-600">Total Beds</p>
                      </div>
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-xl font-bold text-green-600">{availableBeds}</p>
                        <p className="text-xs text-gray-600">Available</p>
                      </div>
                      <div className="bg-red-50 rounded p-2">
                        <p className="text-xl font-bold text-red-600">{occupiedBeds}</p>
                        <p className="text-xs text-gray-600">Occupied</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Rooms Detail View
  const categoryRooms = getCategoryRooms(selectedCategory.id);
  const Icon = selectedCategory.icon;
  
  // Filter rooms by search term
  const filteredRooms = categoryRooms.filter(room =>
    room.room_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate statistics for this category
  const totalRoomsInCategory = categoryRooms.length;
  const occupiedRoomsInCategory = categoryRooms.filter(r => r.status === 'occupied').length;
  const availableRoomsInCategory = totalRoomsInCategory - occupiedRoomsInCategory;
  const totalCapacityInCategory = categoryRooms.reduce((sum, room) => sum + room.capacity, 0);
  const occupiedBedsInCategory = categoryRooms.reduce((sum, room) => sum + room.patients.length, 0);
  const availableBedsInCategory = totalCapacityInCategory - occupiedBedsInCategory;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => setView('categories')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Icon className="w-8 h-8 text-gray-600" />
          <h1 className="text-3xl font-bold text-gray-900">{selectedCategory.name}</h1>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowAddRoomModal(true)} className="ml-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search rooms by number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Statistics Summary - Admin Only */}
      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-900">{totalRoomsInCategory}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-green-600">✓ {availableRoomsInCategory} Available</span>
                    <span className="text-red-600">● {occupiedRoomsInCategory} Occupied</span>
                  </div>
                </div>
                <DoorOpen className="w-12 h-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Folding Beds</p>
                  <p className="text-3xl font-bold text-blue-600">{totalCapacityInCategory}</p>
                  <p className="text-xs text-gray-500 mt-2">Total bed capacity</p>
                </div>
                <Bed className="w-12 h-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bed Occupancy</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-green-600">{availableBedsInCategory}</p>
                    <span className="text-sm text-gray-500">/ {totalCapacityInCategory}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-green-600">✓ {availableBedsInCategory} Free</span>
                    <span className="text-red-600">● {occupiedBedsInCategory} Occupied</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full">
              <Bed className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Available Rooms</h3>
              <p className="text-green-700">Browse available rooms for patients and visitors</p>
            </div>
          </div>
        </div>
      )}

      {filteredRooms.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-600 mb-2">No rooms added yet</p>
            <p className="text-sm text-gray-500 mb-4">Click "Add Room" to create your first room</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <CardHeader className={`${getCategoryColor(selectedCategory.color)} border-b`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{room.room_number}</CardTitle>
                    <p className="text-sm mt-1">
                      Capacity: {room.patients.length} / {room.capacity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      room.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {room.status}
                    </span>
                    {isAdmin && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditRoom(room)}
                          className="p-1 hover:bg-white/20 rounded"
                          title="Edit Room"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="p-1 hover:bg-white/20 rounded"
                          title="Delete Room"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  {room.patients.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No patients assigned</p>
                  ) : (
                    room.patients.map((patient) => (
                      <div key={patient.id} className="bg-gray-50 rounded p-3 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="font-semibold text-sm">{patient.full_name}</span>
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => handleRemovePatient(room.id, patient.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Admitted: {patient.admission_date}</span>
                          </div>
                          {patient.expected_discharge && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Discharge: {patient.expected_discharge}</span>
                            </div>
                          )}
                          <div className="text-xs">
                            <span className="font-medium">Condition:</span> {patient.medical_condition}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isAdmin && room.patients.length < room.capacity && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowAssignPatientModal(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Assign Patient
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Add New Room</CardTitle>
                <button onClick={() => setShowAddRoomModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Room Number</label>
                  <Input
                    value={newRoom.room_number}
                    onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
                    placeholder="e.g., PR-101, ICU-201"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Capacity (Number of Beds)</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddRoom} className="flex-1">Add Room</Button>
                  <Button variant="outline" onClick={() => setShowAddRoomModal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Assign Patient Modal */}
      {showAssignPatientModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Assign Patient to {selectedRoom.room_number}</CardTitle>
                <button onClick={() => setShowAssignPatientModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Patient</label>
                  <select
                    value={assignment.patient_id}
                    onChange={(e) => setAssignment({ ...assignment, patient_id: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">Choose a patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.full_name} - {patient.medical_condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Admission Date</label>
                  <Input
                    type="date"
                    value={assignment.admission_date}
                    onChange={(e) => setAssignment({ ...assignment, admission_date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Expected Discharge Date (Optional)</label>
                  <Input
                    type="date"
                    value={assignment.expected_discharge}
                    onChange={(e) => setAssignment({ ...assignment, expected_discharge: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAssignPatient} className="flex-1" disabled={!assignment.patient_id}>
                    Assign Patient
                  </Button>
                  <Button variant="outline" onClick={() => setShowAssignPatientModal(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Room Modal */}
      {isAdmin && showEditRoomModal && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Edit Room</CardTitle>
                <button onClick={() => setShowEditRoomModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Room Number</label>
                  <Input
                    value={editingRoom.room_number}
                    onChange={(e) => setEditingRoom({ ...editingRoom, room_number: e.target.value })}
                    placeholder="e.g., PR-101, ICU-201"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity (Folding Beds)</label>
                  <Input
                    type="number"
                    min="1"
                    value={editingRoom.capacity}
                    onChange={(e) => setEditingRoom({ ...editingRoom, capacity: parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateRoom} className="flex-1">Update Room</Button>
                  <Button variant="outline" onClick={() => setShowEditRoomModal(false)} className="flex-1">
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
