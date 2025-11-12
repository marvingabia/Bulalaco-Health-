import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RoomsNew() {
  const { isAdmin } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [newRoom, setNewRoom] = useState({
    name: '',
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    image: ''
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const getDefaultRooms = () => {
    return [
        {
          id: 1,
          name: 'Patient Rooms',
          totalRooms: 10,
          availableRooms: 5,
          occupiedRooms: 5,
          totalBeds: 20,
          availableBeds: 8,
          occupiedBeds: 12,
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'Private Rooms',
          totalRooms: 8,
          availableRooms: 3,
          occupiedRooms: 5,
          totalBeds: 8,
          availableBeds: 3,
          occupiedBeds: 5,
          image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Emergency Rooms',
          totalRooms: 12,
          availableRooms: 7,
          occupiedRooms: 5,
          totalBeds: 15,
          availableBeds: 9,
          occupiedBeds: 6,
          image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          name: 'ICU Rooms',
          totalRooms: 5,
          availableRooms: 2,
          occupiedRooms: 3,
          totalBeds: 10,
          availableBeds: 4,
          occupiedBeds: 6,
          image: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          name: 'Isolation Rooms',
          totalRooms: 6,
          availableRooms: 4,
          occupiedRooms: 2,
          totalBeds: 6,
          availableBeds: 4,
          occupiedBeds: 2,
          image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=300&fit=crop'
        }
      ];
  };

  const loadRooms = () => {
    const saved = localStorage.getItem('hospitalRoomsNew');
    if (saved) {
      const parsedRooms = JSON.parse(saved);
      // Check if Emergency Rooms exists
      const hasEmergencyRooms = parsedRooms.some(r => r.name === 'Emergency Rooms');
      if (!hasEmergencyRooms) {
        // Old data, reset to default
        const defaultRooms = getDefaultRooms();
        setRooms(defaultRooms);
        localStorage.setItem('hospitalRoomsNew', JSON.stringify(defaultRooms));
      } else {
        setRooms(parsedRooms);
      }
    } else {
      const defaultRooms = getDefaultRooms();
      setRooms(defaultRooms);
      localStorage.setItem('hospitalRoomsNew', JSON.stringify(defaultRooms));
    }
  };

  const handleResetData = () => {
    if (confirm('Reset to default room data? This will clear all custom changes.')) {
      const defaultRooms = getDefaultRooms();
      setRooms(defaultRooms);
      localStorage.setItem('hospitalRoomsNew', JSON.stringify(defaultRooms));
      setSelectedRoom(null);
      alert('Data reset successfully! Emergency Rooms is now available.');
    }
  };

  const saveRooms = (updatedRooms) => {
    setRooms(updatedRooms);
    localStorage.setItem('hospitalRoomsNew', JSON.stringify(updatedRooms));
  };

  const handleSearch = (roomName) => {
    const room = rooms.find(r => r.name.toLowerCase() === roomName.toLowerCase());
    setSelectedRoom(room || null);
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    const room = {
      id: Date.now(),
      ...newRoom
    };
    saveRooms([...rooms, room]);
    setShowAddModal(false);
    setNewRoom({
      name: '',
      totalRooms: 0,
      availableRooms: 0,
      occupiedRooms: 0,
      totalBeds: 0,
      availableBeds: 0,
      occupiedBeds: 0,
      image: ''
    });
  };

  const handleUpdateRoom = () => {
    const updatedRooms = rooms.map(r => r.id === editingRoom.id ? editingRoom : r);
    saveRooms(updatedRooms);
    if (selectedRoom && selectedRoom.id === editingRoom.id) {
      setSelectedRoom(editingRoom);
    }
    setEditingRoom(null);
  };

  const handleDeleteRoom = (id) => {
    if (confirm('Are you sure you want to delete this room category?')) {
      const updatedRooms = rooms.filter(r => r.id !== id);
      saveRooms(updatedRooms);
      if (selectedRoom && selectedRoom.id === id) {
        setSelectedRoom(null);
      }
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Rooms</h1>
          <p className="text-gray-600">Search and manage hospital rooms</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleResetData}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Reset to Default
          </button>
        )}
      </div>

      {/* Search with Dropdown */}
      <div className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              list="room-suggestions"
            />
            <datalist id="room-suggestions">
              {rooms.map(room => (
                <option key={room.id} value={room.name} />
              ))}
            </datalist>
          </div>
          <button
            onClick={() => handleSearch(searchTerm)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Room
            </button>
          )}
        </div>
        
        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filteredRooms.map(room => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedRoom?.id === room.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Room Display */}
      {selectedRoom ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64">
            <img 
              src={selectedRoom.image} 
              alt={selectedRoom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {isAdmin && (
                <>
                  <button
                    onClick={() => setEditingRoom({...selectedRoom})}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(selectedRoom.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedRoom.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rooms Statistics */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Rooms</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Rooms:</span>
                    <span className="text-2xl font-bold text-gray-900">{selectedRoom.totalRooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Available:</span>
                    <span className="text-2xl font-bold text-green-600">{selectedRoom.availableRooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Occupied:</span>
                    <span className="text-2xl font-bold text-red-600">{selectedRoom.occupiedRooms}</span>
                  </div>
                </div>
              </div>

              {/* Folding Beds Statistics */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">Folding Beds</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Beds:</span>
                    <span className="text-2xl font-bold text-gray-900">{selectedRoom.totalBeds}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Available:</span>
                    <span className="text-2xl font-bold text-green-600">{selectedRoom.availableBeds}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Occupied:</span>
                    <span className="text-2xl font-bold text-red-600">{selectedRoom.occupiedBeds}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Search for a room to view details</p>
          <p className="text-sm text-gray-500 mt-2">Use the search bar or click a room button above</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit {editingRoom.name}</h2>
                <button onClick={() => setEditingRoom(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Rooms</label>
                  <input
                    type="number"
                    value={editingRoom.totalRooms}
                    onChange={(e) => setEditingRoom({ ...editingRoom, totalRooms: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Rooms</label>
                  <input
                    type="number"
                    value={editingRoom.availableRooms}
                    onChange={(e) => setEditingRoom({ ...editingRoom, availableRooms: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupied Rooms</label>
                  <input
                    type="number"
                    value={editingRoom.occupiedRooms}
                    onChange={(e) => setEditingRoom({ ...editingRoom, occupiedRooms: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Beds</label>
                  <input
                    type="number"
                    value={editingRoom.totalBeds}
                    onChange={(e) => setEditingRoom({ ...editingRoom, totalBeds: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Beds</label>
                  <input
                    type="number"
                    value={editingRoom.availableBeds}
                    onChange={(e) => setEditingRoom({ ...editingRoom, availableBeds: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupied Beds</label>
                  <input
                    type="number"
                    value={editingRoom.occupiedBeds}
                    onChange={(e) => setEditingRoom({ ...editingRoom, occupiedBeds: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdateRoom}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingRoom(null)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add New Room Category</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddRoom} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Room Name *</label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g., Patient Rooms, ICU Rooms"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Rooms *</label>
                  <input
                    type="number"
                    value={newRoom.totalRooms}
                    onChange={(e) => setNewRoom({ ...newRoom, totalRooms: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Rooms *</label>
                  <input
                    type="number"
                    value={newRoom.availableRooms}
                    onChange={(e) => setNewRoom({ ...newRoom, availableRooms: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupied Rooms *</label>
                  <input
                    type="number"
                    value={newRoom.occupiedRooms}
                    onChange={(e) => setNewRoom({ ...newRoom, occupiedRooms: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Beds *</label>
                  <input
                    type="number"
                    value={newRoom.totalBeds}
                    onChange={(e) => setNewRoom({ ...newRoom, totalBeds: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Beds *</label>
                  <input
                    type="number"
                    value={newRoom.availableBeds}
                    onChange={(e) => setNewRoom({ ...newRoom, availableBeds: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupied Beds *</label>
                  <input
                    type="number"
                    value={newRoom.occupiedBeds}
                    onChange={(e) => setNewRoom({ ...newRoom, occupiedBeds: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newRoom.image}
                    onChange={(e) => setNewRoom({ ...newRoom, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Add Room
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
