import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Bed, 
  Pill, 
  Truck,
  Building2,
  DollarSign,
  LogOut,
  Activity,
  Microscope,
  Menu,
  X,
  Home,
  Info,
  UserCircle,
  Mail
} from 'lucide-react';

export default function Sidebar() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-purple-500 to-indigo-600' },
    { href: '/dashboard/patients', label: 'Patients', icon: Users, gradient: 'from-blue-500 to-cyan-600' },
    { href: '/dashboard/patient-records', label: 'Patient Records', icon: Activity, gradient: 'from-indigo-500 to-purple-600' },
    { href: '/dashboard/staff', label: 'Staff', icon: UserCog, gradient: 'from-green-500 to-emerald-600' },
    { href: '/dashboard/rooms', label: 'Rooms', icon: Bed, gradient: 'from-yellow-500 to-orange-600' },
    { href: '/dashboard/pharmacy', label: 'Pharmacy', icon: Pill, gradient: 'from-red-500 to-pink-600' },
    { href: '/dashboard/laboratory', label: 'Laboratory', icon: Microscope, gradient: 'from-teal-500 to-cyan-600' },
    { href: '/dashboard/ambulance', label: 'Ambulance', icon: Truck, gradient: 'from-rose-500 to-red-600' },
    { href: '/dashboard/morgue', label: 'Morgue', icon: Building2, gradient: 'from-gray-600 to-slate-700' },
    { href: '/dashboard/billing', label: 'Billing', icon: DollarSign, gradient: 'from-amber-500 to-yellow-600' },
  ];

  const patientLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-purple-500 to-indigo-600' },
    { href: '/dashboard/my-records', label: 'My Records', icon: Activity, gradient: 'from-blue-500 to-cyan-600' },
  ];

  const infoLinks = [
    { href: '/home', label: 'Home', icon: Home, gradient: 'from-cyan-500 to-blue-600' },
    { href: '/about', label: 'About', icon: Info, gradient: 'from-green-500 to-teal-600' },
    { href: '/dashboard/profile', label: 'My Profile', icon: UserCircle, gradient: 'from-pink-500 to-rose-600' },
    { href: '/contact', label: 'Contact', icon: Mail, gradient: 'from-orange-500 to-amber-600' },
  ];

  const links = isAdmin ? adminLinks : patientLinks;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#A0D2EB]">Bulalacao Health Hub</h1>
        <p className="text-xs text-gray-500 mt-1">
          {isAdmin ? 'Admin Portal' : 'Patient Portal'}
        </p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Main Navigation */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">Main Menu</p>
          <ul className="space-y-3">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r ${link.gradient} text-white transition-all shadow-lg hover:shadow-xl ${
                      isActive
                        ? 'transform scale-105 ring-2 ring-white ring-offset-2'
                        : 'hover:scale-102'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Information Links */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">Information</p>
          <ul className="space-y-3">
            {infoLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r ${link.gradient} text-white transition-all shadow-lg hover:shadow-xl ${
                      isActive
                        ? 'transform scale-105 ring-2 ring-white ring-offset-2'
                        : 'hover:scale-102'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-102"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
}
