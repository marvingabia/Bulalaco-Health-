import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Award, GraduationCap, Briefcase, Star } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: 'Bulalacao, Oriental Mindoro',
    dateOfBirth: '1990-01-01',
  });

  // Admin Information (visible to patients)
  const adminInfo = {
    name: 'Dr. Maria Santos',
    title: 'Hospital Administrator & Chief Medical Officer',
    background: 'Dr. Maria Santos is a dedicated healthcare professional with over 20 years of experience in hospital administration and medical practice. She has been serving the Bulalacao community since 2010, leading the transformation of our facility into a modern healthcare hub.',
    education: [
      {
        degree: 'Doctor of Medicine (M.D.)',
        school: 'University of the Philippines Manila',
        year: '2000',
      },
      {
        degree: 'Master in Hospital Administration',
        school: 'Ateneo de Manila University',
        year: '2005',
      },
      {
        degree: 'Bachelor of Science in Biology',
        school: 'University of Santo Tomas',
        year: '1996',
      },
    ],
    achievements: [
      'Outstanding Healthcare Administrator Award - 2022',
      'Community Service Excellence Award - 2020',
      'Published 15+ research papers in medical journals',
      'Established free medical mission programs',
      'Implemented digital health records system',
      'COVID-19 Response Leadership Recognition',
    ],
    specializations: [
      'Internal Medicine',
      'Hospital Administration',
      'Healthcare Management',
      'Public Health',
    ],
  };

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Patient View - Shows Admin Information (Read-Only)
  if (!isAdmin) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Administrator</h1>
          <p className="text-gray-600">Meet our healthcare leader</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Admin Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{adminInfo.name}</h2>
              <p className="text-gray-600 mb-4 text-sm">{adminInfo.title}</p>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                Administrator
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                Specializations
              </h3>
              <div className="space-y-2">
                {adminInfo.specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Background */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-purple-600" />
                Background
              </h3>
              <p className="text-gray-700 leading-relaxed">{adminInfo.background}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                Education
              </h3>
              <div className="space-y-4">
                {adminInfo.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-xs mt-1">Graduated: {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-600" />
                Achievements & Recognition
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {adminInfo.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                    <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin View - Editable Profile
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-4">{user?.role || 'Patient'}</p>
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              Active
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="font-bold text-lg mb-4">Account Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type:</span>
                <span className="font-semibold">{user?.role || 'Patient'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profileData.dateOfBirth}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none resize-none"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profileData.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Security</h3>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
