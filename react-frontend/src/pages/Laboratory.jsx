import { useState, useEffect } from 'react';
import { Plus, X, Search, FileText, Droplet, TestTube, Calendar, Phone, MapPin, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Laboratory() {
  const { isAdmin } = useAuth();
  const [tests, setTests] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTest, setNewTest] = useState({
    patientName: '',
    age: '',
    contactNumber: '',
    address: '',
    testType: '',
    // Blood Test fields
    bloodType: '',
    bloodPressure: '',
    hemoglobin: '',
    whiteBloodCells: '',
    platelets: '',
    // Urinalysis fields
    utiResult: '',
    pregnancyResult: '',
    glucose: '',
    protein: '',
    ph: '',
    // Common
    testDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    result: ''
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = () => {
    const saved = localStorage.getItem('laboratoryTests');
    if (saved) {
      setTests(JSON.parse(saved));
    } else {
      const sampleTests = [
        {
          id: 1,
          patientName: 'Maria Santos',
          age: 28,
          contactNumber: '+63 912 345 6789',
          address: 'Bulalacao, Oriental Mindoro',
          testType: 'Blood Test',
          bloodType: 'O+',
          bloodPressure: '120/80',
          hemoglobin: '13.5 g/dL',
          whiteBloodCells: '7,500/μL',
          platelets: '250,000/μL',
          testDate: '2025-11-10',
          status: 'completed',
          result: 'Normal'
        },
        {
          id: 2,
          patientName: 'Juan Dela Cruz',
          age: 35,
          contactNumber: '+63 923 456 7890',
          address: 'Bulalacao, Oriental Mindoro',
          testType: 'Urinalysis',
          utiResult: 'Negative',
          pregnancyResult: 'N/A',
          glucose: 'Negative',
          protein: 'Negative',
          ph: '6.5',
          testDate: '2025-11-11',
          status: 'pending',
          result: 'Pending'
        }
      ];
      setTests(sampleTests);
      localStorage.setItem('laboratoryTests', JSON.stringify(sampleTests));
    }
  };

  const handleAddTest = (e) => {
    e.preventDefault();
    const test = {
      id: Date.now(),
      ...newTest,
      age: parseInt(newTest.age)
    };
    
    const updatedTests = [...tests, test];
    setTests(updatedTests);
    localStorage.setItem('laboratoryTests', JSON.stringify(updatedTests));
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTest({
      patientName: '',
      age: '',
      contactNumber: '',
      address: '',
      testType: '',
      bloodType: '',
      bloodPressure: '',
      hemoglobin: '',
      whiteBloodCells: '',
      platelets: '',
      utiResult: '',
      pregnancyResult: '',
      glucose: '',
      protein: '',
      ph: '',
      testDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      result: ''
    });
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setNewTest({ ...test });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTests = tests.map(t => 
      t.id === editingTest.id ? { ...newTest, id: editingTest.id } : t
    );
    setTests(updatedTests);
    localStorage.setItem('laboratoryTests', JSON.stringify(updatedTests));
    setShowEditModal(false);
    setEditingTest(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this test record?')) {
      const updatedTests = tests.filter(t => t.id !== id);
      setTests(updatedTests);
      localStorage.setItem('laboratoryTests', JSON.stringify(updatedTests));
    }
  };

  const handleUpdateStatus = (id, status, result) => {
    const updatedTests = tests.map(t => 
      t.id === id ? { ...t, status, result } : t
    );
    setTests(updatedTests);
    localStorage.setItem('laboratoryTests', JSON.stringify(updatedTests));
  };

  const filteredTests = tests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTests = tests.length;
  const pendingTests = tests.filter(t => t.status === 'pending').length;
  const completedTests = tests.filter(t => t.status === 'completed').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory</h1>
          <p className="text-gray-600">Blood tests and urinalysis management</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Test
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-3xl font-bold text-gray-900">{totalTests}</p>
            </div>
            <TestTube className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-orange-600">{pendingTests}</p>
            </div>
            <FileText className="w-12 h-12 text-orange-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedTests}</p>
            </div>
            <Droplet className="w-12 h-12 text-green-400" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name or test type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>
      </div>

      {/* Tests List */}
      {filteredTests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-600">No test records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{test.patientName}</h3>
                    <p className="text-sm text-gray-600">{test.age} years old</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      test.status === 'completed' ? 'bg-green-100 text-green-800' :
                      test.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {test.status.toUpperCase()}
                    </span>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEdit(test)}
                          className="text-yellow-500 hover:text-yellow-700"
                          title="Edit Test"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(test.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Test"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patient Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="font-semibold">{test.contactNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold">{test.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Test Date</p>
                        <p className="font-semibold">{test.testDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Test Results */}
                  <div>
                    <div className="bg-purple-50 rounded-lg p-4 mb-3">
                      <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                        {test.testType === 'Blood Test' ? <Droplet className="w-5 h-5" /> : <TestTube className="w-5 h-5" />}
                        {test.testType}
                      </h4>
                      
                      {test.testType === 'Blood Test' ? (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Blood Type:</span> {test.bloodType}</p>
                          <p><span className="font-semibold">Blood Pressure:</span> {test.bloodPressure}</p>
                          <p><span className="font-semibold">Hemoglobin:</span> {test.hemoglobin}</p>
                          <p><span className="font-semibold">WBC:</span> {test.whiteBloodCells}</p>
                          <p><span className="font-semibold">Platelets:</span> {test.platelets}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">UTI:</span> {test.utiResult}</p>
                          <p><span className="font-semibold">Pregnancy:</span> {test.pregnancyResult}</p>
                          <p><span className="font-semibold">Glucose:</span> {test.glucose}</p>
                          <p><span className="font-semibold">Protein:</span> {test.protein}</p>
                          <p><span className="font-semibold">pH Level:</span> {test.ph}</p>
                        </div>
                      )}
                    </div>

                    <div className={`p-3 rounded-lg ${
                      test.result === 'Normal' ? 'bg-green-50 border border-green-200' :
                      test.result === 'Abnormal' ? 'bg-red-50 border border-red-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <p className="text-sm font-semibold text-gray-700">Result: <span className={
                        test.result === 'Normal' ? 'text-green-600' :
                        test.result === 'Abnormal' ? 'text-red-600' :
                        'text-gray-600'
                      }>{test.result}</span></p>
                    </div>

                    {isAdmin && test.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleUpdateStatus(test.id, 'completed', 'Normal')}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
                        >
                          Mark Normal
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(test.id, 'completed', 'Abnormal')}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
                        >
                          Mark Abnormal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Test Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {showEditModal ? 'Edit Laboratory Test' : 'New Laboratory Test'}
                </h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingTest(null);
                    resetForm();
                  }} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={showEditModal ? handleUpdate : handleAddTest} className="p-6">
              {/* Patient Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      value={newTest.patientName}
                      onChange={(e) => setNewTest({ ...newTest, patientName: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      value={newTest.age}
                      onChange={(e) => setNewTest({ ...newTest, age: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                    <input
                      type="text"
                      value={newTest.contactNumber}
                      onChange={(e) => setNewTest({ ...newTest, contactNumber: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="+63 912 345 6789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Test Date *</label>
                    <input
                      type="date"
                      value={newTest.testDate}
                      onChange={(e) => setNewTest({ ...newTest, testDate: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      value={newTest.address}
                      onChange={(e) => setNewTest({ ...newTest, address: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Test Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Test Type *</label>
                <select
                  value={newTest.testType}
                  onChange={(e) => setNewTest({ ...newTest, testType: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Test Type</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urinalysis">Urinalysis</option>
                </select>
              </div>

              {/* Blood Test Fields */}
              {newTest.testType === 'Blood Test' && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg">
                  <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                    <Droplet className="w-5 h-5" />
                    Blood Test Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type *</label>
                      <select
                        value={newTest.bloodType}
                        onChange={(e) => setNewTest({ ...newTest, bloodType: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Pressure *</label>
                      <input
                        type="text"
                        value={newTest.bloodPressure}
                        onChange={(e) => setNewTest({ ...newTest, bloodPressure: e.target.value })}
                        required
                        placeholder="120/80"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hemoglobin</label>
                      <input
                        type="text"
                        value={newTest.hemoglobin}
                        onChange={(e) => setNewTest({ ...newTest, hemoglobin: e.target.value })}
                        placeholder="13.5 g/dL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">White Blood Cells</label>
                      <input
                        type="text"
                        value={newTest.whiteBloodCells}
                        onChange={(e) => setNewTest({ ...newTest, whiteBloodCells: e.target.value })}
                        placeholder="7,500/μL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Platelets</label>
                      <input
                        type="text"
                        value={newTest.platelets}
                        onChange={(e) => setNewTest({ ...newTest, platelets: e.target.value })}
                        placeholder="250,000/μL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Urinalysis Fields */}
              {newTest.testType === 'Urinalysis' && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                    <TestTube className="w-5 h-5" />
                    Urinalysis Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">UTI Result *</label>
                      <select
                        value={newTest.utiResult}
                        onChange={(e) => setNewTest({ ...newTest, utiResult: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">Select Result</option>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pregnancy Test *</label>
                      <select
                        value={newTest.pregnancyResult}
                        onChange={(e) => setNewTest({ ...newTest, pregnancyResult: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">Select Result</option>
                        <option value="Positive">Positive (Pregnant)</option>
                        <option value="Negative">Negative (Not Pregnant)</option>
                        <option value="N/A">N/A (Male Patient)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Glucose</label>
                      <select
                        value={newTest.glucose}
                        onChange={(e) => setNewTest({ ...newTest, glucose: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Negative">Negative</option>
                        <option value="Trace">Trace</option>
                        <option value="Positive">Positive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Protein</label>
                      <select
                        value={newTest.protein}
                        onChange={(e) => setNewTest({ ...newTest, protein: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">Select</option>
                        <option value="Negative">Negative</option>
                        <option value="Trace">Trace</option>
                        <option value="Positive">Positive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">pH Level</label>
                      <input
                        type="text"
                        value={newTest.ph}
                        onChange={(e) => setNewTest({ ...newTest, ph: e.target.value })}
                        placeholder="5.0 - 8.0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  {showEditModal ? 'Update Test' : 'Add Test'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingTest(null);
                    resetForm();
                  }}
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
