import { useState, useEffect } from 'react';
import { Truck, Phone, User, MapPin, X, AlertCircle, CheckCircle, Navigation, Plus, Edit, Trash2 } from 'lucide-react';
import AmbulanceMap from '../components/AmbulanceMap';
import AmbulanceIllustration from '../components/AmbulanceIllustration';
import { useAuth } from '../context/AuthContext';

export default function Ambulance() {
  const { isAdmin } = useAuth();
  const [ambulances, setAmbulances] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestingAmbulance, setRequestingAmbulance] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState(null);
  const [newAmbulance, setNewAmbulance] = useState({
    unitNumber: '',
    plateNumber: '',
    driver: '',
    contact: '',
    status: 'available',
    location: 'Bulalacao Health Hub',
    capacity: '2 patients + 2 medical staff',
    lastMaintenance: ''
  });

  useEffect(() => {
    loadAmbulances();
  }, []);

  const loadAmbulances = () => {
    const saved = localStorage.getItem('ambulanceFleet');
    if (saved) {
      setAmbulances(JSON.parse(saved));
    } else {
      // Initial ambulance fleet
      const fleet = [
        {
          id: 1,
          unitNumber: 'AMB-001',
          status: 'available',
          driver: 'Juan Dela Cruz',
          contact: '+63 912 345 6789',
          plateNumber: 'ABC 1234',
          location: 'Bulalacao Health Hub',
          coordinates: { lat: 12.3456, lng: 121.2345 },
          image: 'https://images.unsplash.com/photo-1582719366721-a3f4c7c3f0e3?w=600&h=400&fit=crop',
          lastMaintenance: '2024-01-15',
          capacity: '2 patients + 2 medical staff'
        },
        {
          id: 2,
          unitNumber: 'AMB-002',
          status: 'on-trip',
          driver: 'Maria Santos',
          contact: '+63 923 456 7890',
          plateNumber: 'XYZ 5678',
          location: 'En route to Provincial Hospital',
          destination: 'Oriental Mindoro Provincial Hospital',
          coordinates: { lat: 12.4567, lng: 121.3456 },
          image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=600&h=400&fit=crop',
          lastMaintenance: '2024-01-20',
          capacity: '1 patient + 3 medical staff',
          estimatedArrival: '15 minutes'
        },
        {
          id: 3,
          unitNumber: 'AMB-003',
          status: 'available',
          driver: 'Pedro Reyes',
          contact: '+63 934 567 8901',
          plateNumber: 'DEF 9012',
          location: 'Bulalacao Health Hub',
          coordinates: { lat: 12.3456, lng: 121.2345 },
          image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=400&fit=crop',
          lastMaintenance: '2024-01-10',
          capacity: '2 patients + 2 medical staff'
        },
        {
          id: 4,
          unitNumber: 'AMB-004',
          status: 'maintenance',
          driver: 'Ana Garcia',
          contact: '+63 945 678 9012',
          plateNumber: 'GHI 3456',
          location: 'Maintenance Bay',
          coordinates: { lat: 12.3456, lng: 121.2345 },
          image: 'https://images.unsplash.com/photo-1582719366721-a3f4c7c3f0e3?w=600&h=400&fit=crop',
          lastMaintenance: '2024-01-25',
          capacity: '2 patients + 2 medical staff',
          maintenanceNote: 'Scheduled maintenance - Engine check'
        },
      ];
      setAmbulances(fleet);
      localStorage.setItem('ambulanceFleet', JSON.stringify(fleet));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'on-trip':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5" />;
      case 'on-trip':
        return <Navigation className="w-5 h-5" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Truck className="w-5 h-5" />;
    }
  };

  const handleRequestAmbulance = (ambulance) => {
    setRequestingAmbulance(ambulance);
    setShowRequestModal(true);
  };

  const confirmRequest = () => {
    alert(`Ambulance ${requestingAmbulance.unitNumber} has been requested!\n\nDriver: ${requestingAmbulance.driver}\nContact: ${requestingAmbulance.contact}\n\nThe ambulance will arrive shortly.`);
    setShowRequestModal(false);
    setRequestingAmbulance(null);
  };

  const handleAddAmbulance = (e) => {
    e.preventDefault();
    const ambulance = {
      id: Date.now(),
      ...newAmbulance,
      coordinates: { lat: 12.3456, lng: 121.2345 },
      image: 'https://images.unsplash.com/photo-1582719366721-a3f4c7c3f0e3?w=600&h=400&fit=crop'
    };
    const updatedAmbulances = [...ambulances, ambulance];
    setAmbulances(updatedAmbulances);
    localStorage.setItem('ambulanceFleet', JSON.stringify(updatedAmbulances));
    setShowAddModal(false);
    setNewAmbulance({
      unitNumber: '',
      plateNumber: '',
      driver: '',
      contact: '',
      status: 'available',
      location: 'Bulalacao Health Hub',
      capacity: '2 patients + 2 medical staff',
      lastMaintenance: ''
    });
  };

  const handleEditAmbulance = (ambulance) => {
    setEditingAmbulance(ambulance);
    setShowEditModal(true);
  };

  const handleUpdateAmbulance = (e) => {
    e.preventDefault();
    const updatedAmbulances = ambulances.map(amb => 
      amb.id === editingAmbulance.id ? editingAmbulance : amb
    );
    setAmbulances(updatedAmbulances);
    localStorage.setItem('ambulanceFleet', JSON.stringify(updatedAmbulances));
    setShowEditModal(false);
    setEditingAmbulance(null);
  };

  const handleDeleteAmbulance = (id) => {
    if (confirm('Are you sure you want to delete this ambulance?')) {
      const updatedAmbulances = ambulances.filter(amb => amb.id !== id);
      setAmbulances(updatedAmbulances);
      localStorage.setItem('ambulanceFleet', JSON.stringify(updatedAmbulances));
    }
  };

  const availableCount = ambulances.filter(a => a.status === 'available').length;
  const onTripCount = ambulances.filter(a => a.status === 'on-trip').length;
  const maintenanceCount = ambulances.filter(a => a.status === 'maintenance').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ambulance Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage emergency ambulance services</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Ambulance
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Fleet</p>
              <p className="text-3xl font-bold text-gray-900">{ambulances.length}</p>
            </div>
            <Truck className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-3xl font-bold text-green-600">{availableCount}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Trip</p>
              <p className="text-3xl font-bold text-blue-600">{onTripCount}</p>
            </div>
            <Navigation className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-3xl font-bold text-yellow-600">{maintenanceCount}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
          <div>
            <p className="font-bold text-red-800">Emergency Hotline: +63 912 345 6789</p>
            <p className="text-sm text-red-700">Available 24/7 for emergency patient transfers</p>
          </div>
        </div>
      </div>

      {/* Ambulance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ambulances.map((ambulance) => (
          <div key={ambulance.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Ambulance Illustration */}
              <div className="md:w-1/2 h-96 md:h-auto relative bg-gray-50 p-6">
                <AmbulanceIllustration />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(ambulance.status)} border-2 backdrop-blur-sm`}>
                    {getStatusIcon(ambulance.status)}
                    {ambulance.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Ambulance Details */}
              <div className="md:w-3/5 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{ambulance.unitNumber}</h3>
                    <p className="text-sm text-gray-600">{ambulance.plateNumber}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Driver</p>
                      <p className="font-semibold">{ambulance.driver}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <a href={`tel:${ambulance.contact}`} className="font-semibold text-blue-600 hover:underline">
                        {ambulance.contact}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-semibold">{ambulance.location}</p>
                    </div>
                  </div>

                  {ambulance.destination && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <Navigation className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Destination</p>
                        <p className="font-semibold text-blue-600">{ambulance.destination}</p>
                        {ambulance.estimatedArrival && (
                          <p className="text-xs text-gray-500">ETA: {ambulance.estimatedArrival}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {ambulance.maintenanceNote && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <p className="text-sm text-yellow-800">{ambulance.maintenanceNote}</p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">Capacity: {ambulance.capacity}</p>
                    <p className="text-xs text-gray-600">Last Maintenance: {ambulance.lastMaintenance}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedAmbulance(ambulance)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      View Map
                    </button>
                    {!isAdmin && ambulance.status === 'available' && (
                      <button 
                        onClick={() => handleRequestAmbulance(ambulance)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Truck className="w-4 h-4" />
                        Request
                      </button>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEditAmbulance(ambulance)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAmbulance(ambulance.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {selectedAmbulance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAmbulance.unitNumber} - Live Location</h2>
                  <p className="text-gray-600">{selectedAmbulance.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedAmbulance(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Interactive Map */}
              <div className="mb-4">
                <AmbulanceMap ambulance={selectedAmbulance} />
              </div>
              
              {/* Ambulance Illustration */}
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-50 p-8">
                <div className="h-80">
                  <AmbulanceIllustration />
                </div>
              </div>

              {/* Ambulance Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Driver Information</h3>
                  <p className="text-sm"><span className="font-semibold">Name:</span> {selectedAmbulance.driver}</p>
                  <p className="text-sm"><span className="font-semibold">Contact:</span> {selectedAmbulance.contact}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Vehicle Information</h3>
                  <p className="text-sm"><span className="font-semibold">Plate:</span> {selectedAmbulance.plateNumber}</p>
                  <p className="text-sm"><span className="font-semibold">Capacity:</span> {selectedAmbulance.capacity}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`tel:${selectedAmbulance.contact}`}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Driver
                </a>
                <button
                  onClick={() => setSelectedAmbulance(null)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Ambulance Modal */}
      {showRequestModal && requestingAmbulance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Request Ambulance</h2>
                  <p className="text-sm text-gray-600">{requestingAmbulance.unitNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3 text-gray-900">Ambulance Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Unit:</span> {requestingAmbulance.unitNumber}</p>
                    <p><span className="font-semibold">Plate Number:</span> {requestingAmbulance.plateNumber}</p>
                    <p><span className="font-semibold">Driver:</span> {requestingAmbulance.driver}</p>
                    <p><span className="font-semibold">Contact:</span> {requestingAmbulance.contact}</p>
                    <p><span className="font-semibold">Location:</span> {requestingAmbulance.location}</p>
                    <p><span className="font-semibold">Capacity:</span> {requestingAmbulance.capacity}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The ambulance will be dispatched immediately upon confirmation. 
                    Please ensure the patient is ready for transport.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={confirmRequest}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Request
                </button>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestingAmbulance(null);
                  }}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Ambulance Modal - Admin Only */}
      {isAdmin && showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add New Ambulance</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddAmbulance} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Number *</label>
                  <input
                    type="text"
                    value={newAmbulance.unitNumber}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, unitNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., AMB-005"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plate Number *</label>
                  <input
                    type="text"
                    value={newAmbulance.plateNumber}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, plateNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., ABC 1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Driver Name *</label>
                  <input
                    type="text"
                    value={newAmbulance.driver}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, driver: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., Juan Dela Cruz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="text"
                    value={newAmbulance.contact}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, contact: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., +63 912 345 6789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                  <select
                    value={newAmbulance.status}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, status: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="on-trip">On Trip</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Maintenance *</label>
                  <input
                    type="date"
                    value={newAmbulance.lastMaintenance}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, lastMaintenance: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={newAmbulance.location}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, location: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., Bulalacao Health Hub"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity *</label>
                  <input
                    type="text"
                    value={newAmbulance.capacity}
                    onChange={(e) => setNewAmbulance({ ...newAmbulance, capacity: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="e.g., 2 patients + 2 medical staff"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Add Ambulance
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

      {/* Edit Ambulance Modal - Admin Only */}
      {isAdmin && showEditModal && editingAmbulance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Ambulance</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleUpdateAmbulance} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Number *</label>
                  <input
                    type="text"
                    value={editingAmbulance.unitNumber}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, unitNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Plate Number *</label>
                  <input
                    type="text"
                    value={editingAmbulance.plateNumber}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, plateNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Driver Name *</label>
                  <input
                    type="text"
                    value={editingAmbulance.driver}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, driver: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="text"
                    value={editingAmbulance.contact}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, contact: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                  <select
                    value={editingAmbulance.status}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, status: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="on-trip">On Trip</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Maintenance *</label>
                  <input
                    type="date"
                    value={editingAmbulance.lastMaintenance}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, lastMaintenance: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={editingAmbulance.location}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, location: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity *</label>
                  <input
                    type="text"
                    value={editingAmbulance.capacity}
                    onChange={(e) => setEditingAmbulance({ ...editingAmbulance, capacity: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Update Ambulance
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
