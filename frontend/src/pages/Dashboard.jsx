import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    healthy: 0,
    conditions: 0,
    accuracy: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchData = async () => {
      try {
        // In a real app, you would call your backend API
        // For now, we'll use mock data
        setStats({
          totalScans: 124,
          healthy: 78,
          conditions: 46,
          accuracy: 94.5
        });

        setRecentScans([
          { id: 1, date: '2026-06-10', result: 'Healthy', confidence: '96.2%' },
          { id: 2, date: '2026-06-09', result: 'Melanoma', confidence: '87.5%' },
          { id: 3, date: '2026-06-08', result: 'Healthy', confidence: '91.8%' },
          { id: 4, date: '2026-06-07', result: 'Psoriasis', confidence: '82.3%' },
          { id: 5, date: '2026-06-06', result: 'Healthy', confidence: '95.1%' },
        ]);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pt-16 pb-6 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Loading Dashboard...</h2>
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pt-16 pb-6 px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Overview of your skin health scans</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalScans}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-blue-50 rounded-xl">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Healthy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.healthy}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-green-50 rounded-xl">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conditions Detected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.conditions}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-red-50 rounded-xl">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-purple-50 rounded-xl">
              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Scans</h2>
        <div className="space-y-4">
          {recentScans.map(scan => (
            <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">{scan.result}</p>
                  <p className="text-sm text-gray-500">{scan.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{scan.confidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;