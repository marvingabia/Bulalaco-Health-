import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { patientsAPI } from '../services/api';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  DollarSign, 
  Pill,
  Truck,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ClipboardList
} from 'lucide-react';

export default function PatientRecords() {
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  
  // Patient Form Data
  const [patientForm, setPatientForm] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    isIndigenousPeople: false,
    tribe: '',
    tribeOther: '',
  });
  
  const [recordData, setRecordData] = useState({
    complaint: '',
    diagnosis: '',
    dischargeDate: '',
    totalBill: 0,
    medicines: [],
    transferHospital: '',
    transferReason: '',
    ambulanceNumber: '',
  });

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
  });

  useEffect(() => {
    // Load saved data if exists
    const saved = localStorage.getItem('currentPatientRecord');
    if (saved) {
      const data = JSON.parse(saved);
      setPatientForm(data.patient || patientForm);
      setRecordData(data.record || recordData);
    }
  }, []);

  const saveAllData = () => {
    const data = {
      patient: patientForm,
      record: recordData,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('currentPatientRecord', JSON.stringify(data));
    alert('Record saved successfully!');
  };

  const openModal = (type) => {
    if (!patientForm.name || !patientForm.age) {
      alert('Please fill in patient name and age first!');
      return;
    }
    setModalType(type);
    setShowModal(true);
  };

  const saveModalData = () => {
    saveAllData();
    setShowModal(false);
  };

  const addMedicine = () => {
    if (newMedicine.name && newMedicine.dosage) {
      setRecordData({
        ...recordData,
        medicines: [...recordData.medicines, { ...newMedicine, id: Date.now() }]
      });
      setNewMedicine({ name: '', dosage: '', frequency: '', duration: '' });
    }
  };

  const removeMedicine = (id) => {
    setRecordData({
      ...recordData,
      medicines: recordData.medicines.filter(m => m.id !== id)
    });
  };

  const downloadCompleteRecord = () => {
    const content = `
═══════════════════════════════════════════════════
    BULALACAO HEALTH HUB
    COMPLETE PATIENT RECORD
═══════════════════════════════════════════════════

PATIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${patientForm.name}
Age: ${patientForm.age}
Address: ${patientForm.address}
Phone: ${patientForm.phone}
Indigenous People: ${patientForm.isIndigenousPeople ? 'Yes' : 'No'}
${patientForm.isIndigenousPeople ? `Tribe: ${patientForm.tribe === 'Other' ? patientForm.tribeOther : patientForm.tribe}` : ''}

COMPLAINT & DIAGNOSIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Complaint: ${recordData.complaint || 'Not specified'}
Diagnosis: ${recordData.diagnosis || 'Not specified'}

DISCHARGE INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Discharge Date: ${recordData.dischargeDate || 'Not scheduled'}

BILLING INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Bill: ₱${recordData.totalBill.toLocaleString('en-PH', { minimumFractionDigits: 2 })}

PRESCRIPTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${recordData.medicines.length > 0 ? recordData.medicines.map((med, i) => `
${i + 1}. ${med.name}
   Dosage: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
`).join('\n') : 'No medicines prescribed'}

TRANSFER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Transfer To: ${recordData.transferHospital || 'Not applicable'}
Reason: ${recordData.transferReason || 'Not applicable'}
Ambulance: ${recordData.ambulanceNumber || 'Not applicable'}

═══════════════════════════════════════════════════
Record Generated: ${new Date().toLocaleString()}
Authorized by: _________________
Signature: _________________
═══════════════════════════════════════════════════
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Complete_Record_${patientForm.name}_${Date.now()}.txt`;
    a.click();
  };

  const downloadPrescription = () => {
    const content = `
BULALACAO HEALTH HUB
PRESCRIPTION / RESETA

Patient Name: ${patientForm.name}
Age: ${patientForm.age}
Date: ${new Date().toLocaleDateString()}

MEDICINES TO TAKE:
${recordData.medicines.map((med, i) => `
${i + 1}. ${med.name}
   Dosage: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
`).join('\n')}

Doctor's Signature: _________________
Date: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prescription_${patientForm.name}_${Date.now()}.txt`;
    a.click();
  };

  const downloadTransferPapers = () => {
    const content = `
BULALACAO HEALTH HUB
PATIENT TRANSFER DOCUMENT

PATIENT INFORMATION:
Name: ${patientForm.name}
Age: ${patientForm.age}
Address: ${patientForm.address}
Contact: ${patientForm.phone}

MEDICAL INFORMATION:
Complaint: ${recordData.complaint}
Diagnosis: ${recordData.diagnosis}

TRANSFER DETAILS:
Transfer To: ${recordData.transferHospital}
Reason: ${recordData.transferReason}
Transfer Date: ${new Date().toLocaleDateString()}

AMBULANCE INFORMATION:
Ambulance Number: ${recordData.ambulanceNumber}

MEDICINES PRESCRIBED:
${recordData.medicines.map((med, i) => `${i + 1}. ${med.name} - ${med.dosage}`).join('\n')}

Authorized by: _________________
Date: ${new Date().toLocaleDateString()}
Signature: _________________
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transfer_${patientForm.name}_${Date.now()}.txt`;
    a.click();
  };

  const printDocument = (type) => {
    if (type === 'prescription') {
      const content = document.getElementById('prescription-content');
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Prescription</title>');
      printWindow.document.write('<style>body{font-family:Arial;padding:20px;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(content.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else if (type === 'transfer') {
      const content = document.getElementById('transfer-content');
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Transfer Papers</title>');
      printWindow.document.write('<style>body{font-family:Arial;padding:20px;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(content.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Access Denied. Admin only.</p>
      </div>
    );
  }



  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Patient Records Management</h1>
        <p className="text-gray-600">Fill in patient information and manage their medical records</p>
      </div>

      {/* Patient Information Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
            <input
              type="text"
              value={patientForm.name}
              onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
              placeholder="Enter patient name"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
            <input
              type="number"
              value={patientForm.age}
              onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
              placeholder="Enter age"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={patientForm.address}
              onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
              placeholder="Enter address"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={patientForm.phone}
              onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
              placeholder="Enter phone number"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          {/* Indigenous People Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Member of Indigenous People (IP)?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isIP"
                  checked={patientForm.isIndigenousPeople === false}
                  onChange={() => setPatientForm({ ...patientForm, isIndigenousPeople: false, tribe: '' })}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700 font-medium">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isIP"
                  checked={patientForm.isIndigenousPeople === true}
                  onChange={() => setPatientForm({ ...patientForm, isIndigenousPeople: true })}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700 font-medium">Yes</span>
              </label>
            </div>
          </div>

          {/* Tribe Selection - Only shows if IP is Yes */}
          {patientForm.isIndigenousPeople && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tribe / Tribo *
              </label>
              <select
                value={patientForm.tribe}
                onChange={(e) => setPatientForm({ ...patientForm, tribe: e.target.value })}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select Tribe / Pumili ng Tribo</option>
                <option value="Mangyan">Mangyan</option>
                <option value="Hanunuo">Hanunuo</option>
                <option value="Buhid">Buhid</option>
                <option value="Iraya">Iraya</option>
                <option value="Alangan">Alangan</option>
                <option value="Tadyawan">Tadyawan</option>
                <option value="Ratagnon">Ratagnon</option>
                <option value="Tawbuid">Tawbuid</option>
                <option value="Other">Other / Iba pa</option>
              </select>
              
              {/* If "Other" is selected, show text input */}
              {patientForm.tribe === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify tribe / Tukuyin ang tribo"
                  value={patientForm.tribeOther || ''}
                  onChange={(e) => setPatientForm({ ...patientForm, tribeOther: e.target.value })}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none mt-2"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Records</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => openModal('complaint')}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
          >
            <ClipboardList className="w-8 h-8" />
            <span>Complaint</span>
          </button>

          <button
            onClick={() => openModal('discharge')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
          >
            <Calendar className="w-8 h-8" />
            <span>Discharge</span>
          </button>

          <button
            onClick={() => openModal('billing')}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
          >
            <DollarSign className="w-8 h-8" />
            <span>Billing</span>
          </button>

          <button
            onClick={() => openModal('prescription')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
          >
            <Pill className="w-8 h-8" />
            <span>Prescription</span>
          </button>

          <button
            onClick={() => openModal('transfer')}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
          >
            <Truck className="w-8 h-8" />
            <span>Transfer</span>
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={saveAllData}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-6 h-6" />
            Save All Records
          </button>
        </div>
      </div>

      {/* Complete Record View */}
      {(patientForm.name && (recordData.complaint || recordData.dischargeDate || recordData.totalBill > 0)) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Complete Patient Record</h3>
            <button
              onClick={downloadCompleteRecord}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-full flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Record
            </button>
          </div>

          <div className="space-y-4">
            {/* Patient Info */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-bold text-blue-900 mb-2">Patient Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>Name:</strong> {patientForm.name}</p>
                <p><strong>Age:</strong> {patientForm.age}</p>
                <p><strong>Address:</strong> {patientForm.address}</p>
                <p><strong>Phone:</strong> {patientForm.phone}</p>
              </div>
            </div>

            {/* Complaint & Diagnosis */}
            {recordData.complaint && (
              <div className="bg-cyan-50 rounded-xl p-4">
                <h4 className="font-bold text-cyan-900 mb-2">Complaint & Diagnosis</h4>
                <p className="text-sm"><strong>Complaint:</strong> {recordData.complaint}</p>
                {recordData.diagnosis && <p className="text-sm mt-1"><strong>Diagnosis:</strong> {recordData.diagnosis}</p>}
              </div>
            )}

            {/* Discharge */}
            {recordData.dischargeDate && (
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-bold text-green-900 mb-2">Discharge Information</h4>
                <p className="text-sm"><strong>Discharge Date:</strong> {recordData.dischargeDate}</p>
              </div>
            )}

            {/* Billing */}
            {recordData.totalBill > 0 && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <h4 className="font-bold text-yellow-900 mb-2">Billing Information</h4>
                <p className="text-2xl font-bold text-yellow-900">₱{recordData.totalBill.toLocaleString()}</p>
              </div>
            )}

            {/* Prescription */}
            {recordData.medicines.length > 0 && (
              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-bold text-purple-900 mb-2">Prescription ({recordData.medicines.length} medicines)</h4>
                <div className="space-y-2">
                  {recordData.medicines.map((med, i) => (
                    <div key={i} className="bg-white rounded p-2 text-sm">
                      <p className="font-bold">{i + 1}. {med.name} - {med.dosage}</p>
                      <p className="text-gray-600">{med.frequency} for {med.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transfer */}
            {recordData.transferHospital && (
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-bold text-red-900 mb-2">Transfer Information</h4>
                <p className="text-sm"><strong>Transfer To:</strong> {recordData.transferHospital}</p>
                <p className="text-sm"><strong>Reason:</strong> {recordData.transferReason}</p>
                <p className="text-sm"><strong>Ambulance:</strong> {recordData.ambulanceNumber}</p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalType === 'complaint' && 'Patient Complaint & Diagnosis'}
                  {modalType === 'discharge' && 'Discharge Schedule'}
                  {modalType === 'billing' && 'Billing Information'}
                  {modalType === 'prescription' && 'Prescription / Reseta'}
                  {modalType === 'transfer' && 'Hospital Transfer'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">Patient: {patientForm.name || 'Not specified'}</p>
            </div>

            <div className="p-6">
              {/* Complaint & Diagnosis Form */}
              {modalType === 'complaint' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Complaint</label>
                    <textarea
                      value={recordData.complaint}
                      onChange={(e) => setRecordData({ ...recordData, complaint: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Describe patient's complaint..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis</label>
                    <textarea
                      value={recordData.diagnosis}
                      onChange={(e) => setRecordData({ ...recordData, diagnosis: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Doctor's diagnosis..."
                    />
                  </div>
                </div>
              )}

              {/* Discharge Schedule Form */}
              {modalType === 'discharge' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Discharge Date</label>
                    <input
                      type="date"
                      value={recordData.dischargeDate}
                      onChange={(e) => setRecordData({ ...recordData, dischargeDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      <strong>Note:</strong> Patient will be scheduled for discharge on the selected date.
                    </p>
                  </div>
                </div>
              )}

              {/* Billing Form */}
              {modalType === 'billing' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Bill Amount (₱)</label>
                    <input
                      type="number"
                      value={recordData.totalBill}
                      onChange={(e) => setRecordData({ ...recordData, totalBill: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-2xl font-bold text-yellow-900">
                      Total: ₱{recordData.totalBill.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              )}

              {/* Prescription Form */}
              {modalType === 'prescription' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                    <h3 className="font-bold text-purple-900 mb-2">Add Medicine</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g., 500mg)"
                        value={newMedicine.dosage}
                        onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Frequency (e.g., 3x a day)"
                        value={newMedicine.frequency}
                        onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 7 days)"
                        value={newMedicine.duration}
                        onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl"
                      />
                    </div>
                    <button
                      onClick={addMedicine}
                      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Medicine
                    </button>
                  </div>

                  <div id="prescription-content">
                    <h3 className="font-bold text-lg mb-3">Prescribed Medicines:</h3>
                    {recordData.medicines.length === 0 ? (
                      <p className="text-gray-500">No medicines prescribed yet</p>
                    ) : (
                      <div className="space-y-2">
                        {recordData.medicines.map((med) => (
                          <div key={med.id} className="flex justify-between items-start bg-gray-50 p-3 rounded-xl">
                            <div>
                              <p className="font-bold">{med.name}</p>
                              <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                              <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                              <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                            </div>
                            <button
                              onClick={() => removeMedicine(med.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {recordData.medicines.length > 0 && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={downloadPrescription}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </button>
                      <button
                        onClick={() => printDocument('prescription')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Printer className="w-5 h-5" />
                        Print
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Transfer Form */}
              {modalType === 'transfer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Transfer to Hospital</label>
                    <input
                      type="text"
                      value={recordData.transferHospital}
                      onChange={(e) => setRecordData({ ...recordData, transferHospital: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Hospital name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Transfer</label>
                    <textarea
                      value={recordData.transferReason}
                      onChange={(e) => setRecordData({ ...recordData, transferReason: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Reason for transfer..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ambulance Number</label>
                    <input
                      type="text"
                      value={recordData.ambulanceNumber}
                      onChange={(e) => setRecordData({ ...recordData, ambulanceNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Ambulance plate number..."
                    />
                  </div>

                  <div id="transfer-content" className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <h3 className="font-bold text-red-900 mb-2">Transfer Summary:</h3>
                    <p className="text-sm"><strong>Patient:</strong> {patientForm.name}</p>
                    <p className="text-sm"><strong>Transfer To:</strong> {recordData.transferHospital || 'Not specified'}</p>
                    <p className="text-sm"><strong>Reason:</strong> {recordData.transferReason || 'Not specified'}</p>
                    <p className="text-sm"><strong>Ambulance:</strong> {recordData.ambulanceNumber || 'Not specified'}</p>
                    <p className="text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  </div>

                  {recordData.transferHospital && (
                    <div className="flex gap-3">
                      <button
                        onClick={downloadTransferPapers}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Papers
                      </button>
                      <button
                        onClick={() => printDocument('transfer')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Printer className="w-5 h-5" />
                        Print Papers
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Save Button */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={saveModalData}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save & Close
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
