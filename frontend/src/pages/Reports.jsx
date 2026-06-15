import { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching reports from backend
    const fetchReports = async () => {
      try {
        // Mock data for reports
        setReports([
          {
            id: 1,
            date: '2026-06-10',
            time: '14:30',
            imageName: 'skin-lesion-001.jpg',
            result: 'Healthy',
            confidence: '96.2%',
            status: 'completed'
          },
          {
            id: 2,
            date: '2026-06-09',
            time: '09:15',
            imageName: 'mole-check-002.jpg',
            result: 'Melanoma',
            confidence: '87.5%',
            status: 'completed'
          },
          {
            id: 3,
            date: '2026-06-08',
            time: '16:45',
            imageName: 'rash-evaluation-003.jpg',
            result: 'Psoriasis',
            confidence: '82.3%',
            status: 'completed'
          },
          {
            id: 4,
            date: '2026-06-07',
            time: '11:20',
            imageName: 'lesion-analysis-004.jpg',
            result: 'Healthy',
            confidence: '95.1%',
            status: 'completed'
          },
          {
            id: 5,
            date: '2026-06-06',
            time: '08:05',
            imageName: 'follow-up-005.jpg',
            result: 'Healthy',
            confidence: '91.8%',
            status: 'completed'
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 pt-16 pb-6 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Loading Reports...</h2>
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
          Reports
        </h1>
        <p className="text-gray-600 mt-2">View and export your scan history</p>
      </header>

      {/* Export Button */}
      <div className="mb-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 002-2v10a2 2 0 002 2z"></path>
          </svg>
          Export Reports
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Scan History</h2>
        </div>
        <div className="space-y-4">
          {reports.map(report => (
            <div key={report.id} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-sm text-gray-600">{report.date}</div>
                <div className="text-sm text-gray-600">{report.time}</div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{report.imageName}</span>
                </div>
                <div className="text-sm font-medium">
                  <span className="px-2 py-1 rounded-full
                    {report.result === 'Healthy' ? 'bg-green-50 text-green-800'
                      : report.result === 'Melanoma' ? 'bg-red-50 text-red-800'
                        : 'bg-yellow-50 text-yellow-800'}"
                  >
                    {report.result}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900">{report.confidence}</div>
                <div className="text-sm">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">
                    {report.status}
                  </span>
                </div>
                <div className="text-right">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;