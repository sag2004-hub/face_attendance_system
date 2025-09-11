import React, { useState, useEffect } from 'react';
import { getReports, getStudents } from '../utils/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false); // Added missing state
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reportsResponse, studentsResponse] = await Promise.all([
        getReports(),
        getStudents()
      ]);
      
      if (reportsResponse.data.success) {
        setReports(reportsResponse.data.records || []);
      }
      
      if (studentsResponse.data.success) {
        setStudents(studentsResponse.data.students || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(record => {
    if (filter !== 'all' && record.student_id !== filter) {
      return false;
    }
    if (dateFilter && record.date !== dateFilter) {
      return false;
    }
    return true;
  });

  const getUniqueStudents = () => {
    const unique = [];
    const seen = new Set();
    reports.forEach(record => {
      if (!seen.has(record.student_id)) {
        seen.add(record.student_id);
        unique.push({
          student_id: record.student_id,
          name: record.name
        });
      }
    });
    return unique;
  };

  const getUniqueDates = () => {
    return [...new Set(reports.map(record => record.date))].sort().reverse();
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return reports.filter(record => record.date === today).length;
  };

  const getTotalStudents = () => {
    return students.length;
  };

  const getAttendanceRate = () => {
    const totalStudents = getTotalStudents();
    const todayAttendance = getTodayAttendance();
    return totalStudents > 0 ? ((todayAttendance / totalStudents) * 100).toFixed(1) : 0;
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    // Define headers
    const headers = ['Student ID', 'Name', 'Date', 'Time', 'Status'];
    
    // Convert data to CSV rows
    const csvRows = data.map(record => [
      record.student_id || '',
      record.name || '',
      record.date || '',
      record.time || '',
      'Present'
    ]);
    
    // Combine headers and rows
    const allRows = [headers, ...csvRows];
    
    // Convert to CSV string
    return allRows.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');
  };

  // Download CSV file
  const handleDownload = () => {
    setDownloading(true);
    
    try {
      // Convert filtered reports to CSV
      const csvContent = convertToCSV(filteredReports);
      
      // Create blob
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create download link
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      
      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `attendance_reports_${currentDate}.csv`;
      link.setAttribute('download', filename);
      
      // Trigger download
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-200/30 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-slate-300 font-medium">Loading attendance reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 shadow-lg shadow-blue-500/25">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-400">Attendance</span>{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Reports</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            View and analyze comprehensive attendance records and statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-2">Total Students</p>
                <p className="text-3xl font-bold text-blue-400">{getTotalStudents()}</p>
                <p className="text-xs text-slate-500 mt-1">Registered students</p>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-2">Today's Attendance</p>
                <p className="text-3xl font-bold text-green-400">{getTodayAttendance()}</p>
                <p className="text-xs text-slate-500 mt-1">Students present today</p>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-2">Attendance Rate</p>
                <p className="text-3xl font-bold text-cyan-400">{getAttendanceRate()}%</p>
                <p className="text-xs text-slate-500 mt-1">Today's percentage</p>
              </div>
              <div className="text-4xl opacity-80">📈</div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-2">Total Records</p>
                <p className="text-3xl font-bold text-orange-400">{reports.length}</p>
                <p className="text-xs text-slate-500 mt-1">All time attendance</p>
              </div>
              <div className="text-4xl opacity-80">📋</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-8 mb-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🔍</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">Filters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3">
                Filter by Student
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Students</option>
                {getUniqueStudents().map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3">
                Filter by Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Dates</option>
                {getUniqueDates().map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilter('all');
                  setDateFilter('');
                }}
                className="w-full px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-all font-medium flex items-center justify-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-lg">
          <div className="px-8 py-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h2 className="text-2xl font-semibold text-white">
                  Attendance Records ({filteredReports.length})
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                {downloading && (
                  <div className="flex items-center text-blue-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent mr-3"></div>
                    <span className="text-sm">Preparing download...</span>
                  </div>
                )}
                <button
                  onClick={handleDownload}
                  disabled={downloading || filteredReports.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition-all font-medium flex items-center space-x-2"
                >
                  <span>📥</span>
                  <span>{downloading ? 'Downloading...' : 'Download CSV'}</span>
                </button>
              </div>
            </div>
          </div>
          
          {filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/30">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredReports.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-8 py-4 whitespace-nowrap text-sm font-semibold text-white">
                        {record.student_id}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-300 font-medium">
                        {record.name}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-300">
                        {record.date}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-300">
                        {record.time}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <span className="mr-1">✅</span>
                          Present
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No attendance records found</h3>
              <p className="text-slate-400 max-w-sm mx-auto">
                {reports.length === 0 
                  ? "No attendance has been marked yet. Records will appear here once students start checking in." 
                  : "Try adjusting your filters to see more records."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;