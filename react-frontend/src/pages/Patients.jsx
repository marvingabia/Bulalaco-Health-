import { useState, useEffect } from 'react';
import { patientsAPI } from '../services/api';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import { Users, Trash2, Eye, X } from 'lucide-react';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.getAll();
      setPatients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      try {
        await patientsAPI.delete(id);
        setPatients(patients.filter(p => p.id !== id));
        alert('Patient deleted successfully');
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient');
      }
    }
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0D2EB] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">View and manage all registered patients</p>
        </div>
        <div className="flex items-center gap-2 bg-[#A0D2EB] text-white px-4 py-2 rounded-lg shadow">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{patients.length} Total Patients</span>
        </div>
      </div>

      {/* Patient Details Modal */}
      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Patient Full Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Patient ID: #{selectedPatient.id}</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Patient Details */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#A0D2EB]" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-semibold text-lg">{selectedPatient.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{selectedPatient.user?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone Number</label>
                      <p className="font-medium">{selectedPatient.phone_number}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <p className="font-medium capitalize">{selectedPatient.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                </div>

                {/* Indigenous People Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Indigenous People (IP) Information</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="text-sm text-gray-500">IP Status</label>
                      <p className="font-medium">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          selectedPatient.ip_status === 'yes' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          {selectedPatient.ip_status === 'yes' ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                    {selectedPatient.tribe && (
                      <div>
                        <label className="text-sm text-gray-500">Tribe</label>
                        <p className="font-medium">{selectedPatient.tribe}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Information</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm text-gray-500 block mb-2">Current Medical Status</label>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        selectedPatient.medical_status === 'stable' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedPatient.medical_status === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedPatient.medical_status === 'under_observation' 
                          ? 'Under Observation' 
                          : selectedPatient.medical_status.charAt(0).toUpperCase() + selectedPatient.medical_status.slice(1)}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm text-gray-500 block mb-2">Medical Condition</label>
                      <p className="font-medium whitespace-pre-wrap">{selectedPatient.medical_condition}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Date */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">Registered Date</label>
                    <p className="font-medium">
                      {new Date(selectedPatient.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setShowDetails(false);
                    handleDelete(selectedPatient.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Patients List */}
      <div className="grid grid-cols-1 gap-4">
        {patients.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No patients registered yet.</p>
              <p className="text-gray-400 text-sm mt-2">Patients will appear here after registration.</p>
            </CardContent>
          </Card>
        ) : (
          patients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Patient Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-[#A0D2EB] rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{patient.full_name}</h3>
                        <p className="text-sm text-gray-500">Patient ID: #{patient.id}</p>
                      </div>
                    </div>
                    
                    {/* Patient Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block">Phone:</span>
                        <p className="font-medium">{patient.phone_number}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Gender:</span>
                        <p className="font-medium capitalize">{patient.gender}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 block">IP Status:</span>
                        <p className="font-medium capitalize">{patient.ip_status}</p>
                      </div>
                      {patient.tribe && (
                        <div>
                          <span className="text-gray-500 block">Tribe:</span>
                          <p className="font-medium">{patient.tribe}</p>
                        </div>
                      )}
                      <div className="col-span-2">
                        <span className="text-gray-500 block">Address:</span>
                        <p className="font-medium">{patient.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewDetails(patient)}
                      title="View Full Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(patient.id)}
                      title="Delete Patient"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
