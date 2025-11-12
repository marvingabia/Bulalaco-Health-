import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Staff from './pages/Staff';
import Rooms from './pages/RoomsNew';
import Pharmacy from './pages/Pharmacy';
import Ambulance from './pages/Ambulance';
import Morgue from './pages/Morgue';
import MyRecords from './pages/MyRecords';
import Billing from './pages/Billing';
import Laboratory from './pages/Laboratory';
import PatientRecords from './pages/PatientRecords';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patient-records" element={<PatientRecords />} />
          <Route path="staff" element={<Staff />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="ambulance" element={<Ambulance />} />
          <Route path="morgue" element={<Morgue />} />
          <Route path="billing" element={<Billing />} />
          <Route path="my-records" element={<MyRecords />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
