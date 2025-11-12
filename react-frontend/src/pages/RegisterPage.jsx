import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { staffAPI } from '../services/api';
import { UserPlus, Users, Stethoscope, X } from 'lucide-react';

// Inline Card Components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white',
    secondary: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
    outline: 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700',
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm ${className}`}
    {...props}
  />
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [registrationType, setRegistrationType] = useState(null); // 'patient' or 'staff'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showTribeSelect, setShowTribeSelect] = useState(false);
  
  // Patient form data
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    address: '',
    phone_number: '',
    gender: '',
    ip_status: '',
    tribe: '',
    medical_condition: '',
    medical_status: 'stable',
  });

  // Staff form data
  const [staffData, setStaffData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    address: '',
    age: '',
    position: '',
    department: '',
    status: 'off-duty',
    assigned_room: '',
  });

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'ip_status') {
      setShowTribeSelect(value === 'yes');
      if (value !== 'yes') {
        setPatientData(prev => ({ ...prev, tribe: '' }));
      }
    }
  };

  const handleStaffChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (patientData.password !== patientData.password_confirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(patientData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      console.error('Registration error:', result);
      setError(result.message || 'Registration failed. Please check all fields.');
    }
    
    setLoading(false);
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (staffData.password !== staffData.password_confirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (staffData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await staffAPI.create(staffData);
      console.log('Staff registration successful:', response);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Staff registration error:', err);
      console.error('Error details:', err.response?.data);
      
      // Show detailed validation errors
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Staff registration failed');
      }
      setLoading(false);
    }
  };

  // Google OAuth Login Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login success:', credentialResponse);
      // Here you would send the credential to your backend
      // For now, we'll just show the user info
      alert('Google login successful! Integration with backend coming soon.');
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      console.log('Login Failed');
      setError('Google login failed. Please try again.');
    },
    flow: 'implicit',
  });

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">
                {registrationType === 'staff' 
                  ? 'Staff account has been created successfully.' 
                  : 'Your patient account has been created successfully.'}
              </p>
              <p className="text-sm text-gray-500">Redirecting to login page...</p>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0D2EB] mx-auto"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Registration Type Selection
  if (!registrationType) {
    console.log('Showing registration type selection');
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Register - Bulalacao Health Hub</h1>
            <p className="text-gray-600">Choose your registration type</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Registration */}
            <div onClick={() => {
              console.log('Patient card clicked');
              setRegistrationType('patient');
            }}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#A0D2EB] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Registration</h2>
                  <p className="text-gray-600 mb-4">Register as a patient to access medical services</p>
                  <Button className="w-full" type="button">
                    Register as Patient
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Staff Registration */}
            <div onClick={() => {
              console.log('Staff card clicked');
              setRegistrationType('staff');
            }}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#B2D7D0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Registration</h2>
                  <p className="text-gray-600 mb-4">Register as hospital staff member</p>
                  <Button variant="secondary" className="w-full" type="button">
                    Register as Staff
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-center text-base mt-6">
            <span className="text-gray-700 font-semibold">Already have an account?</span>{' '}
            <Link to="/login" className="text-sky-500 hover:text-sky-600 font-bold hover:underline text-lg">
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  console.log('Registration type:', registrationType);

  // Staff Registration Form
  if (registrationType === 'staff') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Staff Registration</CardTitle>
              <button onClick={() => setRegistrationType(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Continue with Google Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => alert('Google OAuth integration coming soon! For now, please use email registration.')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or register with email</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleStaffSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <Input
                    name="name"
                    value={staffData.name}
                    onChange={handleStaffChange}
                    required
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email (Gmail) *</label>
                  <Input
                    type="email"
                    name="email"
                    value={staffData.email}
                    onChange={handleStaffChange}
                    required
                    placeholder="yourname@gmail.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Don't have Gmail?{' '}
                    <a 
                      href="https://accounts.google.com/signup" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Create Gmail Account
                    </a>
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password *</label>
                  <Input
                    type="password"
                    name="password"
                    value={staffData.password}
                    onChange={handleStaffChange}
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                  <Input
                    type="password"
                    name="password_confirmation"
                    value={staffData.password_confirmation}
                    onChange={handleStaffChange}
                    required
                    minLength={6}
                    placeholder="Re-enter password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <Input
                    type="tel"
                    name="phone_number"
                    value={staffData.phone_number}
                    onChange={handleStaffChange}
                    required
                    placeholder="+63 912 345 6789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Age *</label>
                  <Input
                    type="number"
                    name="age"
                    value={staffData.age}
                    onChange={handleStaffChange}
                    required
                    min="18"
                    max="100"
                    placeholder="25"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <Input
                    name="address"
                    value={staffData.address}
                    onChange={handleStaffChange}
                    required
                    placeholder="Bulalacao, Oriental Mindoro"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <select
                    name="position"
                    value={staffData.position}
                    onChange={handleStaffChange}
                    required
                    className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                  >
                    <option value="">Select Position</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="cashier">Cashier (Billing)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Department *</label>
                  <select
                    name="department"
                    value={staffData.department}
                    onChange={handleStaffChange}
                    required
                    className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                  >
                    <option value="">Select Department</option>
                    <option value="emergency">Emergency</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="surgery">Surgery</option>
                    <option value="billing">Billing</option>
                    <option value="general">General</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duty Status *</label>
                  <select
                    name="status"
                    value={staffData.status}
                    onChange={handleStaffChange}
                    required
                    className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                  >
                    <option value="off-duty">Off Duty</option>
                    <option value="on-duty">On Duty</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assigned Room</label>
                  <select
                    name="assigned_room"
                    value={staffData.assigned_room}
                    onChange={handleStaffChange}
                    className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                  >
                    <option value="">No Room Assigned</option>
                    <option value="Emergency Room 1">Emergency Room 1</option>
                    <option value="Emergency Room 2">Emergency Room 2</option>
                    <option value="ICU Room 1">ICU Room 1</option>
                    <option value="ICU Room 2">ICU Room 2</option>
                    <option value="Patient Room 101">Patient Room 101</option>
                    <option value="Patient Room 102">Patient Room 102</option>
                    <option value="Patient Room 103">Patient Room 103</option>
                    <option value="Private Room 201">Private Room 201</option>
                    <option value="Private Room 202">Private Room 202</option>
                    <option value="Operating Room 1">Operating Room 1</option>
                    <option value="Operating Room 2">Operating Room 2</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Billing Office">Billing Office</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>📧 Account Creation:</strong> Your email and password will be used to create your staff login account. 
                  You can use this to access the system after registration.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register Staff'}
              </Button>
              
              <Button type="button" variant="outline" className="w-full" onClick={() => setRegistrationType(null)}>
                Back to Selection
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Patient Registration Form (existing form)
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Patient Registration</CardTitle>
            <button onClick={() => setRegistrationType(null)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Continue with Google Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or register with email</span>
              </div>
            </div>
          </div>

          <form onSubmit={handlePatientSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  name="name"
                  value={patientData.name}
                  onChange={handlePatientChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={patientData.email}
                  onChange={handlePatientChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={patientData.password}
                  onChange={handlePatientChange}
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <Input
                  type="password"
                  name="password_confirmation"
                  value={patientData.password_confirmation}
                  onChange={handlePatientChange}
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  type="tel"
                  name="phone_number"
                  value={patientData.phone_number}
                  onChange={handlePatientChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={patientData.gender}
                  onChange={handlePatientChange}
                  required
                  className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Indigenous People (IP) Status</label>
                <select
                  name="ip_status"
                  value={patientData.ip_status}
                  onChange={handlePatientChange}
                  required
                  className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              {showTribeSelect && (
                <div>
                  <label className="block text-sm font-medium mb-1">Tribe</label>
                  <Input
                    name="tribe"
                    value={patientData.tribe}
                    onChange={handlePatientChange}
                    required={showTribeSelect}
                    placeholder="Enter tribe name"
                  />
                </div>
              )}
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  name="address"
                  value={patientData.address}
                  onChange={handlePatientChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Initial Medical Condition</label>
                <textarea
                  name="medical_condition"
                  value={patientData.medical_condition}
                  onChange={handlePatientChange}
                  required
                  rows={3}
                  className="flex w-full rounded-3xl border-2 border-gray-300 bg-white px-6 py-3 text-sm"
                  placeholder="Describe any existing medical conditions..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Current Medical Status</label>
                <select
                  name="medical_status"
                  value={patientData.medical_status}
                  onChange={handlePatientChange}
                  required
                  className="flex h-10 w-full rounded-full border-2 border-gray-300 bg-white px-6 py-2 text-sm"
                >
                  <option value="stable">Stable</option>
                  <option value="critical">Critical</option>
                  <option value="under_observation">Under Observation</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register Patient'}
            </Button>
            
            <Button type="button" variant="outline" className="w-full" onClick={() => setRegistrationType(null)}>
              Back to Selection
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
