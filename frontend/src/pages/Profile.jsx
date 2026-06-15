import { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    age: 28,
    phone: '+1 (555) 123-4567',
    address: '123 Health St, Wellness City, WC 45678',
    lastLogin: '2026-06-10 08:30 AM',
    preferences: {
      notifications: true,
      darkMode: false,
      autoSave: true
    }
  });

  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    setUser(editedUser);
    setEditing(false);
    // In a real app, you would save to backend here
    alert('Profile saved successfully!');
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pt-16 pb-6 px-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="flex items-center space-x-5 p-6 border-b border-gray-100">
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          {editing ? (
            <div className="ml-auto space-x-3">
              <button onClick={handleSave} className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm">
                Save
              </button>
              <button onClick={handleCancel} className="px-3 py-1 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors text-sm">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="ml-auto px-3 py-1 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors text-sm">
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Form */}
        <div className="p-6">
          {editing ? (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={editedUser.age || ''}
                  onChange={(e) => setEditedUser({...editedUser, age: e.target.value ? parseInt(e.target.value) : ''})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={editedUser.preferences.notifications}
                    onChange={(e) => setEditedUser({...editedUser, preferences: {...editedUser.preferences, notifications: e.target.checked}})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notifications" className="ml-2 text-sm font-medium text-gray-700">
                    Enable Notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dark-mode"
                    checked={editedUser.preferences.darkMode}
                    onChange={(e) => setEditedUser({...editedUser, preferences: {...editedUser.preferences, darkMode: e.target.checked}})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="dark-mode" className="ml-2 text-sm font-medium text-gray-700">
                    Dark Mode
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-save"
                    checked={editedUser.preferences.autoSave}
                    onChange={(e) => setEditedUser({...editedUser, preferences: {...editedUser.preferences, autoSave: e.target.checked}})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="auto-save" className="ml-2 text-sm font-medium text-gray-700">
                    Auto-save Results
                  </label>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Full Name:</p>
                <p className="text-gray-900">{user.name}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Email:</p>
                <p className="text-gray-900">{user.email}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Age:</p>
                <p className="text-gray-900">{user.age}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Phone:</p>
                <p className="text-gray-900">{user.phone}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Address:</p>
                <p className="text-gray-900">{user.address}</p>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium text-gray-600 w-20">Last Login:</p>
                <p className="text-gray-900">{user.lastLogin}</p>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-600 w-20">Notifications:</p>
                    <span className="px-2 py-1 rounded-full
                      {user.preferences.notifications ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}"
                    >
                      {user.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-600 w-20">Dark Mode:</p>
                    <span className="px-2 py-1 rounded-full
                      {user.preferences.darkMode ? 'bg-indigo-50 text-indigo-800' : 'bg-gray-50 text-gray-800'}"
                    >
                      {user.preferences.darkMode ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-600 w-20">Auto-save:</p>
                    <span className="px-2 py-1 rounded-full
                      {user.preferences.autoSave ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}"
                    >
                      {user.preferences.autoSave ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;