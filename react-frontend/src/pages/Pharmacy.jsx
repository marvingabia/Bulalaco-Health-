import { useState, useEffect } from 'react';
import { Pill, Plus, X, Search, Package, AlertCircle, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Pharmacy() {
  const { isAdmin } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    expiryDate: '',
    manufacturer: '',
  });

  useEffect(() => {
    console.log('Pharmacy component mounted');
    loadMedicines();
  }, []);

  const loadMedicines = () => {
    console.log('Loading medicines...');
    const saved = localStorage.getItem('pharmacyMedicines');
    if (saved) {
      console.log('Found saved medicines:', saved);
      setMedicines(JSON.parse(saved));
    } else {
      console.log('No saved medicines, loading sample data');
      // Initial sample medicines
      const sampleMedicines = [
        {
          id: 1,
          name: 'Paracetamol 500mg',
          category: 'Pain Relief',
          description: 'Pain reliever and fever reducer',
          price: 15.00,
          stock: 500,
          expiryDate: '2025-12-31',
          manufacturer: 'Generic Pharma',
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'Amoxicillin 500mg',
          category: 'Antibiotics',
          description: 'Antibiotic for bacterial infections',
          price: 25.00,
          stock: 300,
          expiryDate: '2025-10-15',
          manufacturer: 'MedCo Labs',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Ibuprofen 400mg',
          category: 'Pain Relief',
          description: 'Anti-inflammatory pain reliever',
          price: 20.00,
          stock: 450,
          expiryDate: '2026-03-20',
          manufacturer: 'HealthPlus',
          image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop'
        },
        {
          id: 4,
          name: 'Cetirizine 10mg',
          category: 'Allergy',
          description: 'Antihistamine for allergies',
          price: 18.00,
          stock: 200,
          expiryDate: '2025-08-30',
          manufacturer: 'AllerCare',
          image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=300&fit=crop'
        },
        {
          id: 5,
          name: 'Omeprazole 20mg',
          category: 'Gastric',
          description: 'Acid reflux and stomach ulcer treatment',
          price: 30.00,
          stock: 150,
          expiryDate: '2025-11-25',
          manufacturer: 'GastroMed',
          image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=300&h=300&fit=crop'
        },
        {
          id: 6,
          name: 'Metformin 500mg',
          category: 'Diabetes',
          description: 'Diabetes medication',
          price: 35.00,
          stock: 180,
          expiryDate: '2026-01-10',
          manufacturer: 'DiabCare',
          image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop'
        },
        {
          id: 7,
          name: 'Losartan 50mg',
          category: 'Hypertension',
          description: 'Blood pressure medication',
          price: 40.00,
          stock: 220,
          expiryDate: '2025-09-15',
          manufacturer: 'CardioHealth',
          image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop'
        },
        {
          id: 8,
          name: 'Salbutamol Inhaler',
          category: 'Respiratory',
          description: 'Asthma relief inhaler',
          price: 250.00,
          stock: 80,
          expiryDate: '2025-07-20',
          manufacturer: 'RespiraCare',
          image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=300&fit=crop'
        },
      ];
      setMedicines(sampleMedicines);
      localStorage.setItem('pharmacyMedicines', JSON.stringify(sampleMedicines));
    }
  };

  const saveMedicines = (data) => {
    localStorage.setItem('pharmacyMedicines', JSON.stringify(data));
    setMedicines(data);
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const medicine = {
      id: Date.now(),
      ...newMedicine,
      price: parseFloat(newMedicine.price),
      stock: parseInt(newMedicine.stock),
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop'
    };
    
    const updatedMedicines = [...medicines, medicine];
    saveMedicines(updatedMedicines);
    setShowAddModal(false);
    setNewMedicine({
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      expiryDate: '',
      manufacturer: '',
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      const updatedMedicines = medicines.filter(m => m.id !== id);
      saveMedicines(updatedMedicines);
    }
  };

  const categories = ['all', ...new Set(medicines.map(m => m.category))];
  
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || medicine.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = medicines.reduce((sum, med) => sum + (med.price * med.stock), 0);
  const lowStockCount = medicines.filter(m => m.stock < 100).length;
  const totalItems = medicines.reduce((sum, med) => sum + med.stock, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy {isAdmin ? 'Inventory' : 'Medicines'}</h1>
          <p className="text-gray-600">{isAdmin ? 'Manage medicines and stock levels' : 'Browse available medicines'}</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Medicines</p>
              <p className="text-3xl font-bold text-gray-900">{medicines.length}</p>
            </div>
            <Pill className="w-12 h-12 text-cyan-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock</p>
              <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900">₱{totalValue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
          <div className="min-w-[200px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      {filteredMedicines.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-600">No medicines found</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img 
                  src={medicine.image} 
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full font-semibold">
                    {medicine.category}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(medicine.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{medicine.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{medicine.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-cyan-600">₱{medicine.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className={`font-bold ${medicine.stock < 100 ? 'text-red-600' : 'text-green-600'}`}>
                      {medicine.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry:</span>
                    <span className="text-gray-900">{medicine.expiryDate}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {medicine.manufacturer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Add New Medicine</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddMedicine} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Medicine Name *</label>
                  <input
                    type="text"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    placeholder="e.g., Paracetamol 500mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={newMedicine.category}
                    onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Allergy">Allergy</option>
                    <option value="Gastric">Gastric</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Vitamins">Vitamins</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newMedicine.description}
                    onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
                    placeholder="Brief description of the medicine"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₱) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newMedicine.price}
                    onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    min="0"
                    value={newMedicine.stock}
                    onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    value={newMedicine.expiryDate}
                    onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Manufacturer *</label>
                  <input
                    type="text"
                    value={newMedicine.manufacturer}
                    onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    placeholder="e.g., Generic Pharma"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Add Medicine
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
