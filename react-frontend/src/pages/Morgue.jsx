import { useState, useEffect } from 'react';
import { Plus, X, Search, Calendar, User, FileText, Clock, AlertCircle, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MorgueIllustration from '../components/MorgueIllustration';

export default function Morgue() {
  const { isAdmin } = useAuth();
  const [deceased, setDeceased] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecord, setNewRecord] = useState({
    name: '',
    age: '',
    gender: '',
    dateOfDeath: '',
    timeOfDeath: '',
    causeOfDeath: '',
    attendingPhysician: '',
    nextOfKin: '',
    contactNumber: '',
    address: '',
    identificationStatus: 'identified',
    burialStatus: 'pending'
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const saved = localStorage.getItem('morgueRecords');
    if (saved) {
      setDeceased(JSON.parse(saved));
    } else {
      // Sample data
      const sampleRecords = [
        {
          id: 1,
          name: 'Juan Dela Cruz',
          age: 65,
          gender: 'Male',
          dateOfDeath: '2025-11-10',
          timeOfDeath: '14:30',
          causeOfDeath: 'Cardiac Arrest',
          attendingPhysician: 'Dr. Maria Santos',
          nextOfKin: 'Pedro Dela Cruz',
          contactNumber: '+63 912 345 6789',
          address: 'Bulalacao, Oriental Mindoro',
          identificationStatus: 'identified',
          burialStatus: 'pending',
          image: 'Screenshot 2025-11-11 211842.png'
        }
      ];
      setDeceased(sampleRecords);
      localStorage.setItem('morgueRecords', JSON.stringify(sampleRecords));
    }
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    const record = {
      id: Date.now(),
      ...newRecord,
      age: parseInt(newRecord.age),
      image: '/images/Screenshot 2025-11-11 211842.png'
    };
    
    const updatedRecords = [...deceased, record];
    setDeceased(updatedRecords);
    localStorage.setItem('morgueRecords', JSON.stringify(updatedRecords));
    setShowAddModal(false);
    setNewRecord({
      name: '',
      age: '',
      gender: '',
      dateOfDeath: '',
      timeOfDeath: '',
      causeOfDeath: '',
      attendingPhysician: '',
      nextOfKin: '',
      contactNumber: '',
      address: '',
      identificationStatus: 'identified',
      burialStatus: 'pending'
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this record?')) {
      const updatedRecords = deceased.filter(d => d.id !== id);
      setDeceased(updatedRecords);
      localStorage.setItem('morgueRecords', JSON.stringify(updatedRecords));
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowEditModal(true);
  };

  const handleUpdateRecord = (e) => {
    e.preventDefault();
    const updatedRecords = deceased.map(d => 
      d.id === editingRecord.id ? editingRecord : d
    );
    setDeceased(updatedRecords);
    localStorage.setItem('morgueRecords', JSON.stringify(updatedRecords));
    setShowEditModal(false);
    setEditingRecord(null);
  };

  const handleUpdateStatus = (id, field, value) => {
    const updatedRecords = deceased.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    );
    setDeceased(updatedRecords);
    localStorage.setItem('morgueRecords', JSON.stringify(updatedRecords));
  };

  const filteredRecords = deceased.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.causeOfDeath.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDeceased = deceased.length;
  const pendingBurial = deceased.filter(d => d.burialStatus === 'pending').length;
  const unidentified = deceased.filter(d => d.identificationStatus === 'unidentified').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Morgue Management</h1>
          <p className="text-gray-600">Deceased patient records and burial tracking</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Record
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Deceased</p>
              <p className="text-3xl font-bold text-gray-900">{totalDeceased}</p>
            </div>
            <User className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Burial</p>
              <p className="text-3xl font-bold text-orange-600">{pendingBurial}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unidentified</p>
              <p className="text-3xl font-bold text-red-600">{unidentified}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or cause of death..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-600">No records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Hospital Bed Illustration */}
                <div className="md:w-1/4 h-64 md:h-auto relative bg-gray-100">
                  <MorgueIllustration />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.burialStatus === 'pending' ? 'bg-orange-100 text-orange-800' :
                      record.burialStatus === 'buried' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {record.burialStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Record Details */}
                <div className="md:w-3/4 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{record.name}</h3>
                      <p className="text-sm text-gray-600">{record.age} years old • {record.gender}</p>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit Record"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Record"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Date & Time of Death</p>
                          <p className="font-semibold">{record.dateOfDeath} at {record.timeOfDeath}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Cause of Death</p>
                          <p className="font-semibold text-red-600">{record.causeOfDeath}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Attending Physician</p>
                          <p className="font-semibold">{record.attendingPhysician}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Next of Kin</p>
                          <p className="font-semibold">{record.nextOfKin}</p>
                          <a href={`tel:${record.contactNumber}`} className="text-sm text-blue-600 hover:underline">
                            {record.contactNumber}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-semibold">{record.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Identification Status</p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            record.identificationStatus === 'identified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.identificationStatus.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                      <select
                        value={record.burialStatus}
                        onChange={(e) => handleUpdateStatus(record.id, 'burialStatus', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                      >
                        <option value="pending">Pending Burial</option>
                        <option value="scheduled">Burial Scheduled</option>
                        <option value="buried">Buried</option>
                      </select>

                      <select
                        value={record.identificationStatus}
                        onChange={(e) => handleUpdateStatus(record.id, 'identificationStatus', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                      >
                        <option value="identified">Identified</option>
                        <option value="unidentified">Unidentified</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Record Modal */}
      {isAdmin && showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add Deceased Record</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddRecord} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={newRecord.age}
                    onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    value={newRecord.gender}
                    onChange={(e) => setNewRecord({ ...newRecord, gender: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Death *</label>
                  <input
                    type="date"
                    value={newRecord.dateOfDeath}
                    onChange={(e) => setNewRecord({ ...newRecord, dateOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Death *</label>
                  <input
                    type="time"
                    value={newRecord.timeOfDeath}
                    onChange={(e) => setNewRecord({ ...newRecord, timeOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cause of Death *</label>
                  <input
                    type="text"
                    value={newRecord.causeOfDeath}
                    onChange={(e) => setNewRecord({ ...newRecord, causeOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                    placeholder="e.g., Cardiac Arrest"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attending Physician *</label>
                  <input
                    type="text"
                    value={newRecord.attendingPhysician}
                    onChange={(e) => setNewRecord({ ...newRecord, attendingPhysician: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Next of Kin *</label>
                  <input
                    type="text"
                    value={newRecord.nextOfKin}
                    onChange={(e) => setNewRecord({ ...newRecord, nextOfKin: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="text"
                    value={newRecord.contactNumber}
                    onChange={(e) => setNewRecord({ ...newRecord, contactNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                    placeholder="+63 912 345 6789"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={newRecord.address}
                    onChange={(e) => setNewRecord({ ...newRecord, address: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Add Record
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

      {/* Edit Record Modal */}
      {isAdmin && showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Deceased Record</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleUpdateRecord} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={editingRecord.name}
                    onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={editingRecord.age}
                    onChange={(e) => setEditingRecord({ ...editingRecord, age: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    value={editingRecord.gender}
                    onChange={(e) => setEditingRecord({ ...editingRecord, gender: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Death *</label>
                  <input
                    type="date"
                    value={editingRecord.dateOfDeath}
                    onChange={(e) => setEditingRecord({ ...editingRecord, dateOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Death *</label>
                  <input
                    type="time"
                    value={editingRecord.timeOfDeath}
                    onChange={(e) => setEditingRecord({ ...editingRecord, timeOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cause of Death *</label>
                  <input
                    type="text"
                    value={editingRecord.causeOfDeath}
                    onChange={(e) => setEditingRecord({ ...editingRecord, causeOfDeath: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attending Physician *</label>
                  <input
                    type="text"
                    value={editingRecord.attendingPhysician}
                    onChange={(e) => setEditingRecord({ ...editingRecord, attendingPhysician: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Next of Kin *</label>
                  <input
                    type="text"
                    value={editingRecord.nextOfKin}
                    onChange={(e) => setEditingRecord({ ...editingRecord, nextOfKin: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                  <input
                    type="text"
                    value={editingRecord.contactNumber}
                    onChange={(e) => setEditingRecord({ ...editingRecord, contactNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={editingRecord.address}
                    onChange={(e) => setEditingRecord({ ...editingRecord, address: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Update Record
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
